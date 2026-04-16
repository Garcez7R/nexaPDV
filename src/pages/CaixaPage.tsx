import { Camera, ScanLine, Trash2 } from "lucide-react";
import { PageHeader } from "../components/PageHeader";
import { SectionCard } from "../components/SectionCard";
import { formatCurrency } from "../lib/utils";

const saleItems = [
  { name: "Arroz Tipo 1 5kg", quantity: 1, price: 29.9 },
  { name: "Café Torrado 500g", quantity: 2, price: 15.9 }
];

const total = saleItems.reduce((acc, item) => acc + item.quantity * item.price, 0);
const amountPaid = 70;

export function CaixaPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Caixa"
        title="Frente de venda híbrida"
        description="Fluxo inicial para leitura por código de barras, lançamento manual e fechamento de venda com suporte a operação offline."
      />

      <div className="grid gap-4 xl:grid-cols-[1.4fr_0.9fr]">
        <SectionCard title="Lançamento da venda" description="Busca manual, leitor USB ou câmera do celular.">
          <div className="grid gap-4">
            <div className="grid gap-3 md:grid-cols-[1fr_auto_auto]">
              <input
                className="rounded-2xl border border-brand-100 bg-canvas px-4 py-3 outline-none ring-0 placeholder:text-slate-400"
                placeholder="Digite o código de barras ou nome do produto"
              />
              <button className="rounded-2xl bg-brand-500 px-4 py-3 font-medium text-white">Adicionar item</button>
              <button className="inline-flex items-center justify-center gap-2 rounded-2xl border border-brand-100 bg-white px-4 py-3 font-medium text-brand-900">
                <Camera className="h-4 w-4" />
                Escanear
              </button>
            </div>

            <div className="grid gap-3">
              {saleItems.map((item) => (
                <div
                  key={item.name}
                  className="grid items-center gap-3 rounded-2xl border border-brand-100 bg-canvas px-4 py-4 md:grid-cols-[1fr_auto_auto_auto]"
                >
                  <div>
                    <p className="font-semibold text-brand-900">{item.name}</p>
                    <p className="text-sm text-slate-500">Leitura por código de barras pronta para integrar.</p>
                  </div>
                  <div className="rounded-full bg-white px-3 py-2 text-sm font-medium text-slate-600">
                    Qtd: {item.quantity}
                  </div>
                  <div className="text-sm font-semibold text-brand-900">{formatCurrency(item.price * item.quantity)}</div>
                  <button className="inline-flex items-center justify-center rounded-full border border-red-100 p-2 text-red-500">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Fechamento" description="Resumo, pagamento e envio para fila de sincronização.">
          <div className="grid gap-4">
            <div className="rounded-3xl bg-brand-900 p-5 text-white">
              <p className="text-sm uppercase tracking-[0.2em] text-brand-100">Total da venda</p>
              <p className="mt-2 text-4xl font-bold">{formatCurrency(total)}</p>
            </div>
            <label className="grid gap-2 text-sm font-medium text-slate-700">
              Valor recebido
              <input className="rounded-2xl border border-brand-100 bg-canvas px-4 py-3" defaultValue={amountPaid} />
            </label>
            <div className="grid gap-2 rounded-2xl border border-brand-100 bg-canvas p-4 text-sm">
              <div className="flex items-center justify-between">
                <span>Total</span>
                <strong>{formatCurrency(total)}</strong>
              </div>
              <div className="flex items-center justify-between">
                <span>Troco</span>
                <strong>{formatCurrency(amountPaid - total)}</strong>
              </div>
            </div>
            <div className="grid gap-3">
              <button className="rounded-2xl bg-accent px-4 py-3 font-semibold text-brand-900">Finalizar venda</button>
              <button className="inline-flex items-center justify-center gap-2 rounded-2xl border border-brand-100 bg-white px-4 py-3 font-medium text-slate-700">
                <ScanLine className="h-4 w-4" />
                Forçar sync da venda depois
              </button>
            </div>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
