'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

export function ContactSection() {
  const t = useTranslations('contact');

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
          <span className="inline-flex items-center rounded-full border border-accent-emerald/20 bg-accent-emerald/10 px-4 py-1.5 text-sm font-medium text-accent-emerald">
            {t('badge')}
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">{t('title')}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-400">{t('subtitle')}</p>
        </motion.div>

        <div className="mx-auto mt-12 max-w-lg">
          <motion.form
            className="glass-card space-y-6 p-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            onSubmit={(e) => e.preventDefault()}
          >
            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-300">
                {t('form.name')}
              </label>
              <input
                id="name"
                type="text"
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-gray-500 outline-none transition-colors focus:border-accent-emerald/50 focus:ring-1 focus:ring-accent-emerald/50"
                placeholder={t('form.name')}
              />
            </div>
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-300">
                {t('form.emailLabel')}
              </label>
              <input
                id="email"
                type="email"
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-gray-500 outline-none transition-colors focus:border-accent-emerald/50 focus:ring-1 focus:ring-accent-emerald/50"
                placeholder={t('form.emailLabel')}
              />
            </div>
            <div>
              <label htmlFor="message" className="mb-2 block text-sm font-medium text-gray-300">
                {t('form.message')}
              </label>
              <textarea
                id="message"
                rows={4}
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-gray-500 outline-none transition-colors focus:border-accent-emerald/50 focus:ring-1 focus:ring-accent-emerald/50"
                placeholder={t('form.message')}
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-lg bg-gradient-to-r from-accent-emerald to-accent-cyan px-6 py-2.5 text-sm font-semibold text-navy-950 transition-all hover:shadow-lg hover:shadow-accent-emerald/30"
            >
              {t('form.submit')}
            </button>
          </motion.form>

          <motion.div
            className="mt-8 flex items-center justify-center gap-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <a
              href="https://github.com/nalutbae/mAI-Brain"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-white"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              {t('github')}
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}