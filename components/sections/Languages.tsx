"use client";

import { ArrowRight } from "lucide-react";
import { pickLanguage } from "@/components/LeadForm";
import { Reveal, Section, SectionTitle } from "@/components/ui/primitives";
import { languages } from "@/lib/data";
import { cn } from "@/lib/utils";

export default function Languages() {
  return (
    <Section id="languages">
      <SectionTitle title="Выберите язык, который изменит вашу жизнь" sub="Восемь направлений. На каждом — преподаватель-носитель или сертифицированный методист." />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {languages.map((l, i) => (
          <Reveal key={l.id} delay={(i % 4) * 0.08}>
            <button
              onClick={() => pickLanguage(l.name)}
              className="group flex h-full w-full flex-col rounded-3xl bg-white p-6 text-left ring-1 ring-sky-2 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_24px_50px_-18px_rgba(31,95,224,0.45)] focus-visible:-translate-y-2"
              aria-label={`${l.name}: записаться на пробный урок`}
            >
              <span className={cn("relative mb-5 inline-flex items-center gap-2 self-start rounded-2xl px-4 py-2 text-xl font-extrabold", l.bg, l.fg)}>
                {l.native}
              </span>
              <h3 className="text-xl font-extrabold">{l.name}</h3>
              <p className="mt-2 text-sm text-muted">{l.goal}</p>
              <p className="mt-3 text-sm font-bold text-ink">{l.gives}</p>
              <span className="mt-auto flex items-center gap-1 pt-5 text-sm font-bold text-brand">
                Пробный урок <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden />
              </span>
            </button>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
