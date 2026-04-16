import { PackagePlus, Pencil, Trash2 } from "lucide-react";
import { PageHeader } from "../components/PageHeader";
import { SectionCard } from "../components/SectionCard";
import { mockProducts } from "../data/mock";
import { formatCurrency } from "../lib/utils";

export function ProdutosPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Produtos"
        title="Cadastro e gestão do catálogo"
        description="Tabela inicial pronta para evoluir para CRUD real com IndexedDB local e sincronização no Worker."
      />

      <SectionCard title="Lista de produtos" description="Cadastro preparado para nome, código de barras, preço e estoque mínimo.">
        <div className="mb-4 flex flex-col gap-3 md:flex-row">
          <input className="w-full rounded-2xl border border-brand-100 bg-canvas px-4 py-3" placeholder="Buscar produto" />
          <button className="inline-flex items-center justify-center gap-2 rounded-2xl bg-brand-500 px-4 py-3 font-medium text-white">
            <PackagePlus className="h-4 w-4" />
            Novo produto
          </button>
        </div>

        <div className="grid gap-3">
          {mockProducts.map((product) => (
            <article key={product.id} className="rounded-3xl border border-brand-100 bg-white p-4">
              <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-brand-900">{product.name}</h3>
                  <p className="text-sm text-slate-500">{product.description}</p>
                </div>
                <div className="flex flex-wrap gap-2 text-sm text-slate-600">
                  <span className="rounded-full bg-brand-50 px-3 py-2">Cod: {product.barcode}</span>
                  <span className="rounded-full bg-brand-50 px-3 py-2">Venda: {formatCurrency(product.salePrice)}</span>
                  <span className="rounded-full bg-brand-50 px-3 py-2">Estoque: {product.stockQty}</span>
                </div>
              </div>

              <div className="mt-4 flex gap-3">
                <button className="inline-flex items-center gap-2 rounded-2xl border border-brand-100 px-4 py-2 font-medium text-brand-900">
                  <Pencil className="h-4 w-4" />
                  Editar
                </button>
                <button className="inline-flex items-center gap-2 rounded-2xl border border-red-100 px-4 py-2 font-medium text-red-500">
                  <Trash2 className="h-4 w-4" />
                  Excluir
                </button>
              </div>
            </article>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
