import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { expert } from "@/lib/data";
import { leadSchema } from "@/lib/schema";

export const runtime = "nodejs";

const hits = new Map<string, number[]>();

function limited(ip: string) {
  const now = Date.now();
  const arr = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  arr.push(now);
  hits.set(ip, arr);
  return arr.length > 5;
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (limited(ip)) return NextResponse.json({ error: "rate_limit" }, { status: 429 });

  const body = await req.json().catch(() => null);
  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "validation", issues: parsed.error.issues }, { status: 400 });

  const d = parsed.data;
  if (d.website) return NextResponse.json({ ok: true }); // honeypot: тихо игнорируем ботов

  const record = {
    at: new Date().toISOString(),
    ip,
    policyVersion: expert.policyVersion,
    ...d,
    website: undefined,
  };

  // Журнал заявок и согласий (152-ФЗ). На Vercel ФС read-only — замените на БД.
  try {
    const dir = path.join(process.cwd(), "data");
    await mkdir(dir, { recursive: true });
    await appendFile(path.join(dir, "leads.jsonl"), JSON.stringify(record) + "\n");
  } catch (e) {
    console.error("lead log failed", e);
  }

  const key = process.env.RESEND_API_KEY;
  const to = process.env.LEADS_TO_EMAIL;
  if (key && to) {
    const text = [
      `Имя: ${d.name}`,
      `Контакт: ${d.contact}`,
      d.email && `Email: ${d.email}`,
      `Язык: ${d.language}`,
      d.level && `Уровень: ${d.level}`,
      d.goal && `Цель: ${d.goal}`,
      d.time && `Время: ${d.time}`,
    ].filter(Boolean).join("\n");
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from: process.env.LEADS_FROM_EMAIL ?? "onboarding@resend.dev", to, subject: `Новая заявка: ${d.language}`, text }),
    });
    if (!r.ok) {
      console.error("resend failed", await r.text());
      return NextResponse.json({ error: "mail" }, { status: 502 });
    }
  } else {
    console.log("[lead]", record);
  }

  return NextResponse.json({ ok: true });
}
