import type { DateExperience } from "../types/dateExperience";
import { GuestExperience } from "../components/GuestExperience";
import type { AppLanguage } from "../lib/i18n";
import { getAppCopy } from "../lib/i18n";

interface PreviewViewProps {
  experience: DateExperience;
  onBack: () => void;
  language: AppLanguage;
  onLanguageChange: (language: AppLanguage) => void;
}

export function PreviewView({
  experience,
  onBack,
  language,
  onLanguageChange,
}: PreviewViewProps) {
  const copy = getAppCopy(language);

  return (
    <GuestExperience
      experience={experience}
      persistProgress={false}
      onBack={onBack}
      backLabel={copy.common.backToEdit}
      language={language}
      onLanguageChange={onLanguageChange}
    />
  );
}
