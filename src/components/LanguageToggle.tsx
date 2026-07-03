import clsx from "clsx";
import type { AppLanguage } from "../lib/i18n";
import { getAppCopy } from "../lib/i18n";

interface LanguageToggleProps {
  language: AppLanguage;
  onChange: (language: AppLanguage) => void;
}

export function LanguageToggle({
  language,
  onChange,
}: LanguageToggleProps) {
  const copy = getAppCopy(language);

  return (
    <div
      className="inline-flex items-center rounded-full border border-brand-charcoal/30 bg-brand-floral p-1"
      role="group"
      aria-label={copy.common.languageSelector}
    >
      <button
        type="button"
        onClick={() => onChange("es")}
        className={clsx(
          "min-h-9 rounded-full px-3 text-xs font-semibold tracking-wide transition",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-watermelon focus-visible:ring-offset-2 focus-visible:ring-offset-brand-floral",
          language === "es"
            ? "bg-brand-carbon text-brand-floral"
            : "text-brand-charcoal hover:text-brand-carbon",
        )}
        aria-pressed={language === "es"}
      >
        ES
      </button>
      <button
        type="button"
        onClick={() => onChange("en")}
        className={clsx(
          "min-h-9 rounded-full px-3 text-xs font-semibold tracking-wide transition",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-watermelon focus-visible:ring-offset-2 focus-visible:ring-offset-brand-floral",
          language === "en"
            ? "bg-brand-carbon text-brand-floral"
            : "text-brand-charcoal hover:text-brand-carbon",
        )}
        aria-pressed={language === "en"}
      >
        EN
      </button>
    </div>
  );
}
