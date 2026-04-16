import type { Product, Sale, StockAdjustment, SyncOperation } from "./types";

const API_BASE = "/api";

async function request<TResponse>(path: string, init?: RequestInit): Promise<TResponse> {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: {
      "Content-Type": "application/json"
    },
    ...init
  });

  if (!response.ok) {
    throw new Error(`Falha na requisição ${path}`);
  }

  return response.json() as Promise<TResponse>;
}

export function fetchProducts() {
  return request<Product[]>("/products");
}

export function fetchSales() {
  return request<Sale[]>("/sales");
}

export function createProduct(product: Product) {
  return request<Product>("/products", {
    method: "POST",
    body: JSON.stringify(product)
  });
}

export function createSale(sale: Sale) {
  return request<Sale>("/sales", {
    method: "POST",
    body: JSON.stringify(sale)
  });
}

export function createAdjustment(adjustment: StockAdjustment) {
  return request<StockAdjustment>("/stock-adjustments", {
    method: "POST",
    body: JSON.stringify(adjustment)
  });
}

export function syncOperations(operations: SyncOperation[]) {
  return request<{ synced: number }>("/sync", {
    method: "POST",
    body: JSON.stringify({ operations })
  });
}
