import { useRef, useEffect, type ReactNode, type CSSProperties } from "react";

/**
 * Magnetic hover effect for desktop CTAs. The element gently follows the
 * cursor within a defined radius, then springs back when the cursor leaves.
 *
 * Disabled automatically on:
 *   - touch devices (hover: none)
 *   - users with prefers-reduced-motion
 *
 * Tiny: ~600 bytes of JS, no library. Hydrated via client:idle.
 */
interface Props {
  href: string;
  children: ReactNode;
  className?: string;
  strength?: number;
  style?: CSSProperties;
  target?: string;
  rel?: string;
  ariaLabel?: string;
}

export default function MagneticLink({
  href,
  children,
  className,
  strength = 0.25,
  style,
  target,
  rel,
  ariaLabel,
}: Props) {
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!canHover || reduced) return;

    let rafId = 0;
    let tx = 0,
      ty = 0;

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      tx = (e.clientX - cx) * strength;
      ty = (e.clientY - cy) * strength;
      if (!rafId) rafId = requestAnimationFrame(apply);
    };

    const onLeave = () => {
      tx = 0;
      ty = 0;
      if (!rafId) rafId = requestAnimationFrame(apply);
    };

    const apply = () => {
      el.style.transform = `translate3d(${tx.toFixed(2)}px, ${ty.toFixed(2)}px, 0)`;
      rafId = 0;
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(rafId);
    };
  }, [strength]);

  return (
    <a
      ref={ref}
      href={href}
      className={className}
      style={{
        transition: "transform 240ms cubic-bezier(0.25, 1, 0.5, 1)",
        willChange: "transform",
        ...style,
      }}
      target={target}
      rel={rel}
      aria-label={ariaLabel}
    >
      {children}
    </a>
  );
}
