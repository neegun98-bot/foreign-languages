"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useEffect, useState } from "react";
import { Section, SectionTitle } from "@/components/ui/primitives";
import { reviews } from "@/lib/data";
import { cn } from "@/lib/utils";

function ReviewCard({ r }: { r: (typeof reviews)[number] }) {
  return (
    <article className="flex h-full flex-col rounded-3xl bg-white p-6 shadow-[0_8px_30px_-12px_rgba(31,95,224,0.25)] ring-1 ring-sky-2">
      <div className="flex items-center gap-3">
        <span className={cn("grid size-12 place-items-center rounded-full text-lg font-extrabold", r.bg, r.fg)} aria-hidden>
          {r.name[0]}
        </span>
        <div>
          <h3 className="font-extrabold leading-tight">{r.name}</h3>
          <p className="text-sm text-muted">{r.city}</p>
        </div>
      </div>
      <p className="mt-4 inline-block self-start rounded-full bg-sky px-3 py-1 text-xs font-bold text-brand">{r.lang}</p>
      <Quote className="mt-4 size-6 text-bubble-yellow" aria-hidden />
      <p className="mt-2 flex-1 text-[15px] leading-relaxed">{r.text}</p>
      <p className="mt-4 border-t border-sky-2 pt-4 text-sm font-bold text-bubble-green">{r.result}</p>
    </article>
  );
}

export default function Reviews() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = reviews.length;

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setI((v) => (v + 1) % n), 6000);
    return () => clearInterval(t);
  }, [paused, n]);

  return (
    <Section id="reviews" className="bg-white/60">
      <SectionTitle title="Что говорят ученики" />

      {/* desktop grid */}
      <div className="hidden gap-6 md:grid md:grid-cols-2 lg:grid-cols-3">
        {reviews.map((r) => (
          <ReviewCard key={r.name} r={r} />
        ))}
      </div>

      {/* mobile carousel */}
      <div className="md:hidden" onFocus={() => setPaused(true)} onTouchStart={() => setPaused(true)}>
        <div className="relative" role="region" aria-roledescription="карусель" aria-label="Отзывы">
          <AnimatePresence mode="wait">
            <motion.div key={i} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.35 }}>
              <ReviewCard r={reviews[i]} />
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="mt-6 flex items-center justify-center gap-4">
          <button className="grid size-11 place-items-center rounded-full bg-white ring-1 ring-sky-2" aria-label="Предыдущий отзыв" onClick={() => setI((i - 1 + n) % n)}>
            <ChevronLeft />
          </button>
          <div className="flex gap-2">
            {reviews.map((r, k) => (
              <button key={r.name} aria-label={`Отзыв ${k + 1}`} aria-current={k === i} onClick={() => setI(k)} className={cn("h-2.5 rounded-full transition-all", k === i ? "w-8 bg-brand" : "w-2.5 bg-sky-2")} />
            ))}
          </div>
          <button className="grid size-11 place-items-center rounded-full bg-white ring-1 ring-sky-2" aria-label="Следующий отзыв" onClick={() => setI((i + 1) % n)}>
            <ChevronRight />
          </button>
        </div>
      </div>
    </Section>
  );
}
