# Refactor Log

This document tracks each structural change, MCP usage, and reasoning.

## 2025-06-19

### Added centralised providers
* `src/app/AppProviders.tsx` wraps `QueryClientProvider`, `TooltipProvider`, `ChatProvider`, and `WalletProvider`.
* `src/App.tsx` simplified – now mounts **one** global wrapper.

### Supabase helper
* `src/integrations/supabase/supabasemcp.ts` wraps `supabase.functions.invoke`, satisfying Global Rule 1.

### Node polyfills for Vite build
* Added `@esbuild-plugins/node-globals-polyfill` & `node-modules-polyfill`.
* Updated `vite.config.ts` `optimizeDeps.esbuildOptions.plugins`.

### Edge-function & database scaffold
* Created `supabase/functions/profile_get/index.ts` stub.
* Created `supabase/migrations/202506191231_profiles_rls.sql` – table + RLS policies (see below).

### Environment
* Extended `.env.example` with the three keys the user supplied.

## MCP mapping
| Area | Tool | Purpose |
|------|------|---------|
| Supabase function calls | **supabasemcp.ts** | Front-end invocation wrapper |
| Supabase SQL & functions | Supabase CLI / Windsurf supabase MCP | Create tables, RLS, and edge functions |
| Playwright e2e | **mcp4** (playwright) | Automated UI smoke tests |
| Git branch/PR | **github MCP** | Create/push to `windsurf` branch, open PR |
| Docs & reasoning | current file | Single source of truth |

---
### `profiles` table & RLS (migration excerpt)
```sql
create table if not exists public.profiles (
  id uuid primary key default gen_random_uuid(),
  uid uuid references auth.users not null,
  display_name text,
  avatar_url text,
  created_at timestamptz default now()
);

-- Row-level security
alter table public.profiles enable row level security;

create policy "Profiles are selectable by owner" on public.profiles
  for select using ( auth.uid() = uid );

create policy "Profiles are updatable by owner" on public.profiles
  for update using ( auth.uid() = uid );
```

---
## Next
1. Implement remaining edge function stubs (`profile_update`, `wallet_balances`, `market_prices`, `chat_message_send`).
2. Add baseline Playwright test.
3. Push commits to `windsurf` branch and trigger Vercel preview.
