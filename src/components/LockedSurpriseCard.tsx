import { CalendarDays, Heart, LockKeyhole, MapPin } from "lucide-react";
import type {
  DateExperience,
  GuestProgress,
} from "../types/dateExperience";
import { Card } from "./Card";
import { Celebration } from "./Celebration";
import { SeedCluster } from "./SeedCluster";

interface LockedSurpriseCardProps {
  experience: DateExperience;
  progress: GuestProgress;
}

function formatRevealDate(value: string): string {
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export function LockedSurpriseCard({
  experience,
  progress,
}: LockedSurpriseCardProps) {
  if (progress.isFinalUnlocked) {
    return (
      <Card
        variant="dark"
        className="relative isolate overflow-hidden p-7 text-center animate-reveal sm:p-10 motion-reduce:animate-none"
        aria-labelledby="final-reveal-heading"
      >
        <Celebration />
        <div className="relative z-10 mx-auto max-w-2xl">
          <Heart
            className="mx-auto mb-5 h-10 w-10 fill-brand-watermelon text-brand-watermelon"
            aria-hidden="true"
          />
          <h2
            id="final-reveal-heading"
            tabIndex={-1}
            className="text-3xl font-bold tracking-tight focus:outline-none sm:text-4xl"
          >
            Surprise unlocked.
          </h2>
          <p className="mt-2 text-base text-brand-floral/75">
            The mystery was worth it.
          </p>
          <div className="mt-8 rounded-[1.35rem] border border-brand-floral/25 bg-black/10 px-5 py-7 sm:px-8">
            <p className="text-xl font-semibold leading-snug sm:text-2xl">
              {experience.finalSurpriseText}
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 border-t border-brand-floral/20 pt-5 text-sm text-brand-floral/85 sm:flex-row sm:gap-6">
              {experience.finalSurpriseLocation ? (
                <span className="inline-flex items-center gap-2">
                  <MapPin className="h-4 w-4" aria-hidden="true" />
                  {experience.finalSurpriseLocation}
                </span>
              ) : null}
              <span className="inline-flex items-center gap-2">
                <CalendarDays className="h-4 w-4" aria-hidden="true" />
                {formatRevealDate(experience.scheduledAt)}
              </span>
            </div>
          </div>
          <p className="mt-7 inline-flex items-center gap-2 text-brand-floral/90">
            <Heart
              className="h-4 w-4 text-brand-watermelon"
              aria-hidden="true"
            />
            Can&apos;t wait to see you.
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card
      variant="soft"
      className="relative overflow-hidden p-6 sm:p-7"
      aria-labelledby="locked-surprise-heading"
    >
      <div className="relative z-10 flex items-center gap-4">
        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-brand-floral text-brand-carbon shadow-sm">
          <LockKeyhole className="h-6 w-6" aria-hidden="true" />
        </span>
        <div>
          <h2
            id="locked-surprise-heading"
            className="text-lg font-semibold text-brand-carbon sm:text-xl"
          >
            Final surprise locked
          </h2>
          <p className="mt-1 text-sm leading-6 text-brand-charcoal sm:text-base">
            Solve all 3 riddles to unlock the final reveal.
          </p>
        </div>
      </div>
      <SeedCluster className="absolute bottom-5 right-6 rotate-12 opacity-80" />
      <span
        className="absolute -bottom-20 -right-16 h-40 w-40 rounded-full border-[20px] border-brand-floral/60"
        aria-hidden="true"
      />
    </Card>
  );
}
