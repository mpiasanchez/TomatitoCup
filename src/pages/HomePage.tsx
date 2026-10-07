import { ArrowRight, Heart } from "lucide-react";
import { Brand } from "../components/Brand";
import { LanguageToggle } from "../components/LanguageToggle";
import { getAppCopy, type AppLanguage } from "../lib/i18n";
import { HOST_DASHBOARD_PATH } from "../lib/routes";

interface HomePageProps {
  language: AppLanguage;
  onLanguageChange: (language: AppLanguage) => void;
}

export function HomePage({
  language,
  onLanguageChange,
}: HomePageProps) {
  const copy = getAppCopy(language);
  const steps = [
    copy.home.stepPlan,
    copy.home.stepRiddles,
    copy.home.stepShare,
  ];

  return (
    <div className="min-h-screen bg-brand-floral text-brand-carbon">
      <a className="skip-link" href="#home-main">
        {copy.home.skipToMain}
      </a>
      <header className="border-b border-brand-carbon/10">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 py-4 sm:px-6 lg:px-8">
          <Brand language={language} />
          <LanguageToggle
            language={language}
            onChange={onLanguageChange}
          />
        </div>
      </header>

      <main
        id="home-main"
        className="mx-auto w-full max-w-4xl px-4 py-12 sm:px-6 sm:py-16"
      >
        <section className="text-center">
          <span
            className="inline-flex items-center gap-2 rounded-full border border-brand-charcoal/20 bg-brand-ash/25 px-4 py-2 text-sm font-semibold text-brand-charcoal"
            aria-hidden="true"
          >
            <Heart
              className="h-4 w-4 fill-brand-watermelon text-brand-watermelon"
              aria-hidden="true"
            />
            {copy.brand.name}
          </span>
          <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl">
            {copy.home.headline}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-brand-charcoal sm:text-lg">
            {copy.home.supportingText}
          </p>
        </section>

        <section className="mt-10 rounded-[2rem] border border-brand-carbon/10 bg-brand-ash/25 p-6 text-left sm:p-8">
          <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-charcoal">
            {copy.home.stepsLabel}
          </h2>
          <ol className="mt-4 grid gap-3 text-sm leading-6 text-brand-charcoal sm:grid-cols-3 sm:text-base">
            {steps.map((step, index) => (
              <li
                key={index}
                className="rounded-2xl border border-brand-carbon/10 bg-brand-floral px-4 py-4"
              >
                <span className="text-sm font-semibold text-brand-watermelonDark">
                  <span className="sr-only">{copy.home.stepLabel} </span>
                  {index + 1}
                </span>
                <p className="mt-2">{step}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-9 text-center">
          <a
            href={HOST_DASHBOARD_PATH}
            className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full border border-brand-carbon bg-brand-carbon px-5 py-2.5 text-sm font-semibold leading-5 text-brand-floral shadow-card transition duration-200 hover:-translate-y-0.5 hover:bg-brand-charcoal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-watermelon focus-visible:ring-offset-2 focus-visible:ring-offset-brand-floral motion-reduce:transform-none motion-reduce:transition-none sm:w-auto"
          >
            {copy.home.primaryCta}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
          <p className="mt-4 text-sm text-brand-charcoal">
            {copy.home.secondaryMicrocopy}
          </p>
        </section>
      </main>
    </div>
  );
}
