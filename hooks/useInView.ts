'use client';

import { useEffect, useState } from 'react';

/**
 * Lightweight IntersectionObserver-based useInView hook.
 * Replaces framer-motion's useInView to reduce bundle size.
 *
 * @param ref - React ref to the element to observe
 * @param options - IntersectionObserver options + once/amount flags
 * @returns boolean indicating if the element is in view
 */
export function useInView(
  ref: React.RefObject<HTMLElement | null>,
  options: {
    once?: boolean;
    amount?: number | number[];
    rootMargin?: string;
    root?: Element | null;
  } = {}
): boolean {
  const { once = true, amount = 0, rootMargin, root } = options;
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observerOptions: IntersectionObserverInit = {
      threshold: amount,
      rootMargin,
      root,
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        if (once) observer.unobserve(element);
      } else if (!once) {
        setIsInView(false);
      }
    }, observerOptions);

    observer.observe(element);
    return () => observer.disconnect();
  }, [ref, once, amount, rootMargin, root]);

  return isInView;
}