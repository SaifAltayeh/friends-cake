import { cn } from "@/lib/cn";

export function SectionHeading({
  kicker,
  title,
  body,
  align = "left",
}: {
  kicker?: string;
  title: string;
  body?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={cn(align === "center" && "text-center mx-auto max-w-2xl")}>
      {kicker ? <p className="kicker mb-4">{kicker}</p> : null}
      <h2 className="font-serif text-4xl text-navy md:text-5xl">{title}</h2>
      {body ? (
        <p
          className={cn(
            "mt-4 max-w-xl text-sm leading-relaxed text-ink-soft md:text-base",
            align === "center" && "mx-auto",
          )}
        >
          {body}
        </p>
      ) : null}
    </div>
  );
}
