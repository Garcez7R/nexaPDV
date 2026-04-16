export interface Env {
  DB: D1Database;
}

type SyncOperation = {
  id: string;
  entity: "product" | "sale" | "stock";
  type: "create" | "update" | "delete";
  payload: unknown;
  createdAt: string;
};

async function json(data: unknown, init?: ResponseInit) {
  return new Response(JSON.stringify(data), {
    headers: {
      "Content-Type": "application/json"
    },
    ...init
  });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (request.method === "GET" && url.pathname === "/api/products") {
      const result = await env.DB.prepare("SELECT * FROM products ORDER BY name ASC").all();
      return json(result.results);
    }

    if (request.method === "GET" && url.pathname === "/api/sales") {
      const result = await env.DB.prepare("SELECT * FROM sales ORDER BY created_at DESC").all();
      return json(result.results);
    }

    if (request.method === "POST" && url.pathname === "/api/sync") {
      const body = (await request.json()) as { operations: SyncOperation[] };
      return json({
        synced: body.operations.length,
        strategy: "last-write-wins"
      });
    }

    return json({ message: "Route not found" }, { status: 404 });
  }
};
