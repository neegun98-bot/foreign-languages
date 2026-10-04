import { Award, GraduationCap, Globe, Users } from "lucide-react";
import { Reveal, Section, SectionTitle, StatCounter } from "@/components/ui/primitives";
import { expert } from "@/lib/data";

const facts = [
  { Icon: Award, title: `${expert.years} лет преподавания`, text: "Работала в языковых школах Москвы и Берлина, с 2019 года веду частную практику." },
  { Icon: GraduationCap, title: "Образование", text: "МГЛУ, лингвистика; стажировки в Гёте-институте (Берлин) и Alliance Française (Париж)." },
  { Icon: Globe, title: "Сертификаты", text: "CELTA, Goethe C2, DELF C1, HSK 5, DELE C1. Команда преподавателей-носителей по каждому языку." },
  { Icon: Users, title: "География учеников", text: "Россия, Европа, Азия и Ближний Восток. Занятия идут в вашем часовом поясе." },
];

export default function About() {
  return (
    <Section id="about">
      <SectionTitle title="Почему мне доверяют свой язык и своё будущее" />
      <div className="grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal scale={0.95}>
          <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-[2rem] bg-gradient-to-br from-brand via-bubble-purple to-bubble-teal shadow-[0_30px_60px_-20px_rgba(31,95,224,0.55)]">
            {/* Плейсхолдер: замените на реальное фото в /public/anna.webp */}
            <svg viewBox="0 0 400 500" className="absolute inset-0 size-full" role="img" aria-label="Фото преподавателя Анны Волковой (плейсхолдер)">
              <circle cx="200" cy="190" r="72" fill="#fff" opacity=".92" />
              <path d="M60 500c0-110 62-180 140-180s140 70 140 180z" fill="#fff" opacity=".92" />
              <circle cx="320" cy="90" r="40" fill="#f5b800" opacity=".9" />
              <circle cx="70" cy="120" r="26" fill="#d93a26" opacity=".85" />
            </svg>
            <span className="absolute bottom-4 left-4 rounded-full bg-white/90 px-4 py-1.5 text-sm font-bold text-ink">{expert.name}</span>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <p className="text-lg text-muted">
              Я помогаю взрослым и детям начать говорить на языке, который им нужен для работы, учёбы или жизни в другой
              стране. Моя задача — чтобы вы дошли до своей цели быстрее и без стресса. Более {expert.students} учеников за{" "}
              {expert.years} лет.
            </p>
          </Reveal>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {facts.map(({ Icon, title, text }, i) => (
              <Reveal key={title} delay={i * 0.08}>
                <div className="flex gap-4">
                  <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-sky-2 text-brand">
                    <Icon className="size-6" aria-hidden />
                  </span>
                  <div>
                    <h3 className="font-extrabold">{title}</h3>
                    <p className="mt-1 text-sm text-muted">{text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-10 grid grid-cols-3 gap-4 rounded-3xl bg-white p-6 shadow-[0_8px_30px_-12px_rgba(31,95,224,0.25)] ring-1 ring-sky-2">
            <StatCounter value={expert.students} suffix="+" label="учеников" />
            <StatCounter value={expert.years} label="лет опыта" />
            <StatCounter value={expert.successRate} suffix="%" label="достигают цели" />
          </div>
        </div>
      </div>
    </Section>
  );
}
