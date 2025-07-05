-- Enable pgcrypto for UUID generation
create extension if not exists "pgcrypto";

-- holdings for stocks, crypto, etc.
create table if not exists public.holdings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users not null,
  source text,
  symbol text not null,
  quantity numeric not null,
  avg_price numeric,
  current_price numeric,
  buy_date date,
  created_at timestamptz default now()
);

-- Row Level Security
alter table public.holdings enable row level security;

create policy "Holdings are accessible by owner"
  on public.holdings for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id); 