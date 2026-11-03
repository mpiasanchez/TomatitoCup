import { Check, Heart, LockKeyhole } from "lucide-react";
import clsx from "clsx";
import type { GuestProgress } from "../types/dateExperience";
import { getAppCopy, type AppLanguage } from "../lib/i18n";

interface ProgressStepsProps {
  progress: GuestProgress;
  language: AppLanguage;
  totalRiddles: number;
}

export function ProgressSteps({
  progress,
  language,
  totalRiddles,
}: ProgressStepsProps) {
  const copy = getAppCopy(language);

  const clueSteps = Array.from({ length: totalRiddles }, (_, index) => ({
    label: `${copy.progress.clueLabel} ${index + 1}`,
    index,
  }));
  const steps = [
    ...clueSteps,
    { label: copy.progress.surpriseLabel, index: totalRiddles },
  ];

  return (
    <nav aria-label={copy.progress.navLabel}>
      <ol className="grid grid-cols-2 overflow-hidden rounded-cozy border border-brand-carbon/10 bg-brand-floral shadow-card sm:grid-cols-4">
        {steps.map((step, stepIndex) => {
          const isFinalStep = stepIndex === steps.length - 1;
          const isComplete = isFinalStep
            ? progress.isFinalUnlocked
            : progress.solvedRiddleIds.length > step.index;
          const isCurrent =
            !progress.isFinalUnlocked &&
            ((isFinalStep && progress.solvedRiddleIds.length === totalRiddles) ||
              progress.currentRiddleIndex === step.index);
          const status = isComplete
            ? copy.progress.statusComplete
            : isCurrent
              ? copy.progress.statusCurrent
              : copy.progress.statusLocked;
          const Icon = isComplete
            ? isFinalStep
              ? Heart
              : Check
            : isCurrent
              ? Check
              : LockKeyhole;

          return (
            <li
              key={step.label}
              className={clsx(
                "relative flex min-h-[78px] items-center gap-3 px-4 py-3",
                step.index > 0 &&
                  "border-t border-brand-carbon/10 sm:border-l sm:border-t-0",
                isCurrent && "bg-brand-watermelon/[0.045]",
              )}
              aria-current={isCurrent ? "step" : undefined}
            >
              <span
                className={clsx(
                  "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border",
                  isComplete &&
                    "border-brand-carbon bg-brand-carbon text-brand-floral",
                  isCurrent &&
                    "border-brand-watermelon bg-brand-floral text-brand-watermelonDark",
                  !isComplete &&
                    !isCurrent &&
                    "border-brand-charcoal/10 bg-brand-ash/35 text-brand-carbon",
                )}
              >
                <Icon
                  className={clsx(
                    "h-4 w-4",
                    isComplete && isFinalStep && "fill-current",
                  )}
                  aria-hidden="true"
                />
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-semibold text-brand-carbon">
                  {step.label}
                </span>
                <span
                  className={clsx(
                    "block text-xs",
                    isCurrent
                      ? "font-semibold text-brand-watermelonDark"
                      : "text-brand-charcoal",
                  )}
                >
                  {status}
                </span>
              </span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
