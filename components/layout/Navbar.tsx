"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link, useRouter, usePathname } from "@/i18n/routing";
import { useTheme } from "next-themes";
import { Moon, Sun, Globe } from "lucide-react";

export function Navbar() {
  const t = useTranslations("Navbar");
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const toggleLanguage = () => {
    const nextLocale = locale === 'en' ? 'ar' : 'en';
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <nav className="fixed top-0 w-full z-[100] h-16 bg-surface/80 dark:bg-surface-dim/80 backdrop-blur-xl border-b border-outline-variant/30 dark:border-primary/10 shadow-sm transition-all duration-300">
      <div className="flex items-center justify-between px-margin-mobile md:px-margin-desktop h-full max-w-full">

        <Link href="/" className="flex items-center gap-2">
          <img
            alt="VDiv Logo"
            className="h-8 md:h-10 w-auto object-contain"
            src="/LOGO-Nav-footer.png"
          />
        </Link>

        <div className="hidden md:flex items-center gap-xl">
          <Link href="/" className={`font-body-md text-body-md transition-colors ${pathname === '/' ? 'text-primary dark:text-primary-fixed-dim border-b-2 border-primary dark:border-primary-fixed-dim pb-1' : 'text-on-surface-variant dark:text-on-surface-variant/80 hover:text-primary dark:hover:text-primary'}`}>
            {t('home')}
          </Link>
          <Link href="/about" className={`font-body-md text-body-md transition-colors ${pathname === '/about' ? 'text-primary dark:text-primary-fixed-dim border-b-2 border-primary dark:border-primary-fixed-dim pb-1' : 'text-on-surface-variant dark:text-on-surface-variant/80 hover:text-primary dark:hover:text-primary'}`}>
            {t('about')}
          </Link>
          <Link href="/projects" className={`font-body-md text-body-md transition-colors ${pathname === '/projects' ? 'text-primary dark:text-primary-fixed-dim border-b-2 border-primary dark:border-primary-fixed-dim pb-1' : 'text-on-surface-variant dark:text-on-surface-variant/80 hover:text-primary dark:hover:text-primary'}`}>
            {t('projects')}
          </Link>
          <Link href="/contact" className={`font-body-md text-body-md transition-colors ${pathname === '/contact' ? 'text-primary dark:text-primary-fixed-dim border-b-2 border-primary dark:border-primary-fixed-dim pb-1' : 'text-on-surface-variant dark:text-on-surface-variant/80 hover:text-primary dark:hover:text-primary'}`}>
            {t('contact')}
          </Link>
        </div>

        <div className="flex items-center gap-md">
          <button
            onClick={toggleLanguage}
            className="p-2 rounded-full hover:bg-primary/5 dark:hover:bg-primary/10 transition-all duration-300 flex items-center justify-center font-technical-data text-primary"
          >
            {locale === 'en' ? 'Ar' : 'En'}
          </button>
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-full hover:bg-primary/5 dark:hover:bg-primary/10 transition-all duration-300 flex items-center justify-center"
          >
            <Sun className="w-5 h-5 text-primary hidden dark:block" />
            <Moon className="w-5 h-5 text-primary block dark:hidden" />
          </button>
        </div>

      </div>
    </nav>
  );
}
