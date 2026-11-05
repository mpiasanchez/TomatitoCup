import { useEffect, useRef, useState } from "react";
import type { Session, User } from "@supabase/supabase-js";
import type { DateExperience } from "./types/dateExperience";
import { GuestView } from "./pages/GuestView";
import { HostDashboard } from "./pages/HostDashboard";
import { HomePage } from "./pages/HomePage";
import { PreviewView } from "./pages/PreviewView";
import { AuthPage } from "./pages/AuthPage";
import {
  getStoredLanguage,
  saveStoredLanguage,
  type AppLanguage,
  getAppCopy,
} from "./lib/i18n";
import { GUEST_PATH, HOST_DASHBOARD_PATH, resolveAppRoute } from "./lib/routes";
import { getCurrentSession, signOut } from "./lib/auth";
import { isSupabaseConfigured, supabase } from "./lib/supabase";

function resolveNextPathAfterAuth(): string {
  const next = `${window.location.pathname}${window.location.search}`;

  if (window.location.pathname === "/") {
    return HOST_DASHBOARD_PATH;
  }

  return next;
}

export function App() {
  const [language, setLanguage] = useState<AppLanguage>(() =>
    getStoredLanguage(),
  );
  const [previewExperience, setPreviewExperience] =
    useState<DateExperience | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isSessionLoading, setIsSessionLoading] = useState(true);
  const [authMessage, setAuthMessage] = useState("");
  const manualSignOutRef = useRef(false);

  const route = resolveAppRoute(window.location.pathname);
  const copy = getAppCopy(language);
  const isProtectedRoute = route === "guest" || route === "host";

  useEffect(() => {
    saveStoredLanguage(language);
    document.documentElement.lang = language;
  }, [language]);

  useEffect(() => {
    if (!isSupabaseConfigured() || !supabase) {
      setIsSessionLoading(false);
      return;
    }

    let isMounted = true;

    async function loadSession() {
      const { session: nextSession, user: nextUser, error } =
        await getCurrentSession();

      if (!isMounted) {
        return;
      }

      setSession(nextSession);
      setUser(nextUser);
      setIsSessionLoading(false);

      if (error?.message) {
        setAuthMessage(error.message);
      }
    }

    loadSession().catch(() => {
      if (isMounted) {
        setIsSessionLoading(false);
        setAuthMessage(copy.auth.genericError);
      }
    });

    const { data: listener } = supabase.auth.onAuthStateChange((event, nextSession) => {
      setSession(nextSession);
      setUser(nextSession?.user ?? null);
      setIsSessionLoading(false);

      if (event === "SIGNED_OUT") {
        if (manualSignOutRef.current) {
          manualSignOutRef.current = false;
          setAuthMessage(copy.auth.authRequiredText);
          return;
        }

        setAuthMessage(copy.auth.sessionExpiredText);
        return;
      }

      if (event === "SIGNED_IN") {
        setAuthMessage("");
      }
    });

    return () => {
      isMounted = false;
      listener.subscription.unsubscribe();
    };
  }, [copy.auth.authRequiredText, copy.auth.genericError, copy.auth.sessionExpiredText]);

  if (!isSupabaseConfigured()) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-brand-floral px-4 text-center text-brand-charcoal">
        <p role="alert">{copy.auth.configError}</p>
      </div>
    );
  }

  if (isSessionLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-brand-floral px-4 text-center text-brand-charcoal">
        <p role="status" aria-live="polite">
          {copy.auth.signingIn}
        </p>
      </div>
    );
  }

  if (route === "resetPassword") {
    return (
      <AuthPage
        mode="resetPassword"
        language={language}
        onLanguageChange={setLanguage}
        message={authMessage}
        onSignedIn={() => {
          window.location.href = HOST_DASHBOARD_PATH;
        }}
      />
    );
  }

  if (isProtectedRoute && !session) {
    const requiredMessage =
      authMessage || copy.auth.authRequiredText;

    return (
      <AuthPage
        language={language}
        onLanguageChange={setLanguage}
        message={requiredMessage}
        onSignedIn={() => {
          window.location.href = resolveNextPathAfterAuth();
        }}
      />
    );
  }

  if (route === "guest") {
    return (
      <GuestView
        language={language}
        userId={user?.id ?? ""}
        onLanguageChange={setLanguage}
        onSignOut={async () => {
          manualSignOutRef.current = true;
          await signOut();
        }}
      />
    );
  }

  if (route === "home") {
    return (
      <HomePage
        language={language}
        onLanguageChange={setLanguage}
      />
    );
  }

  if (previewExperience) {
    return (
      <PreviewView
        experience={previewExperience}
        onBack={() => setPreviewExperience(null)}
        language={language}
        onLanguageChange={setLanguage}
      />
    );
  }

  return (
    <HostDashboard
      userId={user?.id ?? ""}
      onPreview={setPreviewExperience}
      language={language}
      onLanguageChange={setLanguage}
      onSignOut={async () => {
        manualSignOutRef.current = true;
        await signOut();

        if (window.location.pathname !== GUEST_PATH) {
          window.location.href = "/";
        }
      }}
    />
  );
}
