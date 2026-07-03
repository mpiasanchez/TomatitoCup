import type { FormEvent } from "react";
import { Check, Lightbulb, LockKeyhole } from "lucide-react";
import clsx from "clsx";
import type { Riddle } from "../types/dateExperience";
import { Button } from "./Button";
import { Card } from "./Card";
import { Input } from "./Input";
import { SeedCluster } from "./SeedCluster";
import { getAppCopy, type AppLanguage } from "../lib/i18n";

type RiddleStatus = "solved" | "current" | "locked";

interface RiddleCardProps {
  riddle: Riddle;
  status: RiddleStatus;
  answer: string;
  feedback?: string;
  isIncorrect?: boolean;
  lockedMessage?: string;
  language: AppLanguage;
  onAnswerChange: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

export function RiddleCard({
  riddle,
  status,
  answer,
  feedback,
  isIncorrect = false,
  lockedMessage,
  language,
  onAnswerChange,
  onSubmit,
}: RiddleCardProps) {
  const copy = getAppCopy(language);
  const isSolved = status === "solved";
  const isCurrent = status === "current";
  const resolvedLockedMessage =
    lockedMessage ?? copy.riddleCard.lockedMessage;

  return (
    <Card
      variant={isSolved ? "dark" : isCurrent ? "base" : "soft"}
      className={clsx(
        "relative min-h-[300px] overflow-hidden p-5 sm:p-6",
        isCurrent && "border-brand-watermelon",
      )}
      aria-labelledby={`riddle-${riddle.id}-heading`}
    >
      <div className="relative z-10">
        <div
          className={clsx(
            "flex items-center gap-3 border-b pb-4",
            isSolved ? "border-brand-floral/20" : "border-brand-carbon/10",
          )}
        >
          <span
            className={clsx(
              "flex h-10 w-10 items-center justify-center rounded-full border text-sm font-bold",
              isSolved &&
                "border-brand-floral/70 bg-transparent text-brand-floral",
              isCurrent &&
                "border-brand-watermelon text-brand-watermelonDark",
              status === "locked" &&
                "border-brand-charcoal/10 bg-brand-floral text-brand-carbon",
            )}
          >
            {isSolved ? (
              <Check className="h-5 w-5" aria-hidden="true" />
            ) : status === "locked" ? (
              <LockKeyhole className="h-4 w-4" aria-hidden="true" />
            ) : (
              riddle.order
            )}
          </span>
          <div>
            <h3
              id={`riddle-${riddle.id}-heading`}
              className="font-semibold"
            >
              {copy.progress.clueLabel} {riddle.order}
            </h3>
            <p
              className={clsx(
                "text-sm",
                isSolved
                  ? "text-brand-floral/70"
                  : isCurrent
                    ? "font-semibold text-brand-watermelonDark"
                    : "text-brand-charcoal",
              )}
            >
              {isSolved
                ? copy.riddleCard.statusSolved
                : isCurrent
                  ? copy.riddleCard.statusCurrent
                  : copy.riddleCard.statusLocked}
            </p>
          </div>
        </div>

        {isSolved ? (
          <div className="pt-7">
            <p className="text-lg font-medium leading-7">
              {riddle.successMessage || copy.guest.defaultCorrect}
            </p>
          </div>
        ) : null}

        {isCurrent ? (
          <form className="pt-5" onSubmit={onSubmit} noValidate>
            <p className="mb-5 text-xl font-semibold leading-snug text-brand-carbon">
              {riddle.prompt}
            </p>
            <Input
              id={`answer-${riddle.id}`}
              label={copy.riddleCard.answerLabel}
              value={answer}
              onChange={(event) => onAnswerChange(event.target.value)}
              placeholder={copy.riddleCard.answerPlaceholder}
              autoComplete="off"
              error={isIncorrect ? feedback : undefined}
              required
            />
            {!isIncorrect && feedback ? (
              <p
                className="mt-3 text-sm font-medium text-brand-charcoal"
                role="status"
              >
                {feedback}
              </p>
            ) : null}
            <Button variant="accent" type="submit" className="mt-5 w-full">
              {copy.riddleCard.submitButton}
            </Button>
            <p className="mt-4 flex items-center gap-2 text-xs text-brand-charcoal">
              <Lightbulb className="h-4 w-4" aria-hidden="true" />
              {copy.riddleCard.punctuationHint}
            </p>
          </form>
        ) : null}

        {status === "locked" ? (
          <div className="flex min-h-[190px] flex-col items-center justify-center pt-5 text-center">
            <LockKeyhole
              className="mb-4 h-8 w-8 text-brand-carbon"
              aria-hidden="true"
            />
            <p className="max-w-[15rem] text-sm leading-6 text-brand-charcoal">
              {resolvedLockedMessage}
            </p>
          </div>
        ) : null}
      </div>
      {isSolved ? (
        <>
          <span
            className="absolute -bottom-16 -right-16 h-40 w-40 rounded-full border-[20px] border-brand-ash/10"
            aria-hidden="true"
          />
          <SeedCluster
            light
            className="absolute bottom-5 right-5 opacity-45"
          />
        </>
      ) : null}
      {isCurrent ? (
        <SeedCluster className="absolute bottom-5 right-5 opacity-80" />
      ) : null}
    </Card>
  );
}
