import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Creates a debounced version of the provided function.
 * @param func - The function to be debounced.
 * @param waitFor - The number of milliseconds to wait before invoking the debounced function.
 *
 * Source: https://gist.github.com/ca0v/73a31f57b397606c9813472f7493a940
 *         https://www.youtube.com/watch?v=cjIswDCKgu0&t=569s
 */

export function debounce<F extends (...args: any[]) => any>(
  func: F,
  waitFor: number
): (this: ThisParameterType<F>, ...args: Parameters<F>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return function (this: ThisParameterType<F>, ...args: Parameters<F>): void {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => func.apply(this, args), waitFor);
  };
}

export function formatTitle(inputString: string): string {
  // Split the string by underscore, then capitalize each part and join with a space
  return inputString
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(" ");
}
