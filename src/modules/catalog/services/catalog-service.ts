import { fetchProducts } from "../../../lib/api";

export async function fetchRemoteCatalog() {
  return fetchProducts();
}
