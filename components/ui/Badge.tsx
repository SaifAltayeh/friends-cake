import { cn } from "@/lib/cn";

export function Badge({
  children,
  tone = "navy",
}: {
  children: React.ReactNode;
  tone?: "navy" | "ivory";
}) {
  return (
    <span
      className={cn(
        "inline-flex px-2 py-1 text-[0.62rem] font-medium tracking-[0.18em] uppercase",
        tone === "navy" ? "bg-navy text-ivory" : "bg-ivory/90 text-navy",
      )}
    >
      {children}
    </span>
  );
}
