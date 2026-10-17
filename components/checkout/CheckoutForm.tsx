"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { fulfillment } from "@/data/site";
import type { CheckoutFormValues } from "@/types/checkout";
import { validateCheckout, hasErrors } from "@/lib/validation";
import { writeSessionJson } from "@/lib/storage";
import { useCart } from "@/context/CartContext";
import { FormField, FieldInput, FieldSelect, FieldTextarea } from "@/components/ui/FormField";
import { Button } from "@/components/ui/Button";
import { CartSummary } from "@/components/cart/CartSummary";
import { EmptyState } from "@/components/ui/EmptyState";

const initial: CheckoutFormValues = {
  fullName: "",
  email: "",
  phone: "",
  fulfillment: "delivery",
  address: "",
  city: "",
  requestedDate: "",
  requestedTime: "",
  notes: "",
  payment: "cod",
};

export function CheckoutForm() {
  const router = useRouter();
  const { items, subtotal, total, clear } = useCart();
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function set<K extends keyof CheckoutFormValues>(key: K, value: CheckoutFormValues[K]) {
    setValues((current) => ({ ...current, [key]: value }));
  }

  function submit(event: React.FormEvent) {
    event.preventDefault();
    const next = validateCheckout(values);
    setErrors(next);
    if (hasErrors(next) || items.length === 0) return;

    const reference = `FC-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
    writeSessionJson("friends-cake.order", {
      reference,
      createdAt: new Date().toISOString(),
      customer: values,
      itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
      subtotal,
      estimatedTotal: total,
    });
    clear();
    router.push(`/checkout?confirmed=${reference}`);
  }

  if (items.length === 0) {
    return (
      <EmptyState
        title="Your cart is empty"
        body="Add a cake before checking out."
        href="/shop"
        action="Browse cakes"
      />
    );
  }

  return (
    <form onSubmit={submit} className="grid gap-10 lg:grid-cols-[1fr_320px]">
      <div className="space-y-6">
        <FormField label="Full name" htmlFor="fullName" required error={errors.fullName}>
          <FieldInput
            id="fullName"
            value={values.fullName}
            error={errors.fullName}
            onChange={(event) => set("fullName", event.target.value)}
          />
        </FormField>
        <div className="grid gap-6 sm:grid-cols-2">
          <FormField label="Email" htmlFor="email" required error={errors.email}>
            <FieldInput
              id="email"
              type="email"
              value={values.email}
              error={errors.email}
              onChange={(event) => set("email", event.target.value)}
            />
          </FormField>
          <FormField label="Phone" htmlFor="phone" required error={errors.phone}>
            <FieldInput
              id="phone"
              value={values.phone}
              error={errors.phone}
              onChange={(event) => set("phone", event.target.value)}
            />
          </FormField>
        </div>
        <fieldset>
          <legend className="mb-3 text-[0.72rem] tracking-[0.16em] uppercase">
            Delivery or pickup
          </legend>
          <div className="grid gap-3 sm:grid-cols-2">
            {fulfillment.methods.map((method) => (
              <label
                key={method.id}
                className="flex cursor-pointer flex-col border border-navy/15 bg-white p-4"
              >
                <span className="flex items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name="fulfillment"
                    checked={values.fulfillment === method.id}
                    onChange={() => set("fulfillment", method.id as CheckoutFormValues["fulfillment"])}
                  />
                  {method.label}
                </span>
                <span className="mt-1 text-xs text-ink-soft">{method.helper}</span>
              </label>
            ))}
          </div>
        </fieldset>
        {values.fulfillment === "delivery" ? (
          <FormField label="Delivery address" htmlFor="address" required error={errors.address}>
            <FieldInput
              id="address"
              value={values.address}
              error={errors.address}
              onChange={(event) => set("address", event.target.value)}
            />
          </FormField>
        ) : null}
        <FormField label="City / area" htmlFor="city" required error={errors.city}>
          <FieldInput
            id="city"
            value={values.city}
            error={errors.city}
            onChange={(event) => set("city", event.target.value)}
          />
        </FormField>
        <div className="grid gap-6 sm:grid-cols-2">
          <FormField label="Requested date" htmlFor="requestedDate" required error={errors.requestedDate}>
            <FieldInput
              id="requestedDate"
              type="date"
              value={values.requestedDate}
              error={errors.requestedDate}
              onChange={(event) => set("requestedDate", event.target.value)}
            />
          </FormField>
          <FormField label="Requested time" htmlFor="requestedTime">
            <FieldInput
              id="requestedTime"
              type="time"
              value={values.requestedTime}
              onChange={(event) => set("requestedTime", event.target.value)}
            />
          </FormField>
        </div>
        <fieldset>
          <legend className="mb-3 text-[0.72rem] tracking-[0.16em] uppercase">
            Payment method · demo
          </legend>
          {fulfillment.paymentMethods.map((method) => (
            <label key={method.id} className="mb-2 flex cursor-pointer gap-3 border border-navy/10 p-3">
              <input
                type="radio"
                name="payment"
                checked={values.payment === method.id}
                onChange={() => set("payment", method.id as CheckoutFormValues["payment"])}
              />
              <span>
                <span className="block text-sm">{method.label}</span>
                <span className="text-xs text-ink-soft">{method.helper}</span>
              </span>
            </label>
          ))}
        </fieldset>
        <FormField label="Order notes" htmlFor="notes">
          <FieldTextarea
            id="notes"
            value={values.notes}
            onChange={(event) => set("notes", event.target.value)}
          />
        </FormField>
        <Button type="submit">Place demo order</Button>
      </div>
      <CartSummary subtotal={subtotal} total={total} withCheckout={false} />
    </form>
  );
}

export { FieldSelect };
