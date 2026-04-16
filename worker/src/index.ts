export interface Env {
  nexa_pdv: D1Database;
}

type SyncOperation = {
  id: string;
  entity: "product" | "sale" | "stock";
  type: "create" | "update" | "delete";
  payload: unknown;
  createdAt: string;
};

type ProductRecord = {
  id: string;
  name: string;
  description: string;
  barcode: string;
  cost_price: number;
  sale_price: number;
  stock_qty: number;
  min_stock_qty: number;
  updated_at: string;
};

type SaleRecord = {
  id: string;
  total: number;
  amount_paid: number;
  change_value: number;
  payment_method: "cash" | "debit" | "credit";
  created_at: string;
};

type SaleItemRecord = {
  sale_id: string;
  product_id: string;
  quantity: number;
  unit_price: number;
  subtotal: number;
};

async function json(data: unknown, init?: ResponseInit) {
  return new Response(JSON.stringify(data), {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    },
    ...init
  });
}

function mapProduct(record: ProductRecord) {
  return {
    id: record.id,
    name: record.name,
    description: record.description,
    barcode: record.barcode,
    costPrice: record.cost_price,
    salePrice: record.sale_price,
    stockQty: record.stock_qty,
    minStockQty: record.min_stock_qty,
    updatedAt: record.updated_at
  };
}

function mapSales(sales: SaleRecord[], saleItems: SaleItemRecord[]) {
  return sales.map((sale) => ({
    id: sale.id,
    total: sale.total,
    amountPaid: sale.amount_paid,
    change: sale.change_value,
    paymentMethod: sale.payment_method,
    createdAt: sale.created_at,
    items: saleItems
      .filter((item) => item.sale_id === sale.id)
      .map((item) => ({
        productId: item.product_id,
        quantity: item.quantity,
        unitPrice: item.unit_price,
        subtotal: item.subtotal
      }))
  }));
}

async function applyProductOperation(env: Env, operation: SyncOperation) {
  const payload = operation.payload as {
    id: string;
    name?: string;
    description?: string;
    barcode?: string;
    costPrice?: number;
    salePrice?: number;
    stockQty?: number;
    minStockQty?: number;
    updatedAt?: string;
  };

  if (operation.type === "delete") {
    await env.nexa_pdv.prepare("DELETE FROM products WHERE id = ?").bind(payload.id).run();
    return;
  }

  await env.nexa_pdv
    .prepare(
      `INSERT OR REPLACE INTO products
      (id, name, description, barcode, cost_price, sale_price, stock_qty, min_stock_qty, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
    )
    .bind(
      payload.id,
      payload.name,
      payload.description,
      payload.barcode,
      payload.costPrice,
      payload.salePrice,
      payload.stockQty,
      payload.minStockQty,
      payload.updatedAt ?? operation.createdAt
    )
    .run();
}

async function applySaleOperation(env: Env, operation: SyncOperation) {
  const payload = operation.payload as {
    id: string;
    total: number;
    amountPaid: number;
    change: number;
    paymentMethod: "cash" | "debit" | "credit";
    createdAt: string;
    items: Array<{
      productId: string;
      quantity: number;
      unitPrice: number;
      subtotal: number;
    }>;
  };

  await env.nexa_pdv
    .prepare(
      `INSERT OR REPLACE INTO sales
      (id, total, amount_paid, change_value, payment_method, created_at)
      VALUES (?, ?, ?, ?, ?, ?)`
    )
    .bind(payload.id, payload.total, payload.amountPaid, payload.change, payload.paymentMethod, payload.createdAt)
    .run();

  await env.nexa_pdv.prepare("DELETE FROM sale_items WHERE sale_id = ?").bind(payload.id).run();

  for (const item of payload.items) {
    await env.nexa_pdv
      .prepare(
        `INSERT INTO sale_items
        (id, sale_id, product_id, quantity, unit_price, subtotal)
        VALUES (?, ?, ?, ?, ?, ?)`
      )
      .bind(`${payload.id}-${item.productId}`, payload.id, item.productId, item.quantity, item.unitPrice, item.subtotal)
      .run();
  }
}

async function applyStockOperation(env: Env, operation: SyncOperation) {
  const payload = operation.payload as {
    id: string;
    productId: string;
    delta: number;
    reason: string;
    createdAt: string;
  };

  await env.nexa_pdv
    .prepare(
      `INSERT OR REPLACE INTO stock_adjustments
      (id, product_id, delta, reason, created_at)
      VALUES (?, ?, ?, ?, ?)`
    )
    .bind(payload.id, payload.productId, payload.delta, payload.reason, payload.createdAt)
    .run();

  await env.nexa_pdv
    .prepare("UPDATE products SET stock_qty = stock_qty + ?, updated_at = ? WHERE id = ?")
    .bind(payload.delta, payload.createdAt, payload.productId)
    .run();
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (request.method === "OPTIONS") {
      return json(null, { status: 204 });
    }

    if (request.method === "GET" && url.pathname === "/api/products") {
      const result = await env.nexa_pdv.prepare("SELECT * FROM products ORDER BY name ASC").all<ProductRecord>();
      return json(result.results.map(mapProduct));
    }

    if (request.method === "GET" && url.pathname === "/api/sales") {
      const [salesResult, itemsResult] = await Promise.all([
        env.nexa_pdv.prepare("SELECT * FROM sales ORDER BY created_at DESC").all<SaleRecord>(),
        env.nexa_pdv.prepare("SELECT sale_id, product_id, quantity, unit_price, subtotal FROM sale_items").all<SaleItemRecord>()
      ]);
      return json(mapSales(salesResult.results, itemsResult.results));
    }

    if (request.method === "POST" && url.pathname === "/api/sync") {
      const body = (await request.json()) as { operations: SyncOperation[] };
      for (const operation of body.operations) {
        if (operation.entity === "product") {
          await applyProductOperation(env, operation);
        }

        if (operation.entity === "sale" && operation.type === "create") {
          await applySaleOperation(env, operation);
        }

        if (operation.entity === "stock" && operation.type === "update") {
          await applyStockOperation(env, operation);
        }
      }

      return json({
        synced: body.operations.length,
        strategy: "last-write-wins"
      });
    }

    return json({ message: "Route not found" }, { status: 404 });
  }
};
