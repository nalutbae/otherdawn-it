'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/navigation';

export function Footer() {
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');

  return (
    <footer className="border-t border-white/5 bg-navy-950">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand */}
          <div>
            <div className="mb-3 text-lg font-bold tracking-tight">
              <span className="gradient-text">다른새벽</span>
              <span className="text-gray-500"> IT</span>
            </div>
            <p className="text-sm text-gray-500">{t('description')}</p>
          </div>

          {/* Links */}
          <div>
            <h4 className="mb-3 text-sm font-semibold text-gray-300">{t('product')}</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/product" className="text-sm text-gray-500 transition-colors hover:text-white">
                  mAI-Brain
                </Link>
              </li>
              <li>
                <a
                  href="https://github.com/nalutbae/mAI-Brain"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-500 transition-colors hover:text-white"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold text-gray-300">{t('company')}</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm text-gray-500 transition-colors hover:text-white">
                  {tNav('about')}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-gray-500 transition-colors hover:text-white">
                  {tNav('contact')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-white/5 pt-8 text-center text-xs text-gray-600">
          {t('rights')}
        </div>
      </div>
    </footer>
  );
}