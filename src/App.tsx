import { Navigate, Route, Routes } from "react-router-dom";
import { AppLayout } from "./layouts/AppLayout";
import { CaixaPage } from "./pages/CaixaPage";
import { ConfiguracoesPage } from "./pages/ConfiguracoesPage";
import { EstoquePage } from "./pages/EstoquePage";
import { HomePage } from "./pages/HomePage";
import { ProdutosPage } from "./pages/ProdutosPage";
import { RelatoriosPage } from "./pages/RelatoriosPage";

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/caixa" element={<CaixaPage />} />
        <Route path="/estoque" element={<EstoquePage />} />
        <Route path="/produtos" element={<ProdutosPage />} />
        <Route path="/relatorios" element={<RelatoriosPage />} />
        <Route path="/configuracoes" element={<ConfiguracoesPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
