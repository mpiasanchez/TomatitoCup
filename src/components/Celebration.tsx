import { Heart, Sparkles } from "lucide-react";
import { SeedCluster } from "./SeedCluster";

export function Celebration() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-cozy"
      aria-hidden="true"
    >
      <Sparkles className="absolute left-[8%] top-[12%] h-5 w-5 animate-gentle-pulse text-brand-watermelon motion-reduce:animate-none" />
      <Heart className="absolute right-[10%] top-[16%] h-4 w-4 rotate-12 fill-brand-watermelon text-brand-watermelon" />
      <SeedCluster
        light
        className="absolute -bottom-1 -right-1 z-0 rotate-12 opacity-55"
      />
      <span className="absolute -bottom-32 -left-28 h-40 w-40 rounded-full border-[18px] border-brand-ash/10" />
      <span className="absolute -right-28 -top-28 h-36 w-36 rounded-full border-[16px] border-brand-ash/10" />
    </div>
  );
}
