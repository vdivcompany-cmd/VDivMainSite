import { SITE_URL } from '@/lib/constants';
import dynamic from 'next/dynamic';
import { ContactHeader } from "@/components/sections/contact/ContactHeader";
import { ContactForm } from "@/components/sections/contact/ContactForm";
import { ContactSidebar } from "@/components/sections/contact/ContactSidebar";
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Metadata } from 'next';

const ContactBackground = dynamic(
  () => import('@/components/sections/contact/ContactBackground').then((mod) => mod.ContactBackground)
);

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: t('Contact.title'),
    description: t('Contact.description'),
    alternates: {
      canonical: `${SITE_URL}/${locale}/contact`,
      languages: {
        'en': `${SITE_URL}/en/contact`,
        'ar': `${SITE_URL}/ar/contact`,
      },
    },
    openGraph: {
      title: t('Contact.title'),
      description: t('Contact.description'),
      url: `${SITE_URL}/${locale}/contact`,
    }
  };
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <ContactBackground />
      <div className="relative z-10 py-xl px-margin-mobile md:px-margin-desktop max-w-7xl mx-auto min-h-[calc(100vh-64px)]">
        <ContactHeader />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter mt-xl">
          <ContactForm />
          <ContactSidebar />
        </div>
      </div>
    </>
  );
}
