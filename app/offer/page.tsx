import Link from "next/link";
export const metadata = { title: "Публичная оферта" };

export default function Offer() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-20">
      <Link href="/" className="font-bold text-brand">← На главную</Link>
      <h1 className="mt-6 text-3xl font-extrabold">Публичная оферта</h1>
      <p className="mt-4 text-muted">Шаблон-заглушка: добавьте текст оферты перед запуском.</p>
    </main>
  );
}
