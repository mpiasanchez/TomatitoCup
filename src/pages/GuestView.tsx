import { useEffect } from "react";
import { AlertCircle, ArrowLeft } from "lucide-react";
import { decodeExperience } from "../lib/encoding";
import { saveHostDate } from "../lib/storage";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { GuestExperience } from "../components/GuestExperience";
import { Brand } from "../components/Brand";
import {
  getAppCopy,
  type AppLanguage,
} from "../lib/i18n";
import { LanguageToggle } from "../components/LanguageToggle";

interface GuestViewProps {
  language: AppLanguage;
  onLanguageChange: (language: AppLanguage) => void;
}

function getExperienceFromUrl() {
  const payload = new URLSearchParams(window.location.search).get("data");

  return payload ? decodeExperience(payload) : null;
}

export function GuestView({
  language,
  onLanguageChange,
}: GuestViewProps) {
  const copy = getAppCopy(language);
  const experience = getExperienceFromUrl();

  useEffect(() => {
    if (experience) {
      saveHostDate(experience);
    }
  }, [experience]);

  if (!experience) {
    return (
      <div className="min-h-screen bg-brand-floral text-brand-carbon">
        <header className="mx-auto flex w-full max-w-5xl items-center justify-between px-4 py-5 sm:px-6">
          <Brand language={language} />
          <LanguageToggle
            language={language}
            onChange={onLanguageChange}
          />
        </header>
        <main className="mx-auto flex w-full max-w-5xl items-center justify-center px-4 py-16 sm:px-6">
          <Card
            className="w-full max-w-xl p-7 text-center sm:p-10"
            role="alert"
            aria-live="assertive"
          >
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-ash/35">
              <AlertCircle className="h-6 w-6" aria-hidden="true" />
            </span>
            <h1 className="mt-6 text-3xl font-bold tracking-tight">
              {copy.guest.brokenLinkTitle}
            </h1>
            <p className="mt-3 leading-7 text-brand-charcoal">
              {copy.guest.brokenLinkText}
            </p>
            <Button
              className="mt-7"
              icon={<ArrowLeft className="h-4 w-4" aria-hidden="true" />}
              onClick={() => {
                window.location.href = "/";
              }}
            >
              {copy.guest.brokenLinkButton}
            </Button>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <GuestExperience
      experience={experience}
      language={language}
      onLanguageChange={onLanguageChange}
    />
  );
}
