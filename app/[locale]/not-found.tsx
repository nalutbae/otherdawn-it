'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/navigation';

export default function LocaleNotFound() {
  const t = useTranslations('notFound');

  return (
    <div className="flex min-h-screen items-center justify-center bg-navy-950 text-white">
      <div className="text-center">
        <h1 className="text-6xl font-bold gradient-text">{t('title')}</h1>
        <p className="mt-4 text-gray-400">{t('message')}</p>
        <Link
          href="/"
          className="mt-6 inline-block rounded-full bg-gradient-to-r from-accent-emerald to-accent-cyan px-6 py-2.5 text-sm font-semibold text-navy-950 transition-all hover:shadow-lg hover:shadow-accent-emerald/30"
        >
          {t('backHome')}
        </Link>
      </div>
    </div>
  );
}