import { cn } from "@/lib/cn";

export function FormField({
  label,
  htmlFor,
  error,
  hint,
  children,
  required,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <label htmlFor={htmlFor} className="block text-[0.72rem] tracking-[0.16em] uppercase text-ink">
        {label}
        {required ? <span className="text-navy"> *</span> : null}
      </label>
      {children}
      {hint && !error ? <p className="text-xs text-ink-soft">{hint}</p> : null}
      {error ? (
        <p id={`${htmlFor}-error`} className="text-xs text-red-700" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export const fieldClass =
  "w-full min-w-0 border border-navy/15 bg-white px-4 py-3 text-base outline-none transition-colors focus:border-navy";

export const fieldStudio =
  "w-full min-w-0 border-0 bg-[#f7f7f7] px-4 py-3.5 text-base outline-none transition-colors focus:bg-[#f0f0f0]";

type FieldVariant = { error?: string; variant?: "box" | "studio" };

function fieldStyles(variant: "box" | "studio" = "box", error?: string, extra?: string) {
  return cn(variant === "studio" ? fieldStudio : fieldClass, error && "ring-1 ring-red-700", extra);
}

export function FieldInput(
  props: React.InputHTMLAttributes<HTMLInputElement> & FieldVariant,
) {
  const { className, error, variant = "box", ...rest } = props;
  return (
    <input
      className={fieldStyles(variant, error, className)}
      aria-invalid={Boolean(error)}
      {...rest}
    />
  );
}

export function FieldTextarea(
  props: React.TextareaHTMLAttributes<HTMLTextAreaElement> & FieldVariant,
) {
  const { className, error, variant = "box", ...rest } = props;
  return (
    <textarea
      className={fieldStyles(variant, error, cn("min-h-28 resize-y", className))}
      aria-invalid={Boolean(error)}
      {...rest}
    />
  );
}

export function FieldSelect(
  props: React.SelectHTMLAttributes<HTMLSelectElement> & FieldVariant,
) {
  const { className, error, variant = "box", ...rest } = props;
  return (
    <select
      className={fieldStyles(variant, error, className)}
      aria-invalid={Boolean(error)}
      {...rest}
    />
  );
}
