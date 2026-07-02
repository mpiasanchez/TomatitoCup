import type { ButtonHTMLAttributes, ReactNode } from "react";
import { LoaderCircle } from "lucide-react";
import clsx from "clsx";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger" | "accent";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  loading?: boolean;
  icon?: ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "border-brand-carbon bg-brand-carbon text-brand-floral shadow-card hover:-translate-y-0.5 hover:bg-brand-charcoal",
  secondary:
    "border-brand-carbon/25 bg-brand-floral text-brand-carbon hover:-translate-y-0.5 hover:border-brand-watermelon",
  ghost:
    "border-transparent bg-transparent text-brand-charcoal hover:bg-brand-ash/30 hover:text-brand-carbon",
  danger:
    "border-brand-watermelonDark/50 bg-brand-floral text-brand-watermelonDark hover:bg-brand-watermelonDark hover:text-brand-floral",
  accent:
    "border-brand-watermelonDark bg-brand-watermelonDark text-brand-floral shadow-card hover:-translate-y-0.5 hover:bg-brand-watermelon",
};

export function Button({
  children,
  className,
  variant = "primary",
  loading = false,
  disabled,
  icon,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={clsx(
        "inline-flex min-h-11 items-center justify-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold leading-5 transition duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-watermelon focus-visible:ring-offset-2 focus-visible:ring-offset-brand-floral",
        "disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0",
        "motion-reduce:transition-none motion-reduce:transform-none",
        variantClasses[variant],
        className,
      )}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...props}
    >
      {loading ? (
        <LoaderCircle className="h-4 w-4 animate-spin motion-reduce:animate-none" />
      ) : (
        icon
      )}
      {children}
    </button>
  );
}
