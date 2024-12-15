import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCode(code: string): string {
  // Preserve empty lines but trim whitespace from non-empty lines
  return code.split('\n').map(line => {
    return line.trim() === '' ? '' : line;
  }).join('\n');
}

export function getIndentation(line: string): number {
  const match = line.match(/^(\s*)/);
  return match ? match[1].length : 0;
}