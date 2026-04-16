import { PageHeader } from "../components/PageHeader";
import { SectionCard } from "../components/SectionCard";
import { mockSales } from "../data/mock";
import { formatCurrency, formatDate } from "../lib/utils";

export function RelatoriosPage() {
  const totalSales = mockSales.reduce((acc, sale) => acc + sale.total, 0);

  return (
    <div>
      <PageHeader
        eyebrow="Relatórios"
        title="Resumo básico de vendas e estoque"
        description="Primeira camada de relatórios por período, pronta para receber filtros reais e gráficos simples."
      />

      <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
        <SectionCard title="Filtros rápidos" description="Atalhos por dia, semana e mês.">
          <div className="grid gap-3">
            <button className="rounded-2xl bg-brand-500 px-4 py-3 font-medium text-white">Hoje</button>
            <button className="rounded-2xl border border-brand-100 bg-white px-4 py-3 font-medium text-brand-900">Últimos 7 dias</button>
            <button className="rounded-2xl border border-brand-100 bg-white px-4 py-3 font-medium text-brand-900">Últimos 30 dias</button>
            <div className="rounded-2xl bg-canvas p-4 text-sm text-slate-600">
              Total consolidado inicial: <strong className="text-brand-900">{formatCurrency(totalSales)}</strong>
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Vendas recentes" description="Base de demonstração para evoluir a consulta por período.">
          <div className="grid gap-3">
            {mockSales.map((sale) => (
              <div key={sale.id} className="rounded-2xl border border-brand-100 bg-canvas p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold text-brand-900">Venda {sale.id}</p>
                    <p className="text-sm text-slate-500">{formatDate(sale.createdAt)}</p>
                  </div>
                  <strong className="text-brand-900">{formatCurrency(sale.total)}</strong>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
