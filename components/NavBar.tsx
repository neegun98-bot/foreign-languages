"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Globe2, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/primitives";
import { cn } from "@/lib/utils";

const links = [
  { href: "#languages", label: "Языки" },
  { href: "#about", label: "Обо мне" },
  { href: "#method", label: "Методика" },
  { href: "#pricing", label: "Услуги" },
  { href: "#reviews", label: "Отзывы" },
  { href: "#contacts", label: "Контакты" },
];

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 12);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "bg-white/70 shadow-[0_4px_30px_-10px_rgba(31,95,224,0.25)] backdrop-blur-xl" : "bg-transparent",
      )}
    >
      <nav className="mx-auto flex h-[72px] max-w-6xl items-center justify-between px-4 sm:px-6" aria-label="Основная навигация">
        <a href="#top" className="flex items-center gap-2 font-display text-xl font-extrabold text-brand">
          <Globe2 className="size-7" aria-hidden /> Lingua Globe
        </a>
        <ul className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="rounded-full px-4 py-2 text-[15px] font-bold text-ink/80 transition hover:bg-sky-2/70 hover:text-brand">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <div className="hidden md:block">
            <Button href="#apply" className="!min-h-11 !px-5 !py-2 text-sm">
              Записаться на пробный урок
            </Button>
          </div>
          <button
            className="grid size-11 place-items-center rounded-full bg-white/80 text-ink ring-1 ring-sky-2 lg:hidden"
            aria-label={open ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="mx-4 mb-3 rounded-3xl bg-white/95 p-4 shadow-xl ring-1 ring-sky-2 backdrop-blur-xl lg:hidden"
          >
            <ul className="flex flex-col">
              {links.map((l) => (
                <li key={l.href}>
                  <a href={l.href} onClick={() => setOpen(false)} className="block rounded-2xl px-4 py-3.5 text-lg font-bold hover:bg-sky">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
            <Button href="#apply" className="mt-3 w-full" onClick={() => setOpen(false)}>
              Записаться на пробный урок
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
