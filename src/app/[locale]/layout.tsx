import "../../styles/globals.scss";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import NProgressProvider from "@/components/NProgressProvider";
import ClientLayoutShell from "@/app/[locale]/ClientLayoutShell";

export const metadata = {
  title: "Globens",
  icons: {
    icon: "/faviconKb.png",
  },
  themeColor: "#181A20",
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  // Validate locale
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Get messages for the current locale
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <NProgressProvider />
        <NextIntlClientProvider messages={messages} locale={locale}>
          <ClientLayoutShell>{children}</ClientLayoutShell>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
