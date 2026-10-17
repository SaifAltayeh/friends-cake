import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export const siteWrap = "mx-auto w-full max-w-[92rem] px-4 sm:px-8 lg:px-12";
