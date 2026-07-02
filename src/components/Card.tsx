import type { HTMLAttributes } from "react";
import clsx from "clsx";

type CardVariant = "base" | "soft" | "dark" | "open";

interface CardProps extends HTMLAttributes<HTMLElement> {
  as?: "section" | "article" | "div";
  variant?: CardVariant;
}

const variantClasses: Record<CardVariant, string> = {
  base: "border border-brand-carbon/10 bg-brand-floral shadow-card",
  soft: "border border-brand-charcoal/15 bg-brand-ash/35",
  dark: "border border-brand-carbon bg-brand-carbon text-brand-floral shadow-soft",
  open: "border border-transparent bg-transparent",
};

export function Card({
  as: Element = "section",
  variant = "base",
  className,
  ...props
}: CardProps) {
  return (
    <Element
      className={clsx("rounded-cozy", variantClasses[variant], className)}
      {...props}
    />
  );
}
