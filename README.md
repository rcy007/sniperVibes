# Sniper — Phase-1 MVP

Full-stack Next.js 15 + Supabase + Tailwind + shadcn/ui prototype.

## 1. Prerequisites

* Node 20+
* Supabase CLI (`brew install supabase`)
* Docker (for Postgres & Studio via Supabase CLI)
* OpenAI API key

## 2. Setup

```bash
# install deps
cd my-app && npm install

# copy env vars
cp .env.local.example .env.local
# → fill in the values

# start Supabase in another terminal (first time spins up containers)
cd sniperVibes/

npx supabase start

# push DB schema & seeds
npx supabase db reset

# run dev server
npm run dev
```

App is now at http://localhost:3000
Supabase Studio: http://localhost:54323

## 3. Environment variables (`my-app/.env.local.example`)

```
NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_ANON
SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVICE_ROLE
OPENAI_API_KEY=sk-...
# Optional test user (for Edge Function upsert when auth not present)
TEST_USER_ID=00000000-0000-0000-0000-000000000000
```

## 4. Edge Function

Deploy locally with:

```bash
supabase functions deploy process_portfolio_import
```

The function will upsert parsed holdings after an image is uploaded to the `imports` bucket.

---

© 2025 SniperVibes

