import type { Metadata, Viewport } from "next";
import { Manrope, Nunito } from "next/font/google";
import Script from "next/script";
import SmoothScroll from "@/components/SmoothScroll";
import { expert } from "@/lib/data";
import "./globals.css";

const manrope = Manrope({ subsets: ["latin", "cyrillic"], variable: "--font-manrope", display: "swap" });
const nunito = Nunito({ subsets: ["latin", "cyrillic"], weight: ["700", "800", "900"], variable: "--font-nunito", display: "swap" });

const site = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const title = `Репетитор английского, китайского, немецкого, французского и других языков — ${expert.name}`;
const description =
  "Заговорите на новом языке за 3 месяца без зубрёжки. 8 языков, индивидуальные онлайн-уроки, первый урок бесплатно и без предоплаты.";

export const metadata: Metadata = {
  metadataBase: new URL(site),
  title,
  description,
  openGraph: { title, description, type: "website", locale: "ru_RU", images: ["/globe.webp"] },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = { themeColor: "#1f5fe0", width: "device-width", initialScale: 1 };

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Person", name: expert.name, jobTitle: "Преподаватель иностранных языков", url: site, knowsLanguage: ["ru", "en", "de", "fr", "es", "zh", "ja", "ar", "hi"] },
    { "@type": "Service", serviceType: "Индивидуальные онлайн-уроки иностранных языков", provider: { "@type": "Person", name: expert.name }, areaServed: "Worldwide", offers: { "@type": "Offer", price: "2200", priceCurrency: "RUB" } },
    { "@type": "Course", name: "Иностранные языки с нуля до результата", description, provider: { "@type": "Person", name: expert.name } },
  ],
};

const ym = process.env.NEXT_PUBLIC_YM_ID;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${manrope.variable} ${nunito.variable}`}>
      <body>
        <SmoothScroll />
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        {ym && (
          <Script id="ym" strategy="afterInteractive">{`(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})(window,document,"script","https://mc.yandex.ru/metrika/tag.js","ym");ym(${Number(ym)},"init",{clickmap:true,trackLinks:true,accurateTrackBounce:true,webvisor:false});`}</Script>
        )}
      </body>
    </html>
  );
}
