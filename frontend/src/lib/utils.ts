import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines Tailwind CSS class names with conditional logic.
 * 
 * @param inputs Class values or conditionally applied classes.
 * @returns Merged and optimized class names as a single string.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
