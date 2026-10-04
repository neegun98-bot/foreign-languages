"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/primitives";
import { triggers } from "@/lib/data";
import { cn } from "@/lib/utils";

const bubbles = [
  { t: "A文", pos: "left-[30%] -top-[2%]", bg: "bg-bubble-blue text-white" },
  { t: "中文", pos: "right-[2%] top-[6%]", bg: "bg-bubble-purple text-white" },
  { t: "العربية", pos: "-right-[6%] top-[42%]", bg: "bg-bubble-green text-white" },
  { t: "日本語", pos: "right-[2%] bottom-[8%]", bg: "bg-bubble-blue text-white" },
  { t: "Deutsch", pos: "left-[34%] -bottom-[6%]", bg: "bg-bubble-yellow text-ink" },
  { t: "Español", pos: "left-[0%] bottom-[8%]", bg: "bg-bubble-red text-white" },
  { t: "Français", pos: "-left-[8%] top-[40%]", bg: "bg-bubble-teal text-white" },
  { t: "हिंदी", pos: "left-[2%] top-[6%]", bg: "bg-bubble-orange text-white" },
];

const container = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } };
const item = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

export default function Hero() {
  const reduce = useReducedMotion();
  return (
    <section id="top" className="relative overflow-hidden px-4 pb-20 pt-32 sm:px-6 md:pb-28 md:pt-40">
      <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[1.1fr_1fr]">
        <motion.div variants={container} initial={reduce ? "show" : "hidden"} animate="show">
          <motion.p variants={item} className="mb-5 inline-block rounded-full bg-white px-4 py-1.5 text-sm font-bold text-brand shadow-sm ring-1 ring-sky-2">
            8 языков · живые уроки онлайн
          </motion.p>
          <motion.h1 variants={item} className="text-4xl font-extrabold leading-[1.08] sm:text-5xl lg:text-6xl">
            Заговорите на новом языке <span className="text-brand">за 3 месяца</span> — без зубрёжки и страха ошибок
          </motion.h1>
          <motion.p variants={item} className="mt-6 max-w-xl text-lg text-muted">
            Английский, китайский, немецкий, французский, испанский, японский, арабский и хинди — с экспертом, чьи ученики
            уже сдали IELTS на 7.5+, HSK 4 и Goethe B2.
          </motion.p>
          <motion.div variants={item} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="#apply">Записаться на бесплатный пробный урок</Button>
            <Button href="#method" variant="secondary">Узнать методику</Button>
          </motion.div>
          <motion.ul variants={item} className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm font-bold text-ink/80">
            {triggers.map((t) => (
              <li key={t} className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-bubble-green" aria-hidden /> {t}
              </li>
            ))}
          </motion.ul>
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="relative mx-auto aspect-square w-[78%] max-w-[460px] lg:w-full"
        >
          <div className="absolute inset-[-6%] rounded-full bg-brand/15 blur-3xl" aria-hidden />
          <Image src="/globe.webp" alt="Глобус, окружённый языками мира" width={380} height={380} priority className="relative size-full rounded-full object-cover" />
          {bubbles.map((b, i) => (
            <span
              key={b.t}
              aria-hidden
              style={{ animationDelay: `${i * 0.5}s` }}
              className={cn(
                "float absolute rounded-2xl px-3 py-1.5 text-sm font-extrabold shadow-lg sm:px-4 sm:py-2 sm:text-lg",
                b.pos,
                b.bg,
              )}
            >
              {b.t}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
