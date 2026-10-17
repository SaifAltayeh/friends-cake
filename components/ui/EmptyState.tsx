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
    <div className="border border-navy/10 bg-white px-8 py-16 text-center">
      <h2 className="font-serif text-3xl text-navy">{title}</h2>
      <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-ink-soft">{body}</p>
      {href && action ? (
        <ButtonLink href={href} className="mt-8">
          {action}
        </ButtonLink>
      ) : null}
    </div>
  );
}
