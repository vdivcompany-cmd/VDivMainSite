import { SITE_URL } from '@/lib/constants';
import { MetadataRoute } from 'next';
import seoData from '@/data/seoPages.json';
import { routing } from '@/i18n/routing';

const baseUrl = SITE_URL;

export default function sitemap(): MetadataRoute.Sitemap {
  // Static core routes
  const coreRoutes = [
    '',
    '/about',
    '/projects',
    '/contact',
  ];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  // 1. Add static routes for all locales
  for (const locale of routing.locales) {
    for (const route of coreRoutes) {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: route === '' ? 1.0 : 0.8,
      });
    }
  }

  // 2. Add all programmatic SEO location routes
  const seoSlugs = Object.keys(seoData);
  for (const slug of seoSlugs) {
    for (const locale of routing.locales) {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.6,
      });
    }
  }

  return sitemapEntries;
}
