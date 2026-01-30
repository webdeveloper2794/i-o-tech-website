// src/app/[locale]/layout.tsx
import { NextIntlClientProvider, hasLocale } from "next-intl";
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { getDirection } from "@/lib/utils";
import "../globals.css";
import { Navigation } from "@/components/layout/header/navigation";
import { Footer } from "@/components/layout/footer/footer";
import Image from "next/image";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);
  const messages = await getMessages();
  const direction = getDirection(locale);

  return (
    <html lang={locale} dir={direction} suppressHydrationWarning>
      <body className="antialiased text-foreground min-h-screen">
        <NextIntlClientProvider messages={messages}>
          <div className="relative min-h-screen flex flex-col">
            <Navigation locale={locale} />

            <main className="flex-1">
              <div className="relative z-10 h-screen">
                <Image
                  src="/background.jpg"
                  alt="Background"
                  fill
                  priority
                  className="object-cover"
                  quality={75}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(271.47deg, rgba(75,38,21,.5) 1.2%, rgba(75,38,21,.7) 86.38%)",
                  }}
                />
              </div>
              {children}
            </main>

            <Footer />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
