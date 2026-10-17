import { EmptyState } from "@/components/ui/EmptyState";

export default function NotFound() {
  return (
    <div className="mx-auto w-full max-w-3xl px-5 py-24 sm:px-8 lg:px-12">
      <EmptyState
        title="This page isn’t baked yet"
        body="The link may be out of date, or the cake is not in the demo catalogue."
        href="/shop"
        action="Browse cakes"
      />
    </div>
  );
}
