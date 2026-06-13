-- OLMM — סכמת מסד הנתונים
-- מריצים פעם אחת ב-Supabase: SQL Editor → New query → Run
--
-- הערה על topic: שומרים מפתח באנגלית ('thought' / 'journal' / 'task')
-- כדי שהקוד יהיה נקי; התצוגה בעברית קורית בצד-לקוח.

create table if not exists public.captures (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid not null references auth.users (id) on delete cascade default auth.uid(),
  created_at    timestamptz not null default now(),
  raw_text      text not null,                 -- התמלול הגולמי מ-Whisper
  cleaned_text  text not null,                 -- הטקסט המנוקה מ-Claude
  topic         text not null check (topic in ('thought', 'journal', 'task')),
  language      text                           -- שפה שזוהתה ע"י Whisper (אופציונלי)
);

-- אינדקס לשליפת הדשבורד: של המשתמש, מהחדש לישן
create index if not exists captures_user_created_idx
  on public.captures (user_id, created_at desc);

-- ── Row Level Security ──
-- כל משתמש רואה/כותב/עורך/מוחק רק את השורות שלו.
alter table public.captures enable row level security;

create policy "select own captures"
  on public.captures for select
  using (auth.uid() = user_id);

create policy "insert own captures"
  on public.captures for insert
  with check (auth.uid() = user_id);

create policy "update own captures"
  on public.captures for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "delete own captures"
  on public.captures for delete
  using (auth.uid() = user_id);
