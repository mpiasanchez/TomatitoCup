import { useEffect, useState } from "react";
import type { DateExperience } from "./types/dateExperience";
import { GuestView } from "./pages/GuestView";
import { HostDashboard } from "./pages/HostDashboard";
import { HomePage } from "./pages/HomePage";
import { PreviewView } from "./pages/PreviewView";
import {
  getStoredLanguage,
  saveStoredLanguage,
  type AppLanguage,
} from "./lib/i18n";
import { resolveAppRoute } from "./lib/routes";

export function App() {
  const [language, setLanguage] = useState<AppLanguage>(() =>
    getStoredLanguage(),
  );
  const [previewExperience, setPreviewExperience] =
    useState<DateExperience | null>(null);
  const route = resolveAppRoute(window.location.pathname);

  useEffect(() => {
    saveStoredLanguage(language);
    document.documentElement.lang = language;
  }, [language]);

  if (route === "guest") {
    return (
      <GuestView
        language={language}
        onLanguageChange={setLanguage}
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
      onPreview={setPreviewExperience}
      language={language}
      onLanguageChange={setLanguage}
    />
  );
}
