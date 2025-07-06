-- Combined migration: Simplify holdings schema and fix RLS performance
-- This replaces the complex user_id foreign key with simple user_email

-- Enable pgcrypto for UUID generation
create extension if not exists "pgcrypto";

-- Create holdings table with user_email instead of user_id
create table if not exists public.holdings (
  id uuid primary key default gen_random_uuid(),
  user_email text not null,
  source text,
  symbol text not null,
  quantity numeric not null,
  avg_price numeric,
  buy_date date,
  created_at timestamptz default now()
);

-- Row Level Security
alter table public.holdings enable row level security;

-- Create optimized RLS policy using user_email
create policy "Holdings are accessible by owner"
  on public.holdings for all
  using ((select auth.jwt() ->> 'email') = user_email)
  with check ((select auth.jwt() ->> 'email') = user_email); 