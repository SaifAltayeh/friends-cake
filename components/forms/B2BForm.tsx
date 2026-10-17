"use client";

import { useState } from "react";
import { b2bContent } from "@/data/b2b";
import { FormField, FieldInput, FieldSelect, FieldTextarea } from "@/components/ui/FormField";
import { Button } from "@/components/ui/Button";
import { validateEmail, validatePhone, validateRequired, hasErrors } from "@/lib/validation";

export function B2BForm() {
  const [values, setValues] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    eventType: b2bContent.eventTypes[0] as string,
    date: "",
    guests: "",
    requirements: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);

  function submit(event: React.FormEvent) {
    event.preventDefault();
    const next = {
      name: validateRequired(values.name, "Contact name"),
      company: validateRequired(values.company, "Company name"),
      email: validateEmail(values.email),
      phone: validatePhone(values.phone),
      date: validateRequired(values.date, "Event date"),
      requirements: validateRequired(values.requirements, "Requirements"),
    };
    setErrors(next);
    if (hasErrors(next)) return;
    setDone(true);
  }

  if (done) {
    return (
      <div className="py-8">
        <h2 className="font-serif text-3xl text-navy">Inquiry received</h2>
        <p className="mt-4 text-sm leading-relaxed text-ink-soft">
          Thank you. The atelier will review the brief and reply with a next step.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <FormField label="Contact name" htmlFor="b2b-name" required error={errors.name}>
          <FieldInput
            id="b2b-name"
            variant="studio"
            value={values.name}
            error={errors.name}
            onChange={(e) => setValues({ ...values, name: e.target.value })}
          />
        </FormField>
        <FormField label="Company" htmlFor="b2b-company" required error={errors.company}>
          <FieldInput
            id="b2b-company"
            variant="studio"
            value={values.company}
            error={errors.company}
            onChange={(e) => setValues({ ...values, company: e.target.value })}
          />
        </FormField>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <FormField label="Email" htmlFor="b2b-email" required error={errors.email}>
          <FieldInput
            id="b2b-email"
            type="email"
            variant="studio"
            value={values.email}
            error={errors.email}
            onChange={(e) => setValues({ ...values, email: e.target.value })}
          />
        </FormField>
        <FormField label="Phone" htmlFor="b2b-phone" required error={errors.phone}>
          <FieldInput
            id="b2b-phone"
            variant="studio"
            value={values.phone}
            error={errors.phone}
            onChange={(e) => setValues({ ...values, phone: e.target.value })}
          />
        </FormField>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <FormField label="Event type" htmlFor="b2b-type">
          <FieldSelect
            id="b2b-type"
            variant="studio"
            value={values.eventType}
            onChange={(e) => setValues({ ...values, eventType: e.target.value })}
          >
            {b2bContent.eventTypes.map((type) => (
              <option key={type}>{type}</option>
            ))}
          </FieldSelect>
        </FormField>
        <FormField label="Event date" htmlFor="b2b-date" required error={errors.date}>
          <FieldInput
            id="b2b-date"
            type="date"
            variant="studio"
            value={values.date}
            error={errors.date}
            onChange={(e) => setValues({ ...values, date: e.target.value })}
          />
        </FormField>
      </div>
      <FormField label="Guests" htmlFor="b2b-guests">
        <FieldInput
          id="b2b-guests"
          type="number"
          min={1}
          variant="studio"
          value={values.guests}
          onChange={(e) => setValues({ ...values, guests: e.target.value })}
        />
      </FormField>
      <FormField label="What you need" htmlFor="b2b-req" required error={errors.requirements}>
        <FieldTextarea
          id="b2b-req"
          variant="studio"
          value={values.requirements}
          error={errors.requirements}
          onChange={(e) => setValues({ ...values, requirements: e.target.value })}
        />
      </FormField>
      <Button type="submit" className="w-full sm:w-auto">Send inquiry</Button>
    </form>
  );
}
