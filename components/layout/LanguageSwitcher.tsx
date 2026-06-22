'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useRouter, usePathname } from '@/navigation';
import { routing } from '@/routing';

export function LanguageSwitcher() {
  const locale = useLocale();
  const t = useTranslations('languageSwitcher');
  const router = useRouter();
  const pathname = usePathname();

  const nextLocale = locale === 'en' ? 'ko' : 'en';

  function switchLocale() {
    router.replace(pathname, { locale: nextLocale });
  }

  return (
    <button
      onClick={switchLocale}
      className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-gray-400 transition-colors hover:border-accent-emerald/30 hover:text-white"
      aria-label={`Switch to ${nextLocale === 'en' ? 'English' : '한국어'}`}
    >
      {nextLocale === 'en' ? 'English' : '한국어'}
    </button>
  );
}