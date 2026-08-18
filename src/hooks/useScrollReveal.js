import { useEffect, useRef } from 'react';
import { useReducedMotion } from './useReducedMotion';

export function useScrollReveal(options = {}) {
  const elementRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    if (prefersReducedMotion) {
      el.classList.add('is-revealed');
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-revealed');
          observer.unobserve(el);
        }
      },
      {
        threshold: options.threshold || 0.15,
        rootMargin: options.rootMargin || '0px 0px -40px 0px'
      }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [prefersReducedMotion, options.threshold, options.rootMargin]);

  return elementRef;
}
