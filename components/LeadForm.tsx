"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, track } from "@/components/ui/primitives";
import { languages, levels, times } from "@/lib/data";
import { leadSchema, type LeadValues } from "@/lib/schema";
import { cn } from "@/lib/utils";

export const PICK_EVENT = "pick-language";

export function pickLanguage(name: string) {
  window.dispatchEvent(new CustomEvent(PICK_EVENT, { detail: name }));
  document.getElementById("apply")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function LeadForm({ variant = "full", dark = false }: { variant?: "full" | "short"; dark?: boolean }) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<LeadValues>({
    resolver: zodResolver(leadSchema),
    defaultValues: { name: "", contact: "", email: "", level: "", goal: "", time: "", website: "" },
  });
  const [done, setDone] = useState(false);
  const [serverError, setServerError] = useState("");
  const full = variant === "full";

  useEffect(() => {
    const h = (e: Event) => setValue("language", (e as CustomEvent<string>).detail, { shouldValidate: true });
    window.addEventListener(PICK_EVENT, h);
    return () => window.removeEventListener(PICK_EVENT, h);
  }, [setValue]);

  async function onSubmit(values: LeadValues) {
    setServerError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, source: variant }),
      });
      if (!res.ok) throw new Error();
      track("form_submit", variant);
      setDone(true);
    } catch {
      setServerError("Не удалось отправить заявку. Напишите мне в Telegram — отвечу быстрее.");
    }
  }

  const field = cn(
    "w-full min-h-12 rounded-2xl border px-4 py-3 text-base outline-none transition focus:ring-4",
    dark
      ? "border-white/20 bg-white/10 text-white placeholder:text-white/60 focus:border-bubble-yellow focus:ring-bubble-yellow/30"
      : "border-sky-2 bg-white text-ink placeholder:text-muted focus:border-brand focus:ring-brand/20",
  );
  const label = cn("mb-1.5 block text-sm font-bold", dark ? "text-white" : "text-ink");
  const err = (m?: string, id?: string) =>
    m ? (
      <p id={id} role="alert" className={cn("mt-1 text-sm font-semibold", dark ? "text-yellow-200" : "text-bubble-red")}>
        {m}
      </p>
    ) : null;

  return (
    <AnimatePresence mode="wait">
      {done ? (
        <motion.div
          key="ok"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          role="status"
          className="flex flex-col items-center gap-4 py-12 text-center"
        >
          <CheckCircle2 className={cn("size-16", dark ? "text-bubble-yellow" : "text-bubble-green")} aria-hidden />
          <h3 className="text-2xl font-extrabold">Спасибо!</h3>
          <p className={dark ? "text-sky-2" : "text-muted"}>
            Я свяжусь с вами в течение 2 часов в рабочее время.
          </p>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="grid gap-4 sm:grid-cols-2"
          aria-label="Заявка на пробный урок"
        >
          <div className="hidden" aria-hidden>
            <input tabIndex={-1} autoComplete="off" {...register("website")} />
          </div>

          <div>
            <label className={label} htmlFor={`${variant}-name`}>Имя *</label>
            <input id={`${variant}-name`} className={field} autoComplete="name" placeholder="Как к вам обращаться"
              aria-invalid={!!errors.name} aria-describedby={errors.name ? `${variant}-name-e` : undefined}
              {...register("name")} />
            {err(errors.name?.message, `${variant}-name-e`)}
          </div>
          <div>
            <label className={label} htmlFor={`${variant}-contact`}>Телефон / Telegram / WhatsApp *</label>
            <input id={`${variant}-contact`} className={field} autoComplete="tel" placeholder="+7 900 000-00-00 или @username"
              aria-invalid={!!errors.contact} aria-describedby={errors.contact ? `${variant}-contact-e` : undefined}
              {...register("contact")} />
            {err(errors.contact?.message, `${variant}-contact-e`)}
          </div>

          {full && (
            <div className="sm:col-span-2">
              <label className={label} htmlFor="full-email">Email (необязательно)</label>
              <input id="full-email" type="email" className={field} autoComplete="email" placeholder="name@mail.com" {...register("email")} />
              {err(errors.email?.message)}
            </div>
          )}

          <div className={full ? "" : "sm:col-span-2"}>
            <label className={label} htmlFor={`${variant}-lang`}>Какой язык интересует *</label>
            <select id={`${variant}-lang`} className={cn(field, dark && "[&>option]:text-ink")} defaultValue=""
              aria-invalid={!!errors.language} {...register("language")}>
              <option value="" disabled>Выберите язык</option>
              {languages.map((l) => (
                <option key={l.id} value={l.name}>{l.name} — {l.native}</option>
              ))}
            </select>
            {err(errors.language?.message)}
          </div>

          {full && (
            <>
              <div>
                <label className={label} htmlFor="full-level">Ваш уровень</label>
                <select id="full-level" className={field} {...register("level")}>
                  <option value="">Не знаю</option>
                  {levels.map((l) => <option key={l}>{l}</option>)}
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className={label} htmlFor="full-goal">Ваша цель</label>
                <textarea id="full-goal" rows={2} className={field} placeholder="Например: сдать IELTS на 7.0 к весне" {...register("goal")} />
                {err(errors.goal?.message)}
              </div>
              <div className="sm:col-span-2">
                <label className={label} htmlFor="full-time">Удобное время для связи</label>
                <select id="full-time" className={field} {...register("time")}>
                  <option value="">Не важно</option>
                  {times.map((t) => <option key={t}>{t}</option>)}
                </select>
              </div>
            </>
          )}

          <div className="sm:col-span-2">
            <label className={cn("flex cursor-pointer items-start gap-3 text-sm", dark ? "text-sky-2" : "text-muted")}>
              <input type="checkbox" className="mt-0.5 size-5 shrink-0 accent-brand" aria-invalid={!!errors.consent} {...register("consent")} />
              <span>
                Согласен(на) на{" "}
                <a href="/privacy" target="_blank" className="font-bold underline underline-offset-2">обработку персональных данных</a>
              </span>
            </label>
            {err(errors.consent?.message)}
          </div>

          {serverError && <p role="alert" className="sm:col-span-2 text-sm font-semibold text-bubble-red">{serverError}</p>}

          <div className="sm:col-span-2">
            <Button type="submit" variant={dark ? "accent" : "primary"} className="w-full sm:w-auto" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="size-5 animate-spin" aria-hidden />}
              {full ? "Записаться на пробный урок" : "Записаться на бесплатный урок"}
            </Button>
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
