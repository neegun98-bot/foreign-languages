import LeadForm from "@/components/LeadForm";
import { Reveal, Section } from "@/components/ui/primitives";

const items = ["Отвечаю в течение 2 часов", "Работаю онлайн из любой точки мира", "Первое занятие — бесплатно"];

export default function FinalCta() {
  return (
    <Section dark className="bg-gradient-to-b from-navy to-[#0a1a3c]">
      <Reveal className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-extrabold leading-tight sm:text-4xl md:text-5xl">Начните говорить на новом языке уже через месяц</h2>
        <p className="mt-4 text-lg text-sky-2">Первый урок — бесплатно. Без предоплаты. Без обязательств.</p>
      </Reveal>
      <Reveal className="mx-auto mt-10 max-w-2xl rounded-3xl bg-white/5 p-6 ring-1 ring-white/15 sm:p-8" delay={0.1}>
        <LeadForm variant="short" dark />
      </Reveal>
      <ul className="mx-auto mt-10 flex max-w-3xl flex-wrap justify-center gap-x-8 gap-y-3 text-sm font-bold text-sky-2">
        {items.map((t) => (
          <li key={t} className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-bubble-yellow" aria-hidden /> {t}
          </li>
        ))}
      </ul>
    </Section>
  );
}
