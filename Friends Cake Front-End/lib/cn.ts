import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export const siteWrap = "mx-auto w-full max-w-[92rem] px-4 sm:px-8 lg:px-12";

export const pageWrap =
  "mx-auto w-full max-w-[92rem] px-4 pb-20 pt-[calc(9.5rem+env(safe-area-inset-top))] sm:px-8 lg:px-12 lg:pb-36 lg:pt-44";
