# nexaPDV

Base inicial de um sistema de caixa, estoque e produtos para mercadinho, construído como PWA offline-first.

## Stack

- React + Vite + TypeScript
- Tailwind CSS
- React Router
- IndexedDB via `idb`
- Estrutura pronta para Cloudflare Workers + D1

## Módulos iniciais

- `/` painel inicial
- `/caixa` frente de venda
- `/estoque` controle de estoque
- `/produtos` catálogo e cadastro
- `/relatorios` relatórios básicos
- `/configuracoes` preferências e sincronização

## Próximos passos

1. Instalar dependências com `npm install`
2. Rodar localmente com `npm run dev`
3. Implementar CRUD real na IndexedDB
4. Conectar backend no Worker e schema D1
