import { openDB } from "idb";
import type { Product, Sale, SyncOperation } from "./types";
import { mockProducts, mockSales } from "../data/mock";

const DB_NAME = "nexa-pdv";
const DB_VERSION = 1;

const dbPromise = openDB(DB_NAME, DB_VERSION, {
  upgrade(db) {
    db.createObjectStore("products", { keyPath: "id" });
    db.createObjectStore("sales", { keyPath: "id" });
    db.createObjectStore("adjustments", { keyPath: "id" });
    db.createObjectStore("syncQueue", { keyPath: "id" });
  }
});

export async function seedDatabase() {
  const db = await dbPromise;
  const existingProducts = await db.count("products");
  const existingSales = await db.count("sales");

  if (existingProducts === 0) {
    await Promise.all(mockProducts.map((product) => db.put("products", product)));
  }

  if (existingSales === 0) {
    await Promise.all(mockSales.map((sale) => db.put("sales", sale)));
  }
}

export async function listProducts() {
  const db = await dbPromise;
  return db.getAll("products") as Promise<Product[]>;
}

export async function listSales() {
  const db = await dbPromise;
  return db.getAll("sales") as Promise<Sale[]>;
}

export async function queueSync(operation: SyncOperation) {
  const db = await dbPromise;
  await db.put("syncQueue", operation);
}
