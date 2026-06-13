// OLMM — נקודת כניסה של הצד-לקוח. שלב 2: ניהול מצב התחברות.
import { supabase, signInWithGoogle, signOut } from "./auth.js";
import { IS_CONFIGURED } from "./config.js";

const loginView = document.getElementById("login-view");
const appView = document.getElementById("app-view");
const userEmail = document.getElementById("user-email");
const configWarning = document.getElementById("config-warning");

// מציג את המסך המתאים לפי מצב ההתחברות.
function render(session) {
  const loggedIn = Boolean(session);
  loginView.hidden = loggedIn;
  appView.hidden = !loggedIn;
  if (loggedIn) {
    userEmail.textContent = session.user.email ?? "";
  }
}

document.getElementById("login-btn").addEventListener("click", signInWithGoogle);
document.getElementById("signout-btn").addEventListener("click", signOut);

// אזהרה אם config.js עדיין עם ערכי placeholder.
if (!IS_CONFIGURED) {
  configWarning.hidden = false;
}

// מצב התחלתי + האזנה לשינויים (התחברות / התנתקות / רענון טוקן).
supabase.auth.getSession().then(({ data }) => render(data.session));
supabase.auth.onAuthStateChange((_event, session) => render(session));
