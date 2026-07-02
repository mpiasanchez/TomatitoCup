import { useId, type TextareaHTMLAttributes } from "react";
import clsx from "clsx";
import { FormField, getDescriptionIds } from "./FormField";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  helperText?: string;
  error?: string;
}

export function Textarea({
  id: providedId,
  label,
  helperText,
  error,
  className,
  required,
  rows = 3,
  ...props
}: TextareaProps) {
  const generatedId = useId();
  const id = providedId ?? generatedId;

  return (
    <FormField
      id={id}
      label={label}
      required={required}
      helperText={helperText}
      error={error}
    >
      <textarea
        id={id}
        required={required}
        rows={rows}
        className={clsx(
          "w-full resize-y rounded-xl border bg-brand-floral px-3.5 py-2.5 text-base text-brand-carbon shadow-sm",
          "placeholder:text-brand-charcoal/55",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-watermelon focus-visible:ring-offset-2 focus-visible:ring-offset-brand-floral",
          "disabled:cursor-not-allowed disabled:bg-brand-ash/25 disabled:opacity-70",
          error
            ? "border-brand-watermelonDark"
            : "border-brand-charcoal/35 hover:border-brand-charcoal/60",
          className,
        )}
        aria-invalid={error ? true : undefined}
        aria-describedby={getDescriptionIds(id, helperText, error)}
        {...props}
      />
    </FormField>
  );
}
