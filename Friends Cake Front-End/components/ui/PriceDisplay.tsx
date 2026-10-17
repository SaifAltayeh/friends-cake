import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/cn";

export function PriceDisplay({
  amount,
  className,
}: {
  amount: number;
  className?: string;
}) {
  return (
    <span className={cn("font-sans text-sm tracking-wide text-ink", className)}>
      {formatPrice(amount)}
    </span>
  );
}
