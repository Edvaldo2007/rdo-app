import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'RDO – Diário de Obra',
  description: 'Relatórios diários que viram decisões. PDF detalhado, aprovação e análise.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <header className="border-b border-white/10">
          <div className="container py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-sky-600 rounded grid place-content-center font-bold">R</div>
              <div>
                <div className="font-semibold">RDO – Diário de Obra</div>
                <div className="text-xs text-slate-400">PDF detalhado • Aprovação • Análise</div>
              </div>
            </div>
          </div>
        </header>
        <main className="container py-8">{children}</main>
        <footer className="container py-10 text-sm text-slate-400">
          © {new Date().getFullYear()} RDO – Diário de Obra. Todos os direitos reservados.
        </footer>
      </body>
    </html>
  );
}
