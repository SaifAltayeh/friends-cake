import type { CheckoutFormValues, CheckoutErrors } from "@/types/checkout";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[+0-9()\s-]{7,20}$/;

export function validateEmail(value: string) {
  if (!value.trim()) return "Email is required.";
  if (!emailPattern.test(value.trim())) return "Enter a valid email address.";
  return "";
}

export function validateRequired(value: string, label: string) {
  return value.trim() ? "" : `${label} is required.`;
}

export function validatePhone(value: string, required = true) {
  if (!value.trim()) return required ? "Phone number is required." : "";
  if (!phonePattern.test(value.trim())) return "Enter a valid phone number.";
  return "";
}

export function validateCheckout(values: CheckoutFormValues): CheckoutErrors {
  const errors: CheckoutErrors = {};
  const fullName = validateRequired(values.fullName, "Full name");
  const email = validateEmail(values.email);
  const phone = validatePhone(values.phone);
  const city = validateRequired(values.city, "City / area");
  const date = validateRequired(values.requestedDate, "Requested date");

  if (fullName) errors.fullName = fullName;
  if (email) errors.email = email;
  if (phone) errors.phone = phone;
  if (city) errors.city = city;
  if (date) errors.requestedDate = date;

  if (values.fulfillment === "delivery") {
    const address = validateRequired(values.address, "Delivery address");
    if (address) errors.address = address;
  }

  return errors;
}

export function hasErrors(errors: Record<string, string | undefined>) {
  return Object.values(errors).some(Boolean);
}

export function validateCakeConfig(input: {
  customizable?: boolean;
  sizeId: string;
  flavorId: string;
  requestedDate?: string;
}) {
  const errors: Record<string, string> = {};
  if (!input.sizeId) errors.sizeId = "Choose a size.";
  if (!input.flavorId) errors.flavorId = "Choose a flavour.";
  if (input.customizable && !input.requestedDate) {
    errors.requestedDate = "Choose a requested date for a custom cake.";
  }
  return errors;
}
