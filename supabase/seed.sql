-- ---------------------------------------------------------------------------
-- Seed auth user referenced by sample holdings rows
-- ---------------------------------------------------------------------------

insert into auth.users (
  id,
  email,
  encrypted_password,
  raw_app_meta_data,
  raw_user_meta_data
)
values (
  '00000000-0000-0000-0000-000000000000',
  'seed@example.com',
  crypt('password', gen_salt('bf')),
  '{"provider":"email","providers":["email"]}',
  '{}'
)
on conflict (id) do nothing;

-- ---------------------------------------------------------------------------
-- Seed example holdings
-- ---------------------------------------------------------------------------

insert into public.holdings (user_id, source, symbol, quantity, avg_price, current_price, buy_date)
values
  ('00000000-0000-0000-0000-000000000000', 'Seed', 'AAPL', 10, 180.5, 190.3, current_date - 90),
  ('00000000-0000-0000-0000-000000000000', 'Seed', 'BTC', 0.2, 40000, 65000, current_date - 365); 