import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body?.email) return NextResponse.json({ error: 'E-mail obrigatório' }, { status: 400 });
    const { error } = await supabase.from('waitlist').insert([{
      nome: body.nome ?? null,
      email: body.email,
      empresa: body.empresa ?? null,
      cargo: body.cargo ?? null
    }]);
    if (error) throw error;
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}