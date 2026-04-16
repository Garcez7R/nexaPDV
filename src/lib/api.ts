import { buildApiUrl } from "../shared/config/env";
import type { Product, Sale, StockAdjustment, SyncOperation, SyncResult } from "./types";

async function request<TResponse>(path: string, init?: RequestInit): Promise<TResponse> {
  const response = await fetch(buildApiUrl(path), {
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
  return request<Product[]>("/api/products");
}

export function fetchSales() {
  return request<Sale[]>("/api/sales");
}

export function createProduct(product: Product) {
  return request<Product>("/api/products", {
    method: "POST",
    body: JSON.stringify(product)
  });
}

export function createSale(sale: Sale) {
  return request<Sale>("/api/sales", {
    method: "POST",
    body: JSON.stringify(sale)
  });
}

export function createAdjustment(adjustment: StockAdjustment) {
  return request<StockAdjustment>("/api/stock-adjustments", {
    method: "POST",
    body: JSON.stringify(adjustment)
  });
}

export function syncOperations(operations: SyncOperation[]) {
  return request<SyncResult>("/api/sync", {
    method: "POST",
    body: JSON.stringify({ operations })
  });
}
