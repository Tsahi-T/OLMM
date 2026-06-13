# OLMM — Off Load My Mind

לכידה קולית חכמה. לוחצים, מדברים, ו-Claude מתמלל, מנקה ומסווג אוטומטית
לאיזה "דלי" זה שייך (מחשבה / יומן / משימה) — בלי לחיצה נוספת.

## סטאק

- **Frontend:** PWA סטטי (HTML/JS/CSS), פריסה ב-Vercel
- **Auth + DB:** Supabase — התחברות Google, Postgres עם Row Level Security
- **תמלול:** Whisper דרך Groq (חינמי, זיהוי שפה אוטומטי)
- **סיווג:** Claude Haiku (`claude-haiku-4-5-20251001`)

## ארכיטקטורה

```
פלאפון (PWA)
  → מקליט אודיו (MediaRecorder)
  → שולח blob ל-Supabase Edge Function (עם טוקן המשתמש)
       ↳ Groq Whisper  → תמלול
       ↳ Claude Haiku  → { topic, cleaned_text }
       ↳ כתיבה לטבלת captures (RLS לפי user_id)
  → דשבורד קורא מ-Supabase ישירות (RLS מסנן לפי משתמש)
```

המפתחות הסודיים (Groq, Anthropic, service_role) חיים **רק** כ-secrets
ב-Edge Function — לעולם לא בקוד הצד-לקוח ולא בגיט.

## מבנה התיקיות

```
public/                 # ה-PWA הסטטי שמוגש מ-Vercel
  index.html
  styles.css
  app.js
  manifest.webmanifest
supabase/
  schema.sql            # טבלת captures + RLS
  functions/capture/    # Edge Function (תמלול + סיווג)
.env.example            # שמות המשתנים הנדרשים (בלי ערכים)
vercel.json             # הגדרות פריסה
```

## סטטוס פיתוח

- [x] שלב 1 — תשתית ושלד
- [ ] שלב 2 — התחברות Google
- [ ] שלב 3 — הקלטה + תמלול (Groq Whisper)
- [ ] שלב 4 — סיווג + שמירה (Claude Haiku)
- [ ] שלב 5 — דשבורד (רשימה, סינון, העתקה, תיקון ידני)
- [ ] שלב 6 — ליטוש PWA ובדיקות אייפון
