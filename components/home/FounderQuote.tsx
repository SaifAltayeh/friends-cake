import { founder } from "@/data/site";

export function FounderQuote() {
  return (
    <section
      id="founder-quote"
      className="relative z-10 bg-white"
      aria-label="A note from the atelier"
    >
      <div className="mx-auto flex max-w-[42rem] flex-col items-center px-4 py-16 pb-24 text-center sm:px-8 sm:py-24 sm:pb-36 md:py-32 md:pb-48 lg:py-40 lg:pb-60">
        <p className="text-[0.95rem] leading-[1.7] text-ink md:text-[1.05rem] md:leading-[1.75]">
          “{founder.quote}”
        </p>
        <p className="mt-5 text-[0.95rem] text-ink md:text-[1.05rem]">
          — {founder.name}, {founder.role}
        </p>
      </div>
    </section>
  );
}
