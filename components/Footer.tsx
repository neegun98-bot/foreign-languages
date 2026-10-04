"use client";

import { Globe2, Mail, Phone, Send } from "lucide-react";
import { expert } from "@/lib/data";
import { track } from "@/components/ui/primitives";

export default function Footer() {
  const a = "inline-flex items-center gap-2 py-1 font-semibold hover:text-bubble-yellow";
  return (
    <footer id="contacts" className="bg-[#07142f] px-4 py-14 text-sky-2 sm:px-6">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2 font-display text-2xl font-extrabold text-white">
            <Globe2 className="size-7" aria-hidden /> {expert.brand}
          </div>
          <p className="mt-3 text-white">{expert.name}</p>
          <p className="mt-1 text-sm">Языки без зубрёжки: английский, китайский, арабский, японский, немецкий, испанский, французский, хинди.</p>
        </div>
        <div>
          <h3 className="mb-3 text-lg font-bold text-white">Контакты</h3>
          <ul>
            <li><a className={a} href={expert.telegram} onClick={() => track("contact_click")}><Send className="size-4" aria-hidden /> Telegram</a></li>
            <li><a className={a} href={expert.whatsapp} onClick={() => track("contact_click")}><Phone className="size-4" aria-hidden /> WhatsApp</a></li>
            <li><a className={a} href={`mailto:${expert.email}`}><Mail className="size-4" aria-hidden /> {expert.email}</a></li>
            <li><a className={a} href={expert.phoneHref} onClick={() => track("contact_click")}><Phone className="size-4" aria-hidden /> {expert.phone}</a></li>
          </ul>
        </div>
        <div>
          <h3 className="mb-3 text-lg font-bold text-white">Документы</h3>
          <ul>
            <li><a className={a} href="/privacy">Политика обработки персональных данных</a></li>
            <li><a className={a} href="/offer">Публичная оферта</a></li>
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-10 flex max-w-6xl flex-wrap items-center justify-between gap-3 border-t border-white/15 pt-6 text-sm">
        <span>© {new Date().getFullYear()} {expert.brand}, {expert.name}</span>
        <span aria-label="Язык интерфейса"><b className="text-white">RU</b> · EN скоро</span>
      </div>
    </footer>
  );
}

