import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export enum ErrorValues {
  UNHAUTHORIZED = "Unauthorized",
}
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function errorMapping(errorMessage: string): number {
  switch (errorMessage) {
    case ErrorValues.UNHAUTHORIZED:
      return 401;
    default:
      return 200;
  }
}
