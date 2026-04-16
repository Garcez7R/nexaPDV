export type PaymentMethod = "cash" | "debit" | "credit";

export type Product = {
  id: string;
  name: string;
  description: string;
  barcode: string;
  costPrice: number;
  salePrice: number;
  stockQty: number;
  minStockQty: number;
  updatedAt: string;
};

export type SaleItem = {
  productId: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
};

export type Sale = {
  id: string;
  total: number;
  amountPaid: number;
  change: number;
  paymentMethod: PaymentMethod;
  createdAt: string;
  items: SaleItem[];
};

export type StockAdjustment = {
  id: string;
  productId: string;
  delta: number;
  reason: string;
  createdAt: string;
};

export type SyncOperation<TPayload = unknown> = {
  id: string;
  entity: "product" | "sale" | "stock";
  type: "create" | "update" | "delete";
  payload: TPayload;
  createdAt: string;
};

export type AppSettings = {
  id: "app-settings";
  storeName: string;
  defaultMinStockQty: number;
  lastSyncAt: string | null;
};
