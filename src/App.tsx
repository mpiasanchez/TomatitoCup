import { useState } from "react";
import type { DateExperience } from "./types/dateExperience";
import { GuestView } from "./pages/GuestView";
import { HostDashboard } from "./pages/HostDashboard";
import { PreviewView } from "./pages/PreviewView";

export function App() {
  const [previewExperience, setPreviewExperience] =
    useState<DateExperience | null>(null);
  const isGuestRoute = window.location.pathname === "/play";

  if (isGuestRoute) {
    return <GuestView />;
  }

  if (previewExperience) {
    return (
      <PreviewView
        experience={previewExperience}
        onBack={() => setPreviewExperience(null)}
      />
    );
  }

  return <HostDashboard onPreview={setPreviewExperience} />;
}
