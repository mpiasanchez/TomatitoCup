import clsx from "clsx";

interface SeedClusterProps {
  className?: string;
  light?: boolean;
}

export function SeedCluster({
  className,
  light = false,
}: SeedClusterProps) {
  return (
    <div
      className={clsx("flex items-center gap-2", className)}
      aria-hidden="true"
    >
      <span
        className={clsx(
          "h-3 w-1.5 rotate-[28deg] rounded-full",
          light ? "bg-brand-floral" : "bg-brand-carbon",
        )}
      />
      <span
        className={clsx(
          "h-3 w-1.5 -rotate-[18deg] rounded-full",
          light ? "bg-brand-floral" : "bg-brand-carbon",
        )}
      />
      <span
        className={clsx(
          "h-3 w-1.5 rotate-[12deg] rounded-full",
          light ? "bg-brand-floral" : "bg-brand-carbon",
        )}
      />
    </div>
  );
}
