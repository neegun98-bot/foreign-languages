"use client";

import { motion, useInView, useReducedMotion, animate } from "framer-motion";
import { useEffect, useRef, useState, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/* ---------- Button ---------- */
type Variant = "primary" | "secondary" | "ghost" | "accent";
const variants: Record<Variant, string> = {
  primary: "bg-brand text-white hover:bg-brand-dark shadow-[0_10px_28px_-8px_rgba(31,95,224,0.6)]",
  secondary: "bg-white text-brand ring-2 ring-brand/20 hover:ring-brand/60",
  ghost: "text-ink hover:bg-sky-2/60",
  accent: "bg-bubble-yellow text-ink hover:brightness-95 shadow-[0_10px_28px_-8px_rgba(245,184,0,0.7)]",
};

type BtnProps = {
  variant?: Variant;
  href?: string;
  className?: string;
  children: ReactNode;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className">;

export function Button({ variant = "primary", href, className, children, ...rest }: BtnProps) {
  const cls = cn(
    "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-7 py-3 text-base font-bold transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60 disabled:hover:translate-y-0",
    variants[variant],
    className,
  );
  if (href) {
    return (
      <a href={href} className={cls} onClick={() => track("cta_click", href)}>
        {children}
      </a>
    );
  }
  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  );
}

/* ---------- Metrika goals ---------- */
export function track(goal: string, label?: string) {
  try {
    const w = window as unknown as { ym?: (id: number, a: string, g: string, p?: object) => void };
    const id = Number(process.env.NEXT_PUBLIC_YM_ID);
    if (w.ym && id) w.ym(id, "reachGoal", goal, label ? { label } : undefined);
  } catch {}
}

/* ---------- Section ---------- */
export function Section({
  id,
  children,
  className,
  dark,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  dark?: boolean;
}) {
  return (
    <section
      id={id}
      className={cn("relative px-4 py-20 sm:px-6 md:py-28", dark && "bg-navy text-white", className)}
    >
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  );
}

export function SectionTitle({
  title,
  sub,
  dark,
  center = true,
}: {
  title: string;
  sub?: string;
  dark?: boolean;
  center?: boolean;
}) {
  return (
    <Reveal className={cn("mb-12 max-w-3xl md:mb-16", center && "mx-auto text-center")}>
      <h2 className="text-3xl font-extrabold leading-tight sm:text-4xl md:text-5xl">{title}</h2>
      {sub && <p className={cn("mt-4 text-lg", dark ? "text-sky-2" : "text-muted")}>{sub}</p>}
    </Reveal>
  );
}

/* ---------- Card ---------- */
export function Card({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div
      className={cn(
        "rounded-3xl bg-white p-6 shadow-[0_8px_30px_-12px_rgba(31,95,224,0.25)] ring-1 ring-sky-2/80 sm:p-8",
        className,
      )}
    >
      {children}
    </div>
  );
}

/* ---------- Reveal ---------- */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
  scale,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  scale?: number;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, scale: scale ?? 1 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ---------- StatCounter ---------- */
export function StatCounter({ value, suffix = "", label }: { value: number; suffix?: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  const [n, setN] = useState(reduce ? value : 0);

  useEffect(() => {
    if (!inView || reduce) {
      if (reduce) setN(value);
      return;
    }
    const c = animate(0, value, { duration: 1.6, ease: "easeOut", onUpdate: (v) => setN(Math.round(v)) });
    return () => c.stop();
  }, [inView, value, reduce]);

  return (
    <div ref={ref} className="text-center">
      <div className="font-display text-4xl font-extrabold text-brand sm:text-5xl">
        {n}
        {suffix}
      </div>
      <div className="mt-1 text-sm font-semibold text-muted">{label}</div>
    </div>
  );
}
