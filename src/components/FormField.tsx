import type { ReactNode } from "react";

interface FormFieldProps {
  id: string;
  label: string;
  required?: boolean;
  helperText?: string;
  error?: string;
  children: ReactNode;
}

export function getDescriptionIds(
  id: string,
  helperText?: string,
  error?: string,
): string | undefined {
  const ids = [
    helperText ? `${id}-helper` : null,
    error ? `${id}-error` : null,
  ].filter(Boolean);

  return ids.length ? ids.join(" ") : undefined;
}

export function FormField({
  id,
  label,
  required = false,
  helperText,
  error,
  children,
}: FormFieldProps) {
  const requiredSuffix =
    typeof document !== "undefined" &&
    document.documentElement.lang.startsWith("es")
      ? " (obligatorio)"
      : " (required)";

  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className="block text-sm font-semibold leading-5 text-brand-carbon"
      >
        {label}
        {required ? (
          <>
            <span className="ml-1 text-brand-watermelonDark" aria-hidden="true">
              *
            </span>
            <span className="sr-only">{requiredSuffix}</span>
          </>
        ) : null}
      </label>
      {children}
      {helperText ? (
        <p id={`${id}-helper`} className="text-xs leading-5 text-brand-charcoal">
          {helperText}
        </p>
      ) : null}
      {error ? (
        <p
          id={`${id}-error`}
          className="flex items-start gap-1.5 text-sm font-medium leading-5 text-brand-watermelonDark"
        >
          <span aria-hidden="true">●</span>
          {error}
        </p>
      ) : null}
    </div>
  );
}
