// OLMM — לוגיקת התחברות מול Supabase Auth (Google OAuth).
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { SUPABASE_URL, SUPABASE_ANON_KEY } from "./config.js";

// detectSessionInUrl: Supabase קולט אוטומטית את ה-callback אחרי חזרה מגוגל.
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    detectSessionInUrl: true,
    persistSession: true,
    autoRefreshToken: true,
  },
});

export async function signInWithGoogle() {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    // חוזרים לאותה כתובת שממנה יצאנו (localhost בפיתוח, דומיין Vercel בפרודקשן).
    options: { redirectTo: window.location.origin },
  });
  if (error) alert("שגיאת התחברות: " + error.message);
}

export async function signOut() {
  await supabase.auth.signOut();
}
