import { AlertTriangle, ArrowUpDown } from "lucide-react";
import { PageHeader } from "../components/PageHeader";
import { SectionCard } from "../components/SectionCard";
import { mockProducts } from "../data/mock";

export function EstoquePage() {
  return (
    <div>
      <PageHeader
        eyebrow="Estoque"
        title="Visão operacional do estoque"
        description="Listagem inicial com busca, alerta de estoque mínimo e caminho para ajustes manuais de entrada e saída."
      />

      <SectionCard title="Produtos em estoque" description="Base inicial semeada localmente para acelerar desenvolvimento e testes.">
        <div className="mb-4 flex flex-col gap-3 md:flex-row">
          <input
            className="w-full rounded-2xl border border-brand-100 bg-canvas px-4 py-3"
            placeholder="Buscar por nome ou código de barras"
          />
          <button className="inline-flex items-center justify-center gap-2 rounded-2xl border border-brand-100 bg-white px-4 py-3 font-medium text-brand-900">
            <ArrowUpDown className="h-4 w-4" />
            Ajustar estoque
          </button>
        </div>

        <div className="overflow-hidden rounded-3xl border border-brand-100">
          <table className="min-w-full bg-white text-left text-sm">
            <thead className="bg-brand-50 text-brand-900">
              <tr>
                <th className="px-4 py-3">Produto</th>
                <th className="px-4 py-3">Código</th>
                <th className="px-4 py-3">Quantidade</th>
                <th className="px-4 py-3">Mínimo</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {mockProducts.map((product) => {
                const lowStock = product.stockQty <= product.minStockQty;
                return (
                  <tr key={product.id} className="border-t border-brand-100">
                    <td className="px-4 py-3 font-medium text-brand-900">{product.name}</td>
                    <td className="px-4 py-3 text-slate-500">{product.barcode}</td>
                    <td className="px-4 py-3">{product.stockQty}</td>
                    <td className="px-4 py-3">{product.minStockQty}</td>
                    <td className="px-4 py-3">
                      <span
                        className={
                          lowStock
                            ? "inline-flex items-center gap-2 rounded-full bg-amber-100 px-3 py-1 text-amber-800"
                            : "inline-flex rounded-full bg-emerald-100 px-3 py-1 text-emerald-700"
                        }
                      >
                        {lowStock ? <AlertTriangle className="h-4 w-4" /> : null}
                        {lowStock ? "Atenção" : "Estável"}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </div>
  );
}
