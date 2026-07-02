import { useEffect, useRef, useState, type FormEvent } from "react";
import { CalendarDays, MapPin } from "lucide-react";
import type {
  DateExperience,
  GuestProgress,
} from "../types/dateExperience";
import { getCurrentRiddle, isAnswerCorrect, solveRiddle } from "../lib/gameEngine";
import {
  createInitialGuestProgress,
  getGuestProgress,
  saveGuestProgress,
} from "../lib/storage";
import { Brand } from "./Brand";
import { LockedSurpriseCard } from "./LockedSurpriseCard";
import { ProgressSteps } from "./ProgressSteps";
import { RiddleCard } from "./RiddleCard";
import { SeedCluster } from "./SeedCluster";

interface GuestExperienceProps {
  experience: DateExperience;
  persistProgress?: boolean;
  onBack?: () => void;
  backLabel?: string;
}

function formatDate(value: string): string {
  return new Intl.DateTimeFormat(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
}

function loadProgress(
  experience: DateExperience,
  persistProgress: boolean,
): GuestProgress {
  if (!persistProgress) {
    return createInitialGuestProgress(experience.id);
  }

  const stored = getGuestProgress(experience.id);

  if (!stored) {
    return createInitialGuestProgress(experience.id);
  }

  const validIds = new Set(experience.riddles.map((riddle) => riddle.id));
  const solvedRiddleIds = stored.solvedRiddleIds.filter((id) => validIds.has(id));
  const solvedCount = solvedRiddleIds.length;

  return {
    ...stored,
    solvedRiddleIds,
    currentRiddleIndex: Math.min(solvedCount, experience.riddles.length - 1),
    isFinalUnlocked: solvedCount === experience.riddles.length,
  };
}

export function GuestExperience({
  experience,
  persistProgress = true,
  onBack,
  backLabel = "Back to creator",
}: GuestExperienceProps) {
  const [progress, setProgress] = useState(() =>
    loadProgress(experience, persistProgress),
  );
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isIncorrect, setIsIncorrect] = useState(false);
  const hasSolvedRef = useRef(false);

  const currentRiddle = getCurrentRiddle(experience, progress);

  useEffect(() => {
    if (persistProgress) {
      saveGuestProgress(progress);
    }
  }, [persistProgress, progress]);

  useEffect(() => {
    if (!hasSolvedRef.current) {
      return;
    }

    if (progress.isFinalUnlocked) {
      document.getElementById("final-reveal-heading")?.focus();
    } else if (currentRiddle) {
      document.getElementById(`answer-${currentRiddle.id}`)?.focus();
    }
  }, [currentRiddle, progress.isFinalUnlocked]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!currentRiddle) {
      return;
    }

    if (!answer.trim()) {
      setIsIncorrect(true);
      setFeedback("Enter your best guess first.");
      return;
    }

    if (!isAnswerCorrect(answer, currentRiddle.answer)) {
      setIsIncorrect(true);
      setFeedback("Not quite. Try again — the mystery is still safe.");
      return;
    }

    hasSolvedRef.current = true;
    const nextProgress = solveRiddle(
      experience,
      progress,
      currentRiddle.id,
    );
    setProgress(nextProgress);
    setAnswer("");
    setIsIncorrect(false);
    setFeedback(
      nextProgress.isFinalUnlocked
        ? "All three clues solved. The surprise is unlocked."
        : currentRiddle.successMessage || "You got it. One step closer.",
    );
  }

  return (
    <div className="min-h-screen bg-brand-floral text-brand-carbon">
      <a className="skip-link" href="#guest-main">
        Skip to the mystery
      </a>
      <header className="border-b border-brand-carbon/10">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Brand />
          {onBack ? (
            <button
              type="button"
              onClick={onBack}
              className="min-h-11 rounded-lg px-3 text-sm font-semibold text-brand-charcoal hover:text-brand-carbon focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-watermelon focus-visible:ring-offset-2 focus-visible:ring-offset-brand-floral"
            >
              {backLabel}
            </button>
          ) : (
            <a
              href="/"
              className="inline-flex min-h-11 items-center rounded-lg px-3 text-sm font-semibold text-brand-charcoal hover:text-brand-carbon focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-watermelon focus-visible:ring-offset-2 focus-visible:ring-offset-brand-floral"
            >
              Create your own
            </a>
          )}
        </div>
      </header>

      <main
        id="guest-main"
        className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8"
      >
        <section className="relative mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold text-brand-watermelonDark sm:text-base">
            A surprise is waiting for you.
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-brand-carbon sm:text-5xl">
            {experience.title}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-brand-charcoal sm:text-lg">
            {experience.teaser}
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-2 text-sm text-brand-charcoal sm:flex-row sm:gap-5">
            <span className="inline-flex items-center gap-2">
              <CalendarDays className="h-4 w-4" aria-hidden="true" />
              {formatDate(experience.scheduledAt)}
            </span>
            {experience.startingLocation ? (
              <span className="inline-flex items-center gap-2">
                <MapPin className="h-4 w-4" aria-hidden="true" />
                Start at {experience.startingLocation}
              </span>
            ) : null}
          </div>
          <SeedCluster className="absolute -right-4 top-2 hidden rotate-12 opacity-25 sm:flex" />
        </section>

        <div className="mt-9">
          <ProgressSteps progress={progress} />
        </div>

        <div
          className="sr-only"
          aria-live="polite"
          aria-atomic="true"
        >
          {feedback}
        </div>

        {progress.isFinalUnlocked ? (
          <div className="mt-6">
            <LockedSurpriseCard
              experience={experience}
              progress={progress}
            />
          </div>
        ) : (
          <>
            <section
              className="mt-6 grid gap-4 md:grid-cols-3"
              aria-label="Mystery clues"
            >
              {experience.riddles.map((riddle, index) => {
                const isSolved = progress.solvedRiddleIds.includes(riddle.id);
                const status = isSolved
                  ? "solved"
                  : index === progress.currentRiddleIndex
                    ? "current"
                    : "locked";

                return (
                  <RiddleCard
                    key={riddle.id}
                    riddle={riddle}
                    status={status}
                    answer={status === "current" ? answer : ""}
                    feedback={status === "current" ? feedback : undefined}
                    isIncorrect={status === "current" && isIncorrect}
                    lockedMessage={
                      index === 2 && progress.currentRiddleIndex === 1
                        ? "Only one more clue stands between you and the surprise."
                        : undefined
                    }
                    onAnswerChange={setAnswer}
                    onSubmit={handleSubmit}
                  />
                );
              })}
            </section>
            <div className="mt-5">
              <LockedSurpriseCard
                experience={experience}
                progress={progress}
              />
            </div>
          </>
        )}
      </main>
    </div>
  );
}
