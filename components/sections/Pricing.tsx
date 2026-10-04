import { Check } from "lucide-react";
import LeadForm from "@/components/LeadForm";
import { Button, Card, Reveal, Section, SectionTitle } from "@/components/ui/primitives";
import { plans } from "@/lib/data";
import { cn } from "@/lib/utils";

export default function Pricing() {
  return (
    <Section id="pricing">
      <SectionTitle title="Форматы занятий и цены" sub="Онлайн, индивидуально. Группы по запросу." />
      <div className="grid gap-6 md:grid-cols-3">
        {plans.map((p, i) => (
          <Reveal key={p.id} delay={i * 0.1}>
            <div
              className={cn(
                "flex h-full flex-col rounded-3xl p-8 ring-1 transition-all duration-300 hover:-translate-y-2",
                p.featured
                  ? "bg-brand text-white shadow-[0_30px_60px_-20px_rgba(31,95,224,0.7)] ring-brand"
                  : "bg-white text-ink shadow-[0_8px_30px_-12px_rgba(31,95,224,0.25)] ring-sky-2 hover:shadow-[0_24px_50px_-18px_rgba(31,95,224,0.45)]",
              )}
            >
              <h3 className="text-xl font-extrabold">{p.name}</h3>
              <div className="mt-4 font-display text-4xl font-extrabold">{p.price}</div>
              <div className={cn("text-sm", p.featured ? "text-sky-2" : "text-muted")}>{p.note}</div>
              <ul className="mt-6 flex-1 space-y-3">
                {p.items.map((it) => (
                  <li key={it} className="flex gap-3">
                    <Check className={cn("mt-0.5 size-5 shrink-0", p.featured ? "text-bubble-yellow" : "text-bubble-green")} aria-hidden />
                    {it}
                  </li>
                ))}
              </ul>
              <Button href="#apply" variant={p.featured ? "accent" : "secondary"} className="mt-8 w-full">
                {p.id === "trial" ? "Записаться" : "Обсудить"}
              </Button>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-16" y={40}>
        <div id="apply">
          <Card className="mx-auto max-w-3xl">
            <h3 className="mb-6 text-2xl font-extrabold">Запишитесь на пробный урок</h3>
            <LeadForm variant="full" />
          </Card>
        </div>
      </Reveal>
    </Section>
  );
}
