'use client';
import { useState } from 'react';

export default function Landing() {
  const [estado, setEstado] = useState<'idle'|'ok'|'err'|'loading'>('idle');
  const [msg, setMsg] = useState('');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setEstado('loading');
    const fd = new FormData(e.currentTarget);
    const payload = Object.fromEntries(fd.entries());
    const res = await fetch('/api/waitlist', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(payload)
    });
    if (res.ok) { setEstado('ok'); setMsg('Recebido! Em breve entraremos em contato.'); (e.target as HTMLFormElement).reset(); }
    else { setEstado('err'); setMsg('Falha ao enviar.'); }
  }

  return (
    <section className="grid md:grid-cols-2 gap-10 items-start">
      <div>
        <h1 className="text-4xl md:text-5xl font-semibold leading-tight">
          RDO completo em minutos. <span className="text-sky-400">PDF detalhado</span>, aprovação e análise.
        </h1>
        <p className="mt-4 text-slate-300">
          Padronize seu Diário de Obra, anexe fotos, colete assinaturas e acompanhe indicadores de execução.
        </p>
        <form onSubmit={onSubmit} className="card mt-6 grid gap-3">
          <div className="grid md:grid-cols-2 gap-3">
            <input className="input" name="nome" placeholder="Seu nome" />
            <input className="input" name="email" placeholder="Seu e-mail*" required />
            <input className="input" name="empresa" placeholder="Empresa" />
            <input className="input" name="cargo" placeholder="Cargo" />
          </div>
          <button className="btn btn-primary" disabled={estado==='loading'}>
            {estado==='loading' ? 'Enviando...' : 'Quero ser early-adopter'}
          </button>
          {msg && <p className="text-sm text-slate-300">{msg}</p>}
        </form>
      </div>

      <div className="card">
        <div className="text-sm text-slate-300 mb-2">Exemplo do PDF detalhado</div>
        <div className="aspect-[4/3] rounded bg-white/10 grid place-content-center text-slate-400">
          (Preview do PDF • em breve com capa, logos, fotos, assinaturas)
        </div>
      </div>
    </section>
  );
}