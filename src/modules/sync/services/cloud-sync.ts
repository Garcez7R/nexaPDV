import { fetchRemoteCatalog } from "../../catalog/services/catalog-service";
import { fetchRemoteSales } from "../../sales/services/sales-service";
import { syncOperations } from "../../../lib/api";
import {
  clearSyncQueue,
  replaceProducts,
  replaceSales
} from "../../../lib/persistence";
import type { Product, Sale, SyncOperation, SyncResult } from "../../../lib/types";

export type CloudSyncSnapshot = {
  products: Product[];
  sales: Sale[];
};

export async function pullCloudSnapshot(): Promise<CloudSyncSnapshot> {
  const [products, sales] = await Promise.all([fetchRemoteCatalog(), fetchRemoteSales()]);
  return { products, sales };
}

export async function hydrateLocalFromCloud() {
  const snapshot = await pullCloudSnapshot();
  await Promise.all([replaceProducts(snapshot.products), replaceSales(snapshot.sales)]);
  return snapshot;
}

export async function pushSyncQueue(operations: SyncOperation[]): Promise<SyncResult> {
  const result = await syncOperations(operations);
  await clearSyncQueue();
  return result;
}
