// Shared utility functions for Halo UI

export function cn(...args: any[]): string {
  return args.filter(Boolean).join(' ');
}
