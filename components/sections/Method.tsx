"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import { Reveal, Section, SectionTitle } from "@/components/ui/primitives";
import { steps, why } from "@/lib/data";

const colors = ["bg-bubble-blue", "bg-bubble-purple", "bg-bubble-teal", "bg-bubble-orange"];

export default function Method() {
  const reduce = useReducedMotion();
  return (
    <Section id="method" className="bg-white/60">
      <SectionTitle title="Методика, которая работает, даже если вы уже пробовали и бросили" sub="Никакой зубрёжки. Только то, что реально работает." />
      <ol className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((s, i) => (
          <motion.li
            key={s.n}
            initial={reduce ? false : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: i * 0.15 }}
            className="relative rounded-3xl bg-white p-6 shadow-[0_8px_30px_-12px_rgba(31,95,224,0.25)] ring-1 ring-sky-2"
          >
            <motion.span
              initial={reduce ? false : { scale: 0.6 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", delay: i * 0.15 + 0.2 }}
              className={`mb-4 grid size-14 place-items-center rounded-2xl font-display text-2xl font-extrabold text-white ${colors[i]}`}
            >
              {s.n}
            </motion.span>
            <h3 className="text-xl font-extrabold">{s.title}</h3>
            <p className="mt-2 text-muted">{s.text}</p>
            <p className="mt-4 border-l-4 border-bubble-yellow pl-3 text-sm font-semibold italic">{s.quote}</p>
          </motion.li>
        ))}
      </ol>

      <Reveal className="mx-auto mt-14 max-w-3xl rounded-3xl bg-navy p-8 text-white sm:p-10">
        <h3 className="text-2xl font-extrabold">Почему это работает</h3>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
          {why.map((w) => (
            <li key={w} className="flex gap-3">
              <Check className="mt-0.5 size-5 shrink-0 text-bubble-yellow" aria-hidden /> {w}
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  );
}
