import type { DateExperience } from "../types/dateExperience";
import { GuestExperience } from "../components/GuestExperience";

interface PreviewViewProps {
  experience: DateExperience;
  onBack: () => void;
}

export function PreviewView({ experience, onBack }: PreviewViewProps) {
  return (
    <GuestExperience
      experience={experience}
      persistProgress={false}
      onBack={onBack}
      backLabel="Back to editing"
    />
  );
}
