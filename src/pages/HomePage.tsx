import { KpiCard } from "../components/KpiCard";
import { PageHeader } from "../components/PageHeader";
import { SectionCard } from "../components/SectionCard";

export function HomePage() {
  return (
    <div>
      <PageHeader
        eyebrow="Operação"
        title="Painel inicial do mercadinho"
        description="Uma base pronta para vendas, estoque, produtos e relatórios com foco em operação rápida no caixa e sincronização posterior."
      />

      <div className="grid gap-4 md:grid-cols-3">
        <KpiCard label="Vendas do dia" value="R$ 1.248,90" helper="Resumo rápido para a abertura do turno." />
        <KpiCard label="Produtos em alerta" value="8 itens" helper="Estoque mínimo monitorado na base local." />
        <KpiCard label="Pendências offline" value="3 sincronizações" helper="Fila de sync pronta para subir quando a internet voltar." />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <SectionCard
          title="Arquitetura inicial"
          description="Frontend PWA em React, IndexedDB local, fila de sincronização e backend preparado para Cloudflare Workers + D1."
        >
          <div className="grid gap-3 text-sm text-slate-600">
            <p>Rotas principais já separadas por módulo para facilitar expansão do caixa, estoque e relatórios.</p>
            <p>Camada de persistência local preparada para semear dados iniciais e sustentar operação offline-first.</p>
            <p>Estrutura pensada para desktop, tablet e celular, com navegação direta para o operador.</p>
          </div>
        </SectionCard>

        <SectionCard
          title="Próximas entregas"
          description="Sequência natural para transformar a base em produto funcional."
        >
          <ul className="grid gap-3 text-sm text-slate-600">
            <li>Implementar CRUD real de produtos.</li>
            <li>Conectar fluxo de venda ao estoque.</li>
            <li>Subir Worker com rotas REST e D1.</li>
            <li>Ativar leitura de código de barras na tela de caixa.</li>
          </ul>
        </SectionCard>
      </div>
    </div>
  );
}
