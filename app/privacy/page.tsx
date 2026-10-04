import Link from "next/link";
import { expert } from "@/lib/data";

export const metadata = { title: "Политика обработки персональных данных" };

export default function Privacy() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-20">
      <Link href="/" className="font-bold text-brand">← На главную</Link>
      <h1 className="mt-6 text-3xl font-extrabold">Политика обработки персональных данных</h1>
      <p className="mt-2 text-sm text-muted">Версия от {expert.policyVersion}. Черновик-шаблон: перед запуском проверьте у юриста.</p>
      <div className="mt-6 space-y-4 leading-relaxed">
        <p>Оператор: {expert.name}. Контакт: {expert.email}.</p>
        <p>Мы собираем имя, телефон или Telegram, email (по желанию), выбранный язык, уровень, цель обучения и удобное время связи — только для связи с вами и организации пробного урока.</p>
        <p>Вместе с заявкой сохраняются дата, IP-адрес и версия политики как подтверждение вашего согласия.</p>
        <p>Данные не передаются третьим лицам, кроме сервисов отправки почты. Вы можете отозвать согласие, написав на {expert.email}.</p>
      </div>
    </main>
  );
}
