import { useEffect } from 'react';

export function useScrollPulse<T extends HTMLElement>(
  ref: React.RefObject<T>,
  opts?: { pulseMs?: number; alwaysGlow?: boolean },
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (opts?.alwaysGlow) {
      el.classList.add('isScrolling');
      return;
    }

    let t: ReturnType<typeof setTimeout> | null = null;
    const onScroll = () => {
      if (prefersReduced) return;
      el.classList.add('isScrolling');
      if (t) clearTimeout(t);
      t = setTimeout(() => el.classList.remove('isScrolling'), opts?.pulseMs ?? 180);
    };

    el.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      el.removeEventListener('scroll', onScroll);
      if (t) clearTimeout(t);
    };
  }, [ref, opts?.pulseMs, opts?.alwaysGlow]);
}
