'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

const values = ['precision', 'openness', 'autonomy'] as const;

const valueIcons: Record<string, JSX.Element> = {
  precision: (
    <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
    </svg>
  ),
  openness: (
    <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.032 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.032-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
    </svg>
  ),
  autonomy: (
    <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    </svg>
  ),
};

export function AboutSection() {
  const t = useTranslations('about');

  return (
    <section className="relative px-4 py-24 pt-32 sm:px-6">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-flex items-center rounded-full border border-accent-cyan/20 bg-accent-cyan/10 px-4 py-1.5 text-sm font-medium text-accent-cyan">
            {t('badge')}
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">{t('title')}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-400">{t('subtitle')}</p>
        </motion.div>

        {/* Story */}
        <motion.div
          className="mx-auto mt-12 max-w-3xl space-y-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <p className="text-lg leading-relaxed text-gray-300">{t('story')}</p>
          <p className="text-lg leading-relaxed text-gray-300">{t('story2')}</p>
        </motion.div>

        {/* Mission highlight */}
        <motion.div
          className="mx-auto mt-12 max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <div className="glass-card border-accent-cyan/20 p-8 text-center">
            <div className="mb-3 inline-flex rounded-full bg-accent-cyan/10 p-2 text-accent-cyan">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
              </svg>
            </div>
            <h3 className="gradient-text text-xl font-bold">{t('mission.title')}</h3>
            <p className="mt-2 text-gray-400">{t('mission.description')}</p>
          </div>
        </motion.div>

        {/* Values */}
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {values.map((key, i) => (
            <motion.div
              key={key}
              className="glass-card p-6 text-center transition-all hover:border-accent-cyan/20 hover:glow-cyan"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <div className="mb-3 inline-flex rounded-full bg-accent-cyan/10 p-3 text-accent-cyan">
                {valueIcons[key]}
              </div>
              <h3 className="gradient-text text-xl font-bold">{t(`values.${key}.title`)}</h3>
              <p className="mt-2 text-sm text-gray-400">{t(`values.${key}.description`)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}