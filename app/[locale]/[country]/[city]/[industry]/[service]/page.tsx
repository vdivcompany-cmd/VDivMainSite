import { SITE_URL } from '@/lib/constants';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import seoData from '@/data/seoPages.json';
import { routing } from '@/i18n/routing';

type PageProps = {
  params: Promise<{
    locale: string;
    country: string;
    city: string;
    industry: string;
    service: string;
  }>;
};

// Helpers for English Fallback
const capitalize = (str: string) => str.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

const countriesEn: Record<string, string> = { eg: 'Egypt', ae: 'UAE', kw: 'Kuwait', sa: 'Saudi Arabia' };
const industriesEn: Record<string, string> = {
  'healthcare': 'Healthcare',
  'real-estate': 'Real Estate',
  'finance': 'Finance & Banking',
  'retail': 'Retail',
  'logistics': 'Logistics',
  'construction': 'Construction'
};
const servicesEn: Record<string, string> = {
  'custom-software-development': 'Custom Software Development',
  'ai-automation': 'AI Automation',
  'custom-crm-development': 'Custom CRM Development',
  'erp-development': 'ERP Development',
  'digital-transformation': 'Digital Transformation',
  'enterprise-web-applications': 'Enterprise Web Applications'
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const { locale, country, city, industry, service } = resolvedParams;
  
  const slug = `${country}/${city}/${industry}/${service}`;
  const data = (seoData as Record<string, any>)[slug];

  if (!data) {
    return {};
  }

  const isEn = locale === 'en';
  
  // Dynamic English Fallback
  const cityName = capitalize(city);
  const countryName = countriesEn[country] || capitalize(country);
  const industryName = industriesEn[industry] || capitalize(industry);
  const serviceName = servicesEn[service] || capitalize(service);

  const title = isEn 
    ? `${serviceName} Company for ${industryName} in ${cityName} | vDiv`
    : data.metaTitle;
    
  const description = isEn
    ? `Hire the best ${serviceName} company for the ${industryName} sector in ${cityName}. Custom tech solutions for enterprise efficiency.`
    : data.metaDescription;

  // Build true hreflang pair
  const baseUrl = '${SITE_URL}';
  
  const languages: Record<string, string> = {};
  routing.locales.forEach(l => {
    // Generate ISO language-region code for hreflang (e.g. ar-EG, en-EG)
    const region = country.toUpperCase();
    languages[`${l}-${region}`] = `${baseUrl}/${l}/${slug}`;
  });
  
  return {
    title,
    description,
    alternates: {
      canonical: `${baseUrl}/${locale}/${slug}`,
      languages
    },
    openGraph: {
      title,
      description,
      url: `${baseUrl}/${locale}/${slug}`,
      siteName: 'vDiv',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    }
  };
}

export default async function SEOLocationPage({ params }: PageProps) {
  const resolvedParams = await params;
  const { locale, country, city, industry, service } = resolvedParams;
  
  const slug = `${country}/${city}/${industry}/${service}`;
  const data = (seoData as Record<string, any>)[slug];

  if (!data) {
    notFound();
  }

  const isEn = locale === 'en';
  
  const cityName = capitalize(city);
  const industryName = industriesEn[industry] || capitalize(industry);
  const serviceName = servicesEn[service] || capitalize(service);

  const h1 = isEn 
    ? `Advanced ${serviceName} Solutions for ${industryName} in ${cityName}`
    : data.suggestedH1;
    
  const primaryKeyword = isEn
    ? `${serviceName} Company for ${industryName} in ${cityName}`
    : data.primaryKeyword;

  const schema = {
    "@context": "https://schema.org",
    "@type": data.schemaType || "ProfessionalService",
    "name": "vDiv",
    "url": `${SITE_URL}/${locale}/${slug}`,
    "description": primaryKeyword,
    "areaServed": {
      "@type": "AdministrativeArea",
      "name": isEn ? cityName : data.city
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <section className="relative min-h-[70vh] flex flex-col items-center justify-center overflow-hidden border-b border-white/5 py-32 px-4 text-center bg-surface-container-lowest">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-50 pointer-events-none" />
        
        <div className="max-w-4xl mx-auto space-y-8 relative z-10">
          <div className="text-sm text-primary font-mono mb-8 opacity-90">
            {isEn ? `Home > ${countriesEn[country] || capitalize(country)} > ${cityName} > ${industryName} > ${serviceName}` : data.breadcrumb}
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-on-background">
            {h1}
          </h1>
          
          <p className="text-lg md:text-xl text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
            {isEn 
              ? `We build digital ecosystems with absolute precision. Transforming ${industryName} enterprises in ${cityName} with cutting-edge ${serviceName}.` 
              : `نقوم ببناء النظم البيئية الرقمية بدقة مطلقة. تحويل شركات ${data.industry} في ${data.city} بأحدث حلول ${data.serviceCategory}.`
            }
          </p>

          <div className="pt-8">
            <button className="bg-primary text-on-primary px-8 py-4 rounded-full font-bold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">
              {isEn ? 'Start a Project' : 'ابدأ مشروعك'}
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
