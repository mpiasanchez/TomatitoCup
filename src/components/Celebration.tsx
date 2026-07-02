import { Heart, Sparkles } from "lucide-react";
import { SeedCluster } from "./SeedCluster";

export function Celebration() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden rounded-cozy"
      aria-hidden="true"
    >
      <Sparkles className="absolute left-[12%] top-[15%] h-5 w-5 animate-gentle-pulse text-brand-watermelon motion-reduce:animate-none" />
      <Heart className="absolute right-[12%] top-[18%] h-4 w-4 rotate-12 fill-brand-watermelon text-brand-watermelon" />
      <SeedCluster
        light
        className="absolute bottom-8 right-8 rotate-12 opacity-60"
      />
      <span className="absolute -bottom-24 -left-20 h-48 w-48 rounded-full border-[24px] border-brand-ash/10" />
      <span className="absolute -right-20 -top-24 h-44 w-44 rounded-full border-[22px] border-brand-ash/10" />
    </div>
  );
}
