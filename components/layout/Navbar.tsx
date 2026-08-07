"use client";

import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import { Link, useRouter, usePathname } from "@/i18n/routing";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export function Navbar() {
  const t = useTranslations("Navbar");
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const [isOpen, setIsOpen] = useState(false);

  const toggleLanguage = () => {
    const nextLocale = locale === 'en' ? 'ar' : 'en';
    router.replace(pathname, { locale: nextLocale });
  };

  const closeMenu = () => setIsOpen(false);

  // Body scroll lock & Escape key
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };

    window.addEventListener("keydown", handleEsc);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen]);

  const navLinks = [
    { name: t('home'), path: '/' },
    { name: t('about'), path: '/about' },
    { name: t('projects'), path: '/projects' },
    { name: t('contact'), path: '/contact' }
  ];

  return (
    <>
      <nav className="fixed top-0 w-full z-[100] h-16 bg-surface/80 dark:bg-surface-dim/80 backdrop-blur-xl border-b border-outline-variant/30 dark:border-primary/10 shadow-sm transition-all duration-300">
        <div className="flex items-center justify-between px-margin-mobile md:px-margin-desktop h-full max-w-full">

          <Link href="/" className="flex items-center gap-2 relative z-[101]">
            <Image
              alt="VDiv Logo"
              className="h-8 md:h-10 w-auto object-contain"
              src="/LOGO-Nav-footer.png"
              width={160}
              height={40}
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-xl">
            {navLinks.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link 
                  key={link.path}
                  href={link.path} 
                  className={`font-body-md text-body-md transition-colors ${isActive ? 'text-primary dark:text-primary-fixed-dim border-b-2 border-primary dark:border-primary-fixed-dim pb-1' : 'text-on-surface-variant dark:text-on-surface-variant/80 hover:text-primary dark:hover:text-primary'}`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-md relative z-[101]">
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
            
            {/* Hamburger Button */}
            <button 
              className="md:hidden p-2 text-primary focus:outline-none relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-primary/5 dark:hover:bg-primary/10 transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              aria-label="Toggle mobile menu"
            >
              <div className="w-6 h-4 relative flex flex-col justify-between">
                <span className={`w-full h-[2px] bg-current rounded-full transition-all duration-300 absolute ${isOpen ? 'rotate-45 top-2' : 'top-0'}`}></span>
                <span className={`w-full h-[2px] bg-current rounded-full transition-all duration-300 absolute top-1/2 -translate-y-1/2 ${isOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                <span className={`w-full h-[2px] bg-current rounded-full transition-all duration-300 absolute ${isOpen ? '-rotate-45 top-2' : 'bottom-0'}`}></span>
              </div>
            </button>
          </div>

        </div>
      </nav>

      {/* Backdrop */}
      <div 
        className={`fixed inset-0 z-[90] bg-black/60 backdrop-blur-sm md:hidden transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={closeMenu}
        aria-hidden="true"
      />

      {/* Mobile Menu */}
      <aside 
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        className={`fixed top-0 end-0 bottom-0 w-[300px] max-w-[80vw] z-[95] bg-surface dark:bg-surface-dim border-s border-outline-variant/30 shadow-2xl flex flex-col pt-24 px-6 md:hidden transition-transform duration-500 ease-out ${
          isOpen ? 'translate-x-0' : (locale === 'ar' ? '-translate-x-full' : 'translate-x-full')
        }`}
      >
        <div className="flex flex-col gap-6">
          {navLinks.map((link, idx) => {
            const isActive = pathname === link.path;
            return (
              <Link 
                key={link.path}
                href={link.path} 
                onClick={closeMenu}
                className={`text-2xl font-display-md transition-all duration-300 ${
                  isActive ? 'text-primary' : 'text-on-surface hover:text-primary'
                } ${
                  isOpen ? 'opacity-100 translate-x-0' : (locale === 'ar' ? 'opacity-0 -translate-x-4' : 'opacity-0 translate-x-4')
                }`}
                style={{ transitionDelay: isOpen ? `${idx * 50 + 150}ms` : '0ms' }}
              >
                {link.name}
              </Link>
            );
          })}
        </div>
      </aside>
    </>
  );
}
