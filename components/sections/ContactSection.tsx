'use client';

import { useTranslations } from 'next-intl';
import { m } from 'framer-motion';
import { useInView } from '@/hooks/useInView';
import { useRef, useState } from 'react';

export function ContactSection() {
  const t = useTranslations('contact');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const formRef = useRef(null);
  const isInView = useInView(formRef, { once: true, amount: 0.3 });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Reset after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
    }, 1500);
  };

  return (
    <section className="relative px-4 py-24 pt-32 sm:px-6">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <m.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <m.span 
            className="inline-flex items-center rounded-full border border-accent-emerald/20 bg-accent-emerald/10 px-4 py-1.5 text-sm font-medium text-accent-emerald"
            whileHover={{ scale: 1.05, borderColor: 'rgba(16, 185, 129, 0.4)' }}
            transition={{ type: 'spring', stiffness: 400 }}
          >
            {t('badge')}
          </m.span>
          <m.h1 
            className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {t('title')}
          </m.h1>
          <m.p 
            className="mx-auto mt-4 max-w-2xl text-lg text-gray-400"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {t('subtitle')}
          </m.p>
        </m.div>

        <div className="mt-12 grid gap-8 lg:grid-cols-5">
          {/* Contact info sidebar with enhanced animations */}
          <m.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <m.div 
              className="glass-card space-y-8 p-8"
              whileHover={{ 
                scale: 1.02,
                boxShadow: '0 0 40px rgba(16, 185, 129, 0.1)'
              }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              {/* Email */}
              <m.div 
                className="flex items-start gap-4"
                whileHover={{ x: 5 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <m.div 
                  className="rounded-lg bg-accent-emerald/10 p-2.5 text-accent-emerald"
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </m.div>
                <div>
                  <h4 className="text-sm font-semibold text-white">{t('email')}</h4>
                  <m.a 
                    href="mailto:hello@otherdawn.org" 
                    className="mt-1 text-sm text-gray-400 transition-colors hover:text-accent-emerald"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {t('info.email')}
                  </m.a>
                </div>
              </m.div>

              {/* GitHub */}
              <m.div 
                className="flex items-start gap-4"
                whileHover={{ x: 5 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <m.div 
                  className="rounded-lg bg-white/5 p-2.5 text-white"
                  whileHover={{ rotate: -10, scale: 1.1 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </m.div>
                <div>
                  <h4 className="text-sm font-semibold text-white">{t('github')}</h4>
                  <m.a
                    href="https://github.com/nalutbae/mAI-Brain"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 text-sm text-gray-400 transition-colors hover:text-white"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {t('info.github')}
                  </m.a>
                </div>
              </m.div>

              {/* Response time with pulse animation */}
              <m.div 
                className="border-t border-white/5 pt-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="flex items-center gap-2">
                  <div className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-emerald opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-emerald" />
                  </div>
                  <m.span 
                    className="text-sm text-gray-400"
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {t('info.response')}
                  </m.span>
                </div>
              </m.div>
            </m.div>
          </m.div>

          {/* Form with enhanced interactions */}
          <m.div
            ref={formRef}
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <m.form
              className="glass-card space-y-6 p-8"
              onSubmit={handleSubmit}
              whileHover={{ 
                scale: 1.01,
                boxShadow: '0 0 40px rgba(6, 182, 212, 0.1)'
              }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <m.div
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-300">
                  {t('form.name')}
                </label>
                <m.input
                  id="name"
                  type="text"
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-gray-500 outline-none transition-colors focus:border-accent-emerald/50 focus:ring-1 focus:ring-accent-emerald/50"
                  placeholder={t('form.name')}
                  whileFocus={{ 
                    scale: 1.02,
                    borderColor: 'rgba(16, 185, 129, 0.5)'
                  }}
                  transition={{ type: 'spring', stiffness: 300 }}
                />
              </m.div>

              <m.div
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-300">
                  {t('form.emailLabel')}
                </label>
                <m.input
                  id="email"
                  type="email"
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-gray-500 outline-none transition-colors focus:border-accent-emerald/50 focus:ring-1 focus:ring-accent-emerald/50"
                  placeholder={t('form.emailLabel')}
                  whileFocus={{ 
                    scale: 1.02,
                    borderColor: 'rgba(16, 185, 129, 0.5)'
                  }}
                  transition={{ type: 'spring', stiffness: 300 }}
                />
              </m.div>

              <m.div
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.3, delay: 0.3 }}
              >
                <label htmlFor="message" className="mb-2 block text-sm font-medium text-gray-300">
                  {t('form.message')}
                </label>
                <m.textarea
                  id="message"
                  rows={5}
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-gray-500 outline-none transition-colors focus:border-accent-emerald/50 focus:ring-1 focus:ring-accent-emerald/50"
                  placeholder={t('form.message')}
                  whileFocus={{ 
                    scale: 1.02,
                    borderColor: 'rgba(16, 185, 129, 0.5)'
                  }}
                  transition={{ type: 'spring', stiffness: 300 }}
                />
              </m.div>

              <m.button
                type="submit"
                className="w-full rounded-lg bg-gradient-to-r from-accent-emerald to-accent-cyan px-6 py-2.5 text-sm font-semibold text-navy-950 transition-all hover:shadow-lg hover:shadow-accent-emerald/30"
                disabled={isSubmitting || isSubmitted}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.3, delay: 0.4 }}
              >
                {isSubmitting ? (
                  <m.span
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    Sending...
                  </m.span>
                ) : isSubmitted ? (
                  <m.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="flex items-center justify-center gap-2"
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Sent!
                  </m.span>
                ) : (
                  t('form.submit')
                )}
              </m.button>
            </m.form>
          </m.div>
        </div>
      </div>
    </section>
  );
}