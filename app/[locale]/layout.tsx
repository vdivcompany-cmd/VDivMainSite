import { SITE_URL } from '@/lib/constants';
import '@/app/globals.css';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { routing } from '@/i18n/routing';
import { ThemeProvider } from 'next-themes';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SmoothScroll } from '@/components/layout/SmoothScroll';
import { Hanken_Grotesk, Inter, JetBrains_Mono } from 'next/font/google';

const hanken = Hanken_Grotesk({ subsets: ['latin'], variable: '--font-hanken-grotesk', display: 'swap' });
const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const jetbrains = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains-mono', display: 'swap' });

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      template: '%s | vDiv',
      default: 'vDiv',
    },
    openGraph: {
      siteName: 'vDiv',
      type: 'website',
      locale: locale === 'ar' ? 'ar_SA' : 'en_US',
      url: SITE_URL,
      title: 'vDiv - Elite Software & AI Automation',
      description: 'V DIV combines elite software engineering, autonomous AI workflows, and precision data-driven growth architecture.',
      images: [
        {
          url: `${SITE_URL}/Logo-home.png`,
          width: 1200,
          height: 630,
          alt: 'V DIV - Elite Software & AI Automation',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
    }
  };
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Enable static rendering
  setRequestLocale(locale);

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <body className={`${hanken.variable} ${inter.variable} ${jetbrains.variable} bg-background text-on-background font-body-md selection:bg-primary/30 selection:text-on-primary overflow-x-hidden antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
            <SmoothScroll>
              <Navbar />
              <main className="relative z-10 pt-16 min-h-screen flex flex-col">
                {children}
              </main>
              <Footer />
            </SmoothScroll>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
