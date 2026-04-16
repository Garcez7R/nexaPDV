import { PageHeader } from "../components/PageHeader";
import { SectionCard } from "../components/SectionCard";

export function ConfiguracoesPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Configurações"
        title="Preferências da operação"
        description="Área inicial para estoque mínimo padrão, controle de usuários e sincronização manual."
      />

      <div className="grid gap-4 lg:grid-cols-2">
        <SectionCard title="Parâmetros gerais" description="Valores que impactam o cadastro e a operação.">
          <div className="grid gap-4">
            <label className="grid gap-2 text-sm font-medium text-slate-700">
              Estoque mínimo padrão
              <input className="rounded-2xl border border-brand-100 bg-canvas px-4 py-3" defaultValue="5" />
            </label>
            <label className="grid gap-2 text-sm font-medium text-slate-700">
              Nome da loja
              <input className="rounded-2xl border border-brand-100 bg-canvas px-4 py-3" defaultValue="Mercadinho Nexa" />
            </label>
          </div>
        </SectionCard>

        <SectionCard title="Sincronização" description="Ações manuais para a fila offline-first.">
          <div className="grid gap-3">
            <button className="rounded-2xl bg-brand-500 px-4 py-3 font-medium text-white">Forçar sincronização</button>
            <button className="rounded-2xl border border-brand-100 bg-white px-4 py-3 font-medium text-brand-900">Gerenciar usuários</button>
            <div className="rounded-2xl bg-canvas p-4 text-sm text-slate-600">
              Estratégia inicial de conflito: <strong className="text-brand-900">last-write-wins com timestamp</strong>.
            </div>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
