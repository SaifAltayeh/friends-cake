"use client";

import { useState } from "react";
import { frenchiesContent } from "@/data/frenchies";
import { FormField, FieldInput, FieldSelect, FieldTextarea } from "@/components/ui/FormField";
import { Button } from "@/components/ui/Button";
import { validateEmail, validatePhone, validateRequired, hasErrors } from "@/lib/validation";

export function FrenchiesForm() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    type: frenchiesContent.requestTypes[0] as string,
    occasion: "",
    date: "",
    guests: "",
    details: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);

  function submit(event: React.FormEvent) {
    event.preventDefault();
    const next = {
      name: validateRequired(values.name, "Full name"),
      email: validateEmail(values.email),
      phone: validatePhone(values.phone),
      occasion: validateRequired(values.occasion, "Occasion"),
    };
    setErrors(next);
    if (hasErrors(next)) return;
    setDone(true);
  }

  if (done) {
    return (
      <div className="py-8">
        <h2 className="font-serif text-3xl text-navy">Request received</h2>
        <p className="mt-4 text-sm leading-relaxed text-ink-soft">
          Thank you. The atelier will read this brief and reply with a next step.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-5">
      <FormField label="Full name" htmlFor="fr-name" required error={errors.name}>
        <FieldInput
          id="fr-name"
          variant="studio"
          value={values.name}
          error={errors.name}
          onChange={(e) => setValues({ ...values, name: e.target.value })}
        />
      </FormField>
      <div className="grid gap-5 sm:grid-cols-2">
        <FormField label="Email" htmlFor="fr-email" required error={errors.email}>
          <FieldInput
            id="fr-email"
            type="email"
            variant="studio"
            value={values.email}
            error={errors.email}
            onChange={(e) => setValues({ ...values, email: e.target.value })}
          />
        </FormField>
        <FormField label="Phone" htmlFor="fr-phone" required error={errors.phone}>
          <FieldInput
            id="fr-phone"
            variant="studio"
            value={values.phone}
            error={errors.phone}
            onChange={(e) => setValues({ ...values, phone: e.target.value })}
          />
        </FormField>
      </div>
      <FormField label="Request type" htmlFor="fr-type">
        <FieldSelect
          id="fr-type"
          variant="studio"
          value={values.type}
          onChange={(e) => setValues({ ...values, type: e.target.value })}
        >
          {frenchiesContent.requestTypes.map((type) => (
            <option key={type}>{type}</option>
          ))}
        </FieldSelect>
      </FormField>
      <FormField label="Occasion" htmlFor="fr-occasion" required error={errors.occasion}>
        <FieldInput
          id="fr-occasion"
          variant="studio"
          value={values.occasion}
          error={errors.occasion}
          onChange={(e) => setValues({ ...values, occasion: e.target.value })}
        />
      </FormField>
      <div className="grid gap-5 sm:grid-cols-2">
        <FormField label="Preferred date" htmlFor="fr-date">
          <FieldInput
            id="fr-date"
            type="date"
            variant="studio"
            value={values.date}
            onChange={(e) => setValues({ ...values, date: e.target.value })}
          />
        </FormField>
        <FormField label="Guests" htmlFor="fr-guests">
          <FieldInput
            id="fr-guests"
            type="number"
            min={1}
            variant="studio"
            value={values.guests}
            onChange={(e) => setValues({ ...values, guests: e.target.value })}
          />
        </FormField>
      </div>
      <FormField label="Details" htmlFor="fr-details">
        <FieldTextarea
          id="fr-details"
          variant="studio"
          value={values.details}
          onChange={(e) => setValues({ ...values, details: e.target.value })}
        />
      </FormField>
      <Button type="submit" className="w-full sm:w-auto">Send request</Button>
    </form>
  );
}
