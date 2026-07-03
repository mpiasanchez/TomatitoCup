import { Heart } from "lucide-react";
import clsx from "clsx";
import { getAppCopy, type AppLanguage } from "../lib/i18n";

interface BrandProps {
  inverted?: boolean;
  language?: AppLanguage;
}

export function Brand({
  inverted = false,
  language = "en",
}: BrandProps) {
  const copy = getAppCopy(language);

  return (
    <a
      href="/"
      className={clsx(
        "inline-flex min-h-11 items-center gap-2 rounded-lg text-lg font-bold tracking-tight",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-watermelon focus-visible:ring-offset-2",
        inverted
          ? "text-brand-floral focus-visible:ring-offset-brand-carbon"
          : "text-brand-carbon focus-visible:ring-offset-brand-floral",
      )}
      aria-label={copy.brand.ariaLabel}
    >
      <Heart
        className="h-5 w-5 fill-brand-watermelon text-brand-watermelon"
        aria-hidden="true"
      />
      {copy.brand.name}
    </a>
  );
}
