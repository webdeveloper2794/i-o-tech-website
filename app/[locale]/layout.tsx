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
      <body className="antialiased text-foreground relative">
        {/* Background Image with Brown Overlay */}

        <NextIntlClientProvider messages={messages}>
          <div className="relative z-10 min-h-screen flex flex-col">
            <Navigation locale={locale} />
            <main className="w-full grow  mx-auto">{children}</main>
            <Footer />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
