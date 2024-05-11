import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export enum ErrorValues {
  UNHAUTHORIZED = "Unauthorized",
  INTERNAL_SERVER_ERROR = "Internal Server error",
}
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function errorMapping(errorMessage: string): number {
  switch (errorMessage) {
    case ErrorValues.UNHAUTHORIZED:
      return 401;
    case ErrorValues.INTERNAL_SERVER_ERROR:
      return 500;
    default:
      return 200;
  }
}
