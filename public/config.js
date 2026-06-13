// ערכים ציבוריים מ-Supabase: Project Settings → API.
// בטוח לקומיט לגיט — ה-anon key מוגן ע"י Row Level Security בצד השרת.
// החלף את שני הערכים הבאים בערכים האמיתיים של הפרויקט שלך:
export const SUPABASE_URL = "https://YOUR-PROJECT.supabase.co";
export const SUPABASE_ANON_KEY = "YOUR-ANON-KEY";

// בדיקה אם עדיין לא הוגדרו — מאפשר הודעה ידידותית במקום קריסה שקטה.
export const IS_CONFIGURED =
  !SUPABASE_URL.includes("YOUR-PROJECT") &&
  !SUPABASE_ANON_KEY.includes("YOUR-ANON-KEY");
