import { getTranslations } from "next-intl/server";
import { Reveal } from "@/components/ui/Reveal";

export async function ContactHeader() {
  const t = await getTranslations("ContactUs");

  return (
    <header className="mb-xl text-center md:text-left">
      <Reveal direction="up">
        <p className="font-label-caps text-label-caps text-primary mb-sm tracking-widest uppercase">
          {t('tag')}
        </p>
      </Reveal>
      
      <Reveal direction="up" delay={0.1}>
        <h1 className="font-display-lg text-display-lg md:text-display-lg text-on-surface max-w-2xl leading-tight mx-auto md:mx-0">
          {t('title_start')}
          <span className="text-primary italic">{t('title_highlight')}</span>
        </h1>
      </Reveal>
    </header>
  );
}
