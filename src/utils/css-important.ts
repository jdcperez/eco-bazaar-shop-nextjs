// Small utility to merge class names.
import { twMerge } from 'tailwind-merge';
import { clsx } from 'clsx';
import type { ClassValue } from 'clsx';

export function merge(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}