import {
  CalendarDays,
  Check,
  Copy,
  Eye,
  Gift,
  Heart,
  Link2,
  MapPin,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { useRef, useState, type FormEvent } from "react";
import type {
  DateExperience,
  HostFormDraft,
} from "../types/dateExperience";
import { encodeExperience } from "../lib/encoding";
import { createId } from "../lib/ids";
import { saveHostDate } from "../lib/storage";
import {
  validateHostDraft,
  type HostFormErrors,
} from "../lib/validation";
import { Brand } from "../components/Brand";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { SeedCluster } from "../components/SeedCluster";
import { Textarea } from "../components/Textarea";

interface HostDashboardProps {
  onPreview: (experience: DateExperience) => void;
}

const EMPTY_DRAFT: HostFormDraft = {
  title: "",
  teaser: "",
  scheduledAt: "",
  startingLocation: "",
  finalSurpriseText: "",
  finalSurpriseLocation: "",
  riddles: [
    { prompt: "", answer: "", successMessage: "" },
    { prompt: "", answer: "", successMessage: "" },
    { prompt: "", answer: "", successMessage: "" },
  ],
};

const sectionLinks = [
  { href: "#date-details", label: "Date details", number: 1 },
  { href: "#final-reveal", label: "The final reveal", number: 2 },
  { href: "#clue-1", label: "Clue 1", number: 3 },
  { href: "#clue-2", label: "Clue 2", number: 4 },
  { href: "#clue-3", label: "Clue 3", number: 5 },
];

function optionalValue(value: string): string | undefined {
  return value.trim() || undefined;
}

function buildExperience(
  draft: HostFormDraft,
  previous?: DateExperience,
): DateExperience {
  const now = new Date().toISOString();

  return {
    id: previous?.id ?? createId("date"),
    version: 1,
    title: draft.title.trim(),
    teaser: draft.teaser.trim(),
    scheduledAt: new Date(draft.scheduledAt).toISOString(),
    startingLocation: optionalValue(draft.startingLocation),
    finalSurpriseText: draft.finalSurpriseText.trim(),
    finalSurpriseLocation: optionalValue(draft.finalSurpriseLocation),
    riddles: draft.riddles.map((riddle, index) => ({
      id: previous?.riddles[index]?.id ?? createId("riddle"),
      order: index + 1,
      prompt: riddle.prompt.trim(),
      answer: riddle.answer.trim(),
      successMessage: optionalValue(riddle.successMessage),
    })),
    createdAt: previous?.createdAt ?? now,
    updatedAt: now,
  };
}

function formatDraftDate(value: string): string {
  if (!value) {
    return "Not scheduled yet";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Not scheduled yet";
  }

  return new Intl.DateTimeFormat(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

async function copyToClipboard(value: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(value);
    return true;
  } catch {
    const textarea = document.createElement("textarea");
    textarea.value = value;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    const copied = document.execCommand("copy");
    textarea.remove();
    return copied;
  }
}

export function HostDashboard({ onPreview }: HostDashboardProps) {
  const [draft, setDraft] = useState<HostFormDraft>(EMPTY_DRAFT);
  const [errors, setErrors] = useState<HostFormErrors>({});
  const [generatedLink, setGeneratedLink] = useState("");
  const [lastExperience, setLastExperience] = useState<
    DateExperience | undefined
  >();
  const [statusMessage, setStatusMessage] = useState("");
  const errorSummaryRef = useRef<HTMLDivElement>(null);

  function updateField<Key extends keyof Omit<HostFormDraft, "riddles">>(
    key: Key,
    value: HostFormDraft[Key],
  ) {
    setDraft((current) => ({ ...current, [key]: value }));
    if (generatedLink) {
      setGeneratedLink("");
      setStatusMessage(
        "Your details changed. Generate a fresh share link when you're ready.",
      );
    }
    setErrors((current) => {
      const next = { ...current };
      delete next[key];
      return next;
    });
  }

  function updateRiddle(
    index: number,
    field: "prompt" | "answer" | "successMessage",
    value: string,
  ) {
    setDraft((current) => {
      const riddles = current.riddles.map((riddle, riddleIndex) =>
        riddleIndex === index ? { ...riddle, [field]: value } : riddle,
      ) as HostFormDraft["riddles"];

      return { ...current, riddles };
    });
    if (generatedLink) {
      setGeneratedLink("");
      setStatusMessage(
        "Your details changed. Generate a fresh share link when you're ready.",
      );
    }
    setErrors((current) => {
      const next = { ...current };
      delete next[`riddles.${index}.${field}`];
      return next;
    });
  }

  function validateAndBuild(): DateExperience | null {
    const nextErrors = validateHostDraft(draft);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setStatusMessage("Please fix the highlighted fields.");
      window.requestAnimationFrame(() => errorSummaryRef.current?.focus());
      return null;
    }

    return buildExperience(draft, lastExperience);
  }

  function handlePreview() {
    const experience = validateAndBuild();

    if (experience) {
      onPreview(experience);
    }
  }

  function handleGenerate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const experience = validateAndBuild();

    if (!experience) {
      return;
    }

    const payload = encodeExperience(experience);
    const link = `${window.location.origin}/play?data=${payload}`;

    saveHostDate(experience);
    setLastExperience(experience);
    setGeneratedLink(link);
    setStatusMessage("Share link generated and saved on this device.");
  }

  async function handleCopy() {
    if (!generatedLink) {
      return;
    }

    const copied = await copyToClipboard(generatedLink);
    setStatusMessage(
      copied
        ? "Share link copied to your clipboard."
        : "Copy failed. Select the link and copy it manually.",
    );
  }

  function handleReset() {
    setDraft(EMPTY_DRAFT);
    setErrors({});
    setGeneratedLink("");
    setLastExperience(undefined);
    setStatusMessage("Form reset. Ready for a new mystery.");
    document.getElementById("date-title")?.focus();
  }

  const completedRequiredFields = [
    draft.title,
    draft.teaser,
    draft.scheduledAt,
    draft.finalSurpriseText,
    ...draft.riddles.flatMap((riddle) => [riddle.prompt, riddle.answer]),
  ].filter((value) => value.trim()).length;

  return (
    <div className="min-h-screen bg-brand-floral text-brand-carbon">
      <a className="skip-link" href="#host-form">
        Skip to date form
      </a>
      <div className="mx-auto min-h-screen w-full max-w-[1536px] lg:grid lg:grid-cols-[348px_1fr]">
        <aside className="relative hidden overflow-hidden border-r border-brand-carbon/10 bg-brand-ash/20 p-8 lg:flex lg:flex-col">
          <Brand />
          <div className="mt-12">
            <span
              className="mb-7 block h-0.5 w-10 bg-brand-watermelon"
              aria-hidden="true"
            />
            <h1 className="text-3xl font-bold tracking-tight">
              Create a mystery date
            </h1>
            <p className="mt-3 leading-7 text-brand-charcoal">
              Hide the surprise behind three playful clues.
            </p>
          </div>

          <nav className="mt-8" aria-label="Form sections">
            <ol className="space-y-1">
              {sectionLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="group flex min-h-11 items-center gap-3 rounded-xl px-2 text-sm font-medium text-brand-charcoal transition hover:bg-brand-floral/75 hover:text-brand-carbon focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-watermelon motion-reduce:transition-none"
                  >
                    <span
                      className={`flex h-7 w-10 items-center justify-center rounded-full text-xs font-bold ${
                        link.number === 1
                          ? "bg-brand-watermelonDark text-brand-floral"
                          : "bg-brand-ash/45 text-brand-carbon"
                      }`}
                    >
                      {link.number}
                    </span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="mt-8 border-y border-brand-carbon/10 py-6">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand-charcoal">
              Your mystery date
            </p>
            <dl className="mt-4 space-y-4 text-sm">
              <div className="flex gap-3">
                <CalendarDays className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                <div>
                  <dt className="font-semibold">Scheduled</dt>
                  <dd className="mt-0.5 text-brand-charcoal">
                    {formatDraftDate(draft.scheduledAt)}
                  </dd>
                </div>
              </div>
              <div className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                <div>
                  <dt className="font-semibold">Starting location</dt>
                  <dd className="mt-0.5 text-brand-charcoal">
                    {draft.startingLocation || "Not set"}
                  </dd>
                </div>
              </div>
              <div className="flex gap-3">
                <Gift className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                <div>
                  <dt className="font-semibold">Required details</dt>
                  <dd className="mt-0.5 text-brand-charcoal">
                    {completedRequiredFields} of 10 ready
                  </dd>
                </div>
              </div>
            </dl>
          </div>

          <div className="mt-6">
            <p className="text-sm font-semibold">Share link</p>
            <p className="mt-1 text-xs leading-5 text-brand-charcoal">
              Generate a link to send the mystery with your guest.
            </p>
            <div className="mt-3 flex min-h-11 items-center gap-2 rounded-xl border border-brand-charcoal/25 bg-brand-floral/70 px-3 text-xs text-brand-charcoal">
              <Link2 className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span className="truncate">
                {generatedLink || "No link generated yet"}
              </span>
            </div>
          </div>
          <SeedCluster className="absolute bottom-10 right-10 rotate-12 opacity-80" />
        </aside>

        <div className="min-w-0">
          <header className="border-b border-brand-carbon/10 bg-brand-floral/95">
            <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-4 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
              <div className="lg:hidden">
                <Brand />
                <p className="mt-2 text-sm text-brand-charcoal">
                  Hide the surprise behind three playful clues.
                </p>
              </div>
              <div className="hidden lg:block">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-charcoal">
                  Mystery builder
                </p>
                <p className="mt-1 text-sm text-brand-charcoal">
                  Your date is saved when you generate its link.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="secondary"
                  icon={<Eye className="h-4 w-4" aria-hidden="true" />}
                  onClick={handlePreview}
                >
                  Preview experience
                </Button>
                <Button
                  type="submit"
                  form="host-form"
                  icon={<Link2 className="h-4 w-4" aria-hidden="true" />}
                >
                  Generate share link
                </Button>
                <Button
                  variant="danger"
                  icon={<RotateCcw className="h-4 w-4" aria-hidden="true" />}
                  onClick={handleReset}
                >
                  Reset
                </Button>
              </div>
            </div>
          </header>

          <main className="mx-auto w-full max-w-6xl px-4 py-7 sm:px-6 lg:px-8">
            <div className="mb-7 lg:hidden">
              <h1 className="text-3xl font-bold tracking-tight">
                Create a mystery date
              </h1>
            </div>

            {Object.keys(errors).length > 0 ? (
              <div
                ref={errorSummaryRef}
                className="mb-7 rounded-cozy border border-brand-watermelonDark bg-brand-watermelon/[0.045] p-5 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-watermelon"
                role="alert"
                aria-live="assertive"
                tabIndex={-1}
              >
                <h2 className="font-semibold">A few details need your attention.</h2>
                <p className="mt-1 text-sm text-brand-charcoal">
                  Check the highlighted fields below, then try again.
                </p>
              </div>
            ) : null}

            <form id="host-form" onSubmit={handleGenerate} noValidate>
              <section
                id="date-details"
                className="scroll-mt-4 border-b border-brand-carbon/15 pb-6"
                aria-labelledby="date-details-heading"
              >
                <div className="mb-4 flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-watermelonDark text-sm font-bold text-brand-floral">
                    1
                  </span>
                  <h2
                    id="date-details-heading"
                    className="text-2xl font-semibold tracking-tight"
                  >
                    Date details
                  </h2>
                </div>
                <div className="grid gap-5 md:grid-cols-2">
                  <Input
                    id="date-title"
                    label="Date title"
                    value={draft.title}
                    onChange={(event) =>
                      updateField("title", event.target.value)
                    }
                    placeholder="A night to remember"
                    error={errors.title}
                    maxLength={80}
                    required
                  />
                  <Textarea
                    id="date-teaser"
                    label="Date teaser"
                    value={draft.teaser}
                    onChange={(event) =>
                      updateField("teaser", event.target.value)
                    }
                    placeholder="Get ready for a surprise made just for you…"
                    error={errors.teaser}
                    maxLength={180}
                    rows={2}
                    required
                  />
                  <Input
                    id="scheduled-at"
                    label="Scheduled date and time"
                    type="datetime-local"
                    value={draft.scheduledAt}
                    onInput={(event) =>
                      updateField("scheduledAt", event.currentTarget.value)
                    }
                    error={errors.scheduledAt}
                    required
                  />
                  <Input
                    id="starting-location"
                    label="Starting location (optional)"
                    value={draft.startingLocation}
                    onChange={(event) =>
                      updateField("startingLocation", event.target.value)
                    }
                    placeholder="Our apartment, the main entrance…"
                    maxLength={140}
                  />
                </div>
              </section>

              <section
                id="final-reveal"
                className="scroll-mt-4 border-b border-brand-carbon/15 py-6"
                aria-labelledby="final-reveal-form-heading"
              >
                <div className="mb-4 flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-ash/70 text-sm font-bold text-brand-carbon">
                    2
                  </span>
                  <h2
                    id="final-reveal-form-heading"
                    className="text-2xl font-semibold tracking-tight"
                  >
                    The final reveal
                  </h2>
                </div>
                <div className="grid gap-5 md:grid-cols-2">
                  <Textarea
                    id="final-surprise"
                    label="Final surprise"
                    value={draft.finalSurpriseText}
                    onChange={(event) =>
                      updateField("finalSurpriseText", event.target.value)
                    }
                    placeholder="Rooftop dinner, a concert, a weekend getaway…"
                    error={errors.finalSurpriseText}
                    maxLength={300}
                    rows={2}
                    required
                  />
                  <Input
                    id="final-location"
                    label="Final location (optional)"
                    value={draft.finalSurpriseLocation}
                    onChange={(event) =>
                      updateField("finalSurpriseLocation", event.target.value)
                    }
                    placeholder="Seaside Bistro, The Music Hall…"
                    maxLength={140}
                  />
                </div>
              </section>

              {draft.riddles.map((riddle, index) => (
                <section
                  id={`clue-${index + 1}`}
                  key={index}
                  className="scroll-mt-4 border-b border-brand-carbon/15 py-6"
                  aria-labelledby={`clue-${index + 1}-heading`}
                >
                  <div className="mb-4 flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-ash/70 text-sm font-bold text-brand-carbon">
                      {index + 3}
                    </span>
                    <h2
                      id={`clue-${index + 1}-heading`}
                      className="text-2xl font-semibold tracking-tight"
                    >
                      Clue {index + 1}
                    </h2>
                  </div>
                  <div className="grid gap-5 lg:grid-cols-[1.1fr_.8fr_1.1fr]">
                    <Textarea
                      id={`riddle-${index + 1}-prompt`}
                      label="Riddle prompt"
                      value={riddle.prompt}
                      onChange={(event) =>
                        updateRiddle(index, "prompt", event.target.value)
                      }
                      placeholder={
                        index === 0
                          ? "Where stories are told and books come alive…"
                          : "Write a clue only they will understand…"
                      }
                      error={errors[`riddles.${index}.prompt`]}
                      maxLength={240}
                      rows={2}
                      required
                    />
                    <Input
                      id={`riddle-${index + 1}-answer`}
                      label="Correct answer"
                      value={riddle.answer}
                      onChange={(event) =>
                        updateRiddle(index, "answer", event.target.value)
                      }
                      placeholder="Library"
                      error={errors[`riddles.${index}.answer`]}
                      maxLength={100}
                      required
                    />
                    <Textarea
                      id={`riddle-${index + 1}-success`}
                      label="Success message (optional)"
                      value={riddle.successMessage}
                      onChange={(event) =>
                        updateRiddle(index, "successMessage", event.target.value)
                      }
                      placeholder={
                        index === 2
                          ? "You did it! The big surprise awaits."
                          : "You're on the right track!"
                      }
                      maxLength={180}
                      rows={2}
                    />
                  </div>
                </section>
              ))}

              <section
                className="relative mt-7 overflow-hidden rounded-cozy border border-brand-charcoal/25 bg-brand-ash/30 p-5 sm:p-6"
                aria-labelledby="share-link-heading"
              >
                <div className="relative z-10 grid gap-5 lg:grid-cols-[1fr_1.5fr] lg:items-center">
                  <div className="flex gap-3">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-ash text-brand-carbon">
                      <Link2 className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div>
                      <h2 id="share-link-heading" className="font-semibold">
                        Share link
                      </h2>
                      <p className="mt-1 text-sm leading-5 text-brand-charcoal">
                        Generate a link to share your mystery date.
                      </p>
                    </div>
                  </div>
                  <div className="flex min-w-0 flex-col gap-2 sm:flex-row">
                    <label htmlFor="share-link" className="sr-only">
                      Generated share link
                    </label>
                    <input
                      id="share-link"
                      className="min-h-11 min-w-0 flex-1 rounded-xl border border-brand-charcoal/30 bg-brand-floral px-3 text-sm text-brand-carbon focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-watermelon focus-visible:ring-offset-2 focus-visible:ring-offset-brand-floral"
                      value={generatedLink}
                      placeholder="Your generated link will appear here"
                      readOnly
                    />
                    <Button
                      variant="primary"
                      onClick={handleCopy}
                      disabled={!generatedLink}
                      icon={<Copy className="h-4 w-4" aria-hidden="true" />}
                    >
                      Copy link
                    </Button>
                  </div>
                </div>
                <p
                  className="relative z-10 mt-4 min-h-5 text-sm font-medium text-brand-charcoal"
                  role="status"
                  aria-live="polite"
                  aria-atomic="true"
                >
                  {statusMessage}
                </p>
                <Sparkles className="absolute -right-2 -top-2 h-16 w-16 text-brand-ash opacity-60" aria-hidden="true" />
              </section>

              <div className="mt-6 flex flex-col gap-3 border-t border-brand-carbon/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
                <p className="flex items-center gap-2 text-sm italic text-brand-charcoal">
                  <Heart
                    className="h-4 w-4 text-brand-watermelonDark"
                    aria-hidden="true"
                  />
                  Your guest will solve the clues in order to reveal the surprise.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="secondary"
                    onClick={handlePreview}
                    icon={<Eye className="h-4 w-4" aria-hidden="true" />}
                  >
                    Preview
                  </Button>
                  <Button
                    type="submit"
                    icon={
                      generatedLink ? (
                        <Check className="h-4 w-4" aria-hidden="true" />
                      ) : (
                        <Link2 className="h-4 w-4" aria-hidden="true" />
                      )
                    }
                  >
                    {generatedLink ? "Regenerate link" : "Generate share link"}
                  </Button>
                </div>
              </div>
            </form>

          </main>
        </div>
      </div>
    </div>
  );
}
