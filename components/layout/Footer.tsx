'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/navigation';
import { m } from 'framer-motion';

const footerLinks = [
  { href: '/product', label: 'mAI-Brain', external: false },
  { href: 'https://github.com/nalutbae/mAI-Brain', label: 'GitHub', external: true },
] as const;

const companyLinks = [
  { href: '/about', labelKey: 'about' },
  { href: '/contact', labelKey: 'contact' },
] as const;

export function Footer() {
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');

  return (
    <m.footer 
      className="border-t border-white/5 bg-navy-950"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand with hover effect */}
          <m.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <m.div 
              className="mb-3 text-lg font-bold tracking-tight"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              <span className="gradient-text">다른새벽</span>
              <span className="text-gray-500"> IT</span>
            </m.div>
            <m.p 
              className="text-sm text-gray-500"
              whileHover={{ color: 'rgba(255, 255, 255, 0.7)' }}
              transition={{ duration: 0.2 }}
            >
              {t('description')}
            </m.p>
          </m.div>

          {/* Product links with staggered animation */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <m.h4 
              className="mb-3 text-sm font-semibold text-gray-300"
              whileHover={{ color: 'white' }}
              transition={{ duration: 0.2 }}
            >
              {t('product')}
            </m.h4>
            <ul className="space-y-2">
              {footerLinks.map((link, i) => (
                <m.li
                  key={link.label}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.3 + i * 0.1 }}
                >
                  {link.external ? (
                    <m.a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-gray-500 transition-colors hover:text-white"
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {link.label}
                    </m.a>
                  ) : (
                    <m.div whileHover={{ x: 5 }} whileTap={{ scale: 0.95 }}>
                      <Link 
                        href={link.href} 
                        className="text-sm text-gray-500 transition-colors hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </m.div>
                  )}
                </m.li>
              ))}
            </ul>
          </m.div>

          {/* Company links with staggered animation */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <m.h4 
              className="mb-3 text-sm font-semibold text-gray-300"
              whileHover={{ color: 'white' }}
              transition={{ duration: 0.2 }}
            >
              {t('company')}
            </m.h4>
            <ul className="space-y-2">
              {companyLinks.map((link, i) => (
                <m.li
                  key={link.labelKey}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.4 + i * 0.1 }}
                >
                  <m.div whileHover={{ x: 5 }} whileTap={{ scale: 0.95 }}>
                    <Link 
                      href={link.href} 
                      className="text-sm text-gray-500 transition-colors hover:text-white"
                    >
                      {tNav(link.labelKey)}
                    </Link>
                  </m.div>
                </m.li>
              ))}
            </ul>
          </m.div>
        </div>

        {/* Copyright with fade-in animation */}
        <m.div 
          className="mt-8 border-t border-white/5 pt-8 text-center text-xs text-gray-600"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          {t('rights')}
        </m.div>
      </div>
    </m.footer>
  );
}