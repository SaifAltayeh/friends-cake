import { pricingDemo, store } from "@/data/site";
import { formatPrice } from "@/lib/format";
import { ButtonLink } from "@/components/ui/Button";

export function CartSummary({
  subtotal,
  total,
  withCheckout = true,
}: {
  subtotal: number;
  total: number;
  withCheckout?: boolean;
}) {
  return (
    <aside className="border border-navy/10 bg-white p-5 sm:p-6">
      <h2 className="font-serif text-2xl text-navy">Summary</h2>
      <dl className="mt-6 space-y-3 text-sm">
        <div className="flex justify-between">
          <dt>Subtotal</dt>
          <dd>{formatPrice(subtotal)}</dd>
        </div>
        <div className="flex justify-between text-ink-soft">
          <dt>{pricingDemo.shippingLabel}</dt>
          <dd>{formatPrice(pricingDemo.shipping)}</dd>
        </div>
        <div className="flex justify-between text-ink-soft">
          <dt>{pricingDemo.taxLabel}</dt>
          <dd>{formatPrice(pricingDemo.tax)}</dd>
        </div>
        <div className="flex justify-between border-t border-navy/10 pt-3 font-medium">
          <dt>Estimated total</dt>
          <dd>{formatPrice(total)}</dd>
        </div>
      </dl>
      <p className="mt-3 text-xs text-ink-soft">{store.currencyNote}</p>
      {withCheckout ? (
        <ButtonLink href="/checkout" className="mt-6 w-full">
          Checkout
        </ButtonLink>
      ) : null}
    </aside>
  );
}
