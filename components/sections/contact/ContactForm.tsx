"use client";

import { useTranslations } from "next-intl";
import { Send } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

export function ContactForm() {
  const t = useTranslations("ContactUs");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In the future, wire this up to Supabase or an email service
    console.log("Transmission Initiated.");
  };

  return (
    <section className="lg:col-span-7 bg-surface-dim/40 backdrop-blur-xl border border-primary/10 p-xl rounded-xl relative">
      {/* Circuit Node dot */}
      <div className="absolute right-0 top-0 w-1 h-1 bg-primary rounded-full shadow-[0_0_8px_var(--primary)]"></div>
      
      <Reveal direction="up">
        <div className="mb-lg">
          <h2 className="font-headline-md text-headline-md text-primary mb-base">
            {t('portal_title')}
          </h2>
          <p className="font-body-md text-on-surface-variant">
            {t('portal_desc')}
          </p>
        </div>
      </Reveal>

      <form className="space-y-lg" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
          
          <Reveal direction="up" delay={0.1}>
            <div className="group relative">
              <label className="font-technical-data text-technical-data text-on-surface-variant block mb-base uppercase">
                {t('lbl_name')}
              </label>
              <input 
                required
                className="w-full bg-surface-container-low border-0 border-b border-outline-variant/30 py-md px-0 focus:ring-0 text-on-surface placeholder:text-outline transition-all duration-300 focus:outline-none" 
                placeholder="E.g. Alan Turing" 
                type="text"
              />
              <div className="absolute bottom-0 left-0 h-px w-0 bg-primary transition-all duration-400 group-focus-within:w-full"></div>
            </div>
          </Reveal>

          <Reveal direction="up" delay={0.2}>
            <div className="group relative">
              <label className="font-technical-data text-technical-data text-on-surface-variant block mb-base uppercase">
                {t('lbl_email')}
              </label>
              <input 
                required
                className="w-full bg-surface-container-low border-0 border-b border-outline-variant/30 py-md px-0 focus:ring-0 text-on-surface placeholder:text-outline transition-all duration-300 focus:outline-none" 
                placeholder="name@domain.tech" 
                type="email"
              />
              <div className="absolute bottom-0 left-0 h-px w-0 bg-primary transition-all duration-400 group-focus-within:w-full"></div>
            </div>
          </Reveal>
        </div>

        <Reveal direction="up" delay={0.3}>
          <div className="group relative">
            <label className="font-technical-data text-technical-data text-on-surface-variant block mb-base uppercase">
              {t('lbl_service')}
            </label>
            <select className="w-full bg-surface-container-low border-0 border-b border-outline-variant/30 py-md px-0 focus:ring-0 text-on-surface appearance-none focus:outline-none cursor-pointer">
              <option>{t('opt_1')}</option>
              <option>{t('opt_2')}</option>
              <option>{t('opt_3')}</option>
              <option>{t('opt_4')}</option>
            </select>
            <div className="absolute bottom-0 left-0 h-px w-0 bg-primary transition-all duration-400 group-focus-within:w-full"></div>
          </div>
        </Reveal>

        <Reveal direction="up" delay={0.4}>
          <div className="group relative">
            <label className="font-technical-data text-technical-data text-on-surface-variant block mb-base uppercase">
              {t('lbl_payload')}
            </label>
            <textarea 
              required
              className="w-full bg-surface-container-low border-0 border-b border-outline-variant/30 py-md px-0 focus:ring-0 text-on-surface placeholder:text-outline transition-all duration-300 resize-none focus:outline-none" 
              placeholder="Describe the project scope or technical challenge..." 
              rows={4}
            ></textarea>
            <div className="absolute bottom-[5px] left-0 h-px w-0 bg-primary transition-all duration-400 group-focus-within:w-full"></div>
          </div>
        </Reveal>

        <Reveal direction="up" delay={0.5}>
          <button 
            type="submit"
            className="group relative px-xl py-md bg-primary text-on-primary font-technical-data text-technical-data font-bold rounded-lg overflow-hidden transition-transform duration-200 active:scale-95 flex items-center justify-center gap-sm mt-md"
          >
            {t('btn_submit')}
            <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </Reveal>
      </form>
    </section>
  );
}
