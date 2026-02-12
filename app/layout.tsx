// app/layout.tsx
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
        <header style={{borderBottom:'1px solid #e5e7eb'}}>
          <div style={{
            maxWidth:960, margin:'0 auto', padding:'12px 16px',
            display:'flex', gap:12, alignItems:'center'
          }}>
            <div style={{
              width:36,height:36, background:'#0ea5e9', color:'#fff',
              borderRadius:8, display:'grid', placeContent:'center',
              fontWeight:700
            }}>R</div>
            <div>
              <div style={{fontWeight:600}}>RDO – Diário de Obra</div>
              <div style={{fontSize:12, color:'#6b7280'}}>PDF detalhado • Aprovação • Análise</div>
            </div>
          </div>
        </header>

        <main style={{maxWidth:960, margin:'0 auto', padding:'24px 16px'}}>
          {children}
        </main>

        <footer style={{
          maxWidth:960, margin:'0 auto', padding:'24px 16px',
          color:'#6b7280', fontSize:14
        }}>
          © {new Date().getFullYear()} RDO – Diário de Obra.
        </footer>
      </body>
    </html>
  );
}
``
