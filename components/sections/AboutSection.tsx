'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

const values = ['precision', 'openness', 'autonomy'] as const;

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
          <p className="text-gray-300 leading-relaxed">{t('story')}</p>
          <p className="text-gray-300 leading-relaxed">{t('story2')}</p>
        </motion.div>

        {/* Values */}
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {values.map((key, i) => (
            <motion.div
              key={key}
              className="glass-card p-6 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <h3 className="gradient-text text-xl font-bold">{t(`values.${key}.title`)}</h3>
              <p className="mt-2 text-sm text-gray-400">{t(`values.${key}.description`)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}