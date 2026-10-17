import { ButtonLink } from "@/components/ui/Button";

export function EmptyState({
  title,
  body,
  href,
  action,
}: {
  title: string;
  body: string;
  href?: string;
  action?: string;
}) {
  return (
    <div className="border border-navy/10 bg-white px-5 py-10 text-center sm:px-8 sm:py-16">
      <h2 className="font-serif text-[1.75rem] text-navy sm:text-3xl">{title}</h2>
      <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-ink-soft">{body}</p>
      {href && action ? (
        <ButtonLink href={href} className="mt-8 w-full sm:w-auto">
          {action}
        </ButtonLink>
      ) : null}
    </div>
  );
}
