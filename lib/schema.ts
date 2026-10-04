import { z } from "zod";
import { languages, levels, times } from "./data";

const langNames = languages.map((l) => l.name) as [string, ...string[]];

export const leadSchema = z.object({
  name: z.string().trim().min(2, "Введите имя"),
  contact: z.string().trim().min(5, "Укажите телефон или Telegram"),
  email: z.union([z.literal(""), z.string().trim().email("Некорректный email")]).optional(),
  language: z.enum(langNames, { message: "Выберите язык" }),
  level: z.union([z.literal(""), z.enum(levels)]).optional(),
  goal: z.string().trim().max(300, "Не больше 300 символов").optional(),
  time: z.union([z.literal(""), z.enum(times)]).optional(),
  consent: z.literal(true, { message: "Нужно согласие на обработку данных" }),
  website: z.string().max(0).optional(), // honeypot
});

export type LeadValues = z.infer<typeof leadSchema>;
