"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/types/product";
import type { CakeConfiguration } from "@/types/cart";
import { unitPriceFor } from "@/lib/pricing";
import { formatPrice } from "@/lib/format";
import { validateCakeConfig, hasErrors } from "@/lib/validation";
import { QuantitySelector } from "@/components/ui/QuantitySelector";
import { Button } from "@/components/ui/Button";
import { FormField, FieldInput, FieldSelect, FieldTextarea } from "@/components/ui/FormField";
import { useCart } from "@/context/CartContext";
import { useUI } from "@/context/UIContext";
import { cn } from "@/lib/cn";

function OptionRow({
  label,
  options,
  value,
  onChange,
  error,
}: {
  label: string;
  options: { id: string; label: string; priceDelta: number }[];
  value: string;
  onChange: (id: string) => void;
  error?: string;
}) {
  return (
    <fieldset>
      <legend className="mb-3 text-[0.72rem] tracking-[0.16em] uppercase">{label}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option.id}
            type="button"
            onClick={() => onChange(option.id)}
            className={cn(
              "border px-3 py-2 text-sm transition-colors",
              value === option.id
                ? "border-navy bg-navy text-ivory"
                : "border-navy/15 bg-white hover:border-navy",
            )}
          >
            {option.label}
            {option.priceDelta ? ` · +${formatPrice(option.priceDelta)}` : ""}
          </button>
        ))}
      </div>
      {error ? <p className="mt-2 text-xs text-red-700">{error}</p> : null}
    </fieldset>
  );
}

export function CakeConfigurator({ product }: { product: Product }) {
  const { addProduct } = useCart();
  const { notify, openCart } = useUI();
  const [quantity, setQuantity] = useState(1);
  const [sizeId, setSizeId] = useState(product.availableSizes[0]?.id ?? "");
  const [flavorId, setFlavorId] = useState(product.availableFlavors[0]?.id ?? "");
  const [fillingId, setFillingId] = useState(product.fillings?.[0]?.id ?? "");
  const [exteriorId, setExteriorId] = useState(product.exteriors?.[0]?.id ?? "");
  const [decorationId, setDecorationId] = useState(product.decorations?.[0]?.id ?? "");
  const [message, setMessage] = useState("");
  const [requestedDate, setRequestedDate] = useState("");
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const configuration = useMemo<CakeConfiguration>(() => {
    const size = product.availableSizes.find((item) => item.id === sizeId);
    const flavor = product.availableFlavors.find((item) => item.id === flavorId);
    const filling = product.fillings?.find((item) => item.id === fillingId);
    const exterior = product.exteriors?.find((item) => item.id === exteriorId);
    const decoration = product.decorations?.find((item) => item.id === decorationId);
    return {
      sizeId,
      sizeLabel: size?.label ?? "",
      flavorId,
      flavorLabel: flavor?.label ?? "",
      fillingId: filling?.id,
      fillingLabel: filling?.label,
      exteriorId: exterior?.id,
      exteriorLabel: exterior?.label,
      decorationId: decoration?.id,
      decorationLabel: decoration?.label,
      message: message.trim() || undefined,
      requestedDate: requestedDate || undefined,
      notes: notes.trim() || undefined,
    };
  }, [
    product,
    sizeId,
    flavorId,
    fillingId,
    exteriorId,
    decorationId,
    message,
    requestedDate,
    notes,
  ]);

  const price = unitPriceFor(product, configuration);

  function add() {
    const nextErrors = validateCakeConfig({
      customizable: product.customizable,
      sizeId,
      flavorId,
      requestedDate,
    });
    setErrors(nextErrors);
    if (hasErrors(nextErrors)) return;

    addProduct(product, quantity, configuration);
    notify(`${product.name} added to cart`);
    openCart();
  }

  return (
    <div className="space-y-8">
      <OptionRow
        label="Size"
        options={product.availableSizes}
        value={sizeId}
        onChange={setSizeId}
        error={errors.sizeId}
      />
      <OptionRow
        label="Flavour"
        options={product.availableFlavors}
        value={flavorId}
        onChange={setFlavorId}
        error={errors.flavorId}
      />
      {product.fillings ? (
        <OptionRow label="Filling" options={product.fillings} value={fillingId} onChange={setFillingId} />
      ) : null}
      {product.exteriors ? (
        <OptionRow
          label="Exterior"
          options={product.exteriors}
          value={exteriorId}
          onChange={setExteriorId}
        />
      ) : null}
      {product.decorations ? (
        <OptionRow
          label="Decoration"
          options={product.decorations}
          value={decorationId}
          onChange={setDecorationId}
        />
      ) : null}

      {product.customizable ? (
        <>
          <FormField label="Message on the cake" htmlFor="cake-message" hint="Optional · demo field">
            <FieldInput
              id="cake-message"
              maxLength={40}
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Happy birthday…"
            />
          </FormField>
          <FormField
            label="Requested date"
            htmlFor="cake-date"
            required
            error={errors.requestedDate}
          >
            <FieldInput
              id="cake-date"
              type="date"
              value={requestedDate}
              error={errors.requestedDate}
              onChange={(event) => setRequestedDate(event.target.value)}
            />
          </FormField>
          <FormField label="Additional notes" htmlFor="cake-notes">
            <FieldTextarea
              id="cake-notes"
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
            />
          </FormField>
        </>
      ) : (
        <FormField label="Size note" htmlFor="plain-size">
          <FieldSelect
            id="plain-size"
            value={sizeId}
            onChange={(event) => setSizeId(event.target.value)}
          >
            {product.availableSizes.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </FieldSelect>
        </FormField>
      )}

      <div className="border border-navy/10 bg-white p-5">
        <p className="kicker">Order summary · demo</p>
        <ul className="mt-4 space-y-2 text-sm text-ink-soft">
          <li>{configuration.sizeLabel}</li>
          <li>{configuration.flavorLabel}</li>
          {configuration.fillingLabel ? <li>{configuration.fillingLabel}</li> : null}
          {configuration.exteriorLabel ? <li>{configuration.exteriorLabel}</li> : null}
          {configuration.decorationLabel ? <li>{configuration.decorationLabel}</li> : null}
          {configuration.message ? <li>Message: “{configuration.message}”</li> : null}
          {configuration.requestedDate ? <li>Date: {configuration.requestedDate}</li> : null}
        </ul>
        <p className="mt-4 font-serif text-3xl text-navy">{formatPrice(price)}</p>
        <p className="mt-1 text-xs text-ink-soft">Demo pricing rules. Replace when confirmed.</p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
        <QuantitySelector value={quantity} onChange={setQuantity} />
        <Button onClick={add} className="w-full min-w-0 sm:min-w-40 sm:flex-1">
          Add to cart
        </Button>
      </div>
    </div>
  );
}
