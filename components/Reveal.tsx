"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Reveal
 * Revelacao discreta por "foco": o conteudo entra de desfocado para nitido
 * ao aparecer na tela. Respeita prefers-reduced-motion.
 *
 * Uso: <Reveal><Secao/></Reveal>  |  <Reveal delay={120}>...</Reveal>
 */
export default function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setShow(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setShow(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        filter: show ? "blur(0px)" : "blur(14px)",
        opacity: show ? 1 : 0,
        transform: show ? "none" : "translateY(12px)",
        transition: `filter .9s ease ${delay}ms, opacity .9s ease ${delay}ms, transform .9s ease ${delay}ms`,
        willChange: "filter, opacity, transform",
      }}
    >
      {children}
    </div>
  );
}
