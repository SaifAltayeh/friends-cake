export type FulfillmentMethod = "delivery" | "pickup";
export type PaymentMethod = "cod" | "online";

export type CheckoutFormValues = {
  fullName: string;
  email: string;
  phone: string;
  fulfillment: FulfillmentMethod;
  address: string;
  city: string;
  requestedDate: string;
  requestedTime: string;
  notes: string;
  payment: PaymentMethod;
};

export type CheckoutErrors = Partial<Record<keyof CheckoutFormValues, string>>;

export type DemoOrder = {
  reference: string;
  createdAt: string;
  customer: CheckoutFormValues;
  itemCount: number;
  subtotal: number;
  estimatedTotal: number;
};
