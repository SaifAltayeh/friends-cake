import Link from "next/link";
import { cn } from "@/lib/cn";

const styles = {
  primary:
    "bg-navy text-ivory hover:bg-navy-soft disabled:bg-slate disabled:text-ivory",
  ghost:
    "bg-transparent text-navy border border-navy/20 hover:border-navy hover:bg-navy hover:text-ivory",
  light:
    "bg-ivory text-navy hover:bg-white disabled:bg-mist disabled:text-ink-soft",
  inverse:
    "bg-ivory text-navy hover:bg-white border border-ivory/0",
};

type Common = {
  children: React.ReactNode;
  className?: string;
  variant?: keyof typeof styles;
};

export function Button({
  children,
  className,
  variant = "primary",
  ...props
}: Common & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 px-6 py-3 text-[0.72rem] font-medium tracking-[0.18em] uppercase transition-colors duration-200 disabled:cursor-not-allowed",
        styles[variant],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function ButtonLink({
  href,
  children,
  className,
  variant = "primary",
}: Common & { href: string }) {
  return (
    <Link
      href={href}
      scroll={false}
      className={cn(
        "inline-flex items-center justify-center gap-2 px-6 py-3 text-[0.72rem] font-medium tracking-[0.18em] uppercase transition-colors duration-200",
        styles[variant],
        className,
      )}
    >
      {children}
    </Link>
  );
}
