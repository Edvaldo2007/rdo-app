alter table waitlist enable row level security;

create policy "waitlist insert pública"
on waitlist for insert
to anon, authenticated
with check (true);

create policy "waitlist sem select público"
on waitlist for select
using (false);