import { useEffect } from "react";
import { AlertCircle, ArrowLeft } from "lucide-react";
import { decodeExperience } from "../lib/encoding";
import { saveHostDate } from "../lib/storage";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { GuestExperience } from "../components/GuestExperience";
import { Brand } from "../components/Brand";

function getExperienceFromUrl() {
  const payload = new URLSearchParams(window.location.search).get("data");

  return payload ? decodeExperience(payload) : null;
}

export function GuestView() {
  const experience = getExperienceFromUrl();

  useEffect(() => {
    if (experience) {
      saveHostDate(experience);
    }
  }, [experience]);

  if (!experience) {
    return (
      <div className="min-h-screen bg-brand-floral text-brand-carbon">
        <header className="mx-auto flex w-full max-w-5xl px-4 py-5 sm:px-6">
          <Brand />
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
              This mystery link needs a second look.
            </h1>
            <p className="mt-3 leading-7 text-brand-charcoal">
              The date details are missing or the link was damaged along the
              way. Ask your partner to generate a fresh one.
            </p>
            <Button
              className="mt-7"
              icon={<ArrowLeft className="h-4 w-4" aria-hidden="true" />}
              onClick={() => {
                window.location.href = "/";
              }}
            >
              Go to Mystery Date
            </Button>
          </Card>
        </main>
      </div>
    );
  }

  return <GuestExperience experience={experience} />;
}
