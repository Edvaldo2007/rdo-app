create table if not exists waitlist (
  id uuid primary key default gen_random_uuid(),
  nome text,
  email citext not null,
  empresa text,
  cargo text,
  created_at timestamptz default now()
);

-- você pode colar depois as demais tabelas do RDO conforme combinamos
