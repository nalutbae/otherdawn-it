'use client';

import { useTranslations } from 'next-intl';
import { m } from 'framer-motion';
import { Link } from '@/navigation';
import { useState, useEffect, useRef, useCallback } from 'react';

// Lightweight scroll position hook — replaces framer-motion's useScroll/useTransform/useSpring
function useScrollY() {
  const [scrollY, setScrollY] = useState(0);
  const rafId = useRef<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(() => {
        setScrollY(window.scrollY);
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return scrollY;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function Hero() {
  const t = useTranslations('hero');
  const scrollY = useScrollY();

  // Compute parallax transforms from scroll position
  const y1 = Math.min(scrollY * 0.4, 200);
  const y2 = Math.max(scrollY * -0.3, -150);
  const opacity = Math.max(1 - scrollY / 300, 0);
  const scale = Math.max(1 - scrollY * 0.0004, 0.8);
  const gridY = Math.min(scrollY * 0.1, 50);
  const glowX3 = Math.min(scrollY * 0.2, 100);

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 pt-16">
      {/* Background glow effects with parallax */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ opacity, willChange: 'opacity' }}
      >
        <div
          className="absolute left-1/2 top-1/4 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-accent-emerald/10 blur-[120px]"
          style={{ transform: `translateY(${y1}px) translateX(${mousePosition.x * 2}px)`, willChange: 'transform' }}
        />
        <div
          className="absolute right-1/4 top-1/2 h-[400px] w-[400px] rounded-full bg-accent-cyan/5 blur-[100px]"
          style={{ transform: `translateY(${y2}px) translateX(${-mousePosition.x}px)`, willChange: 'transform' }}
        />
        <div
          className="absolute bottom-1/4 left-1/4 h-[300px] w-[300px] rounded-full bg-accent-emerald/5 blur-[80px]"
          style={{ transform: `translateY(${glowX3}px)`, willChange: 'transform' }}
        />
      </div>

      {/* Grid pattern overlay with parallax */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          transform: `translateY(${gridY}px)`,
          willChange: 'transform',
        }}
      />

      <m.div
        className="relative z-10 mx-auto max-w-4xl text-center"
        style={{ scale }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Badge with pulse animation */}
        <m.div variants={itemVariants}>
          <m.span
            className="inline-flex items-center gap-2 rounded-full border border-accent-emerald/20 bg-accent-emerald/10 px-4 py-1.5 text-sm font-medium text-accent-emerald"
            whileHover={{ scale: 1.05, borderColor: 'rgba(16, 185, 129, 0.4)' }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-emerald opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-emerald" />
            </span>
            {t('badge')}
          </m.span>
        </m.div>

        {/* Title with character-by-character animation */}
        <m.h1
          className="mt-8 text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl"
          variants={itemVariants}
        >
          {t('title')}{' '}
          <m.span
            className="gradient-text inline-block"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            {t('titleHighlight')}
          </m.span>
        </m.h1>

        {/* Description */}
        <m.p
          className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-400"
          variants={itemVariants}
        >
          {t('description')}
        </m.p>

        {/* CTAs with enhanced hover effects */}
        <m.div
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          variants={itemVariants}
        >
          <m.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/product"
              className="group inline-flex items-center rounded-full bg-gradient-to-r from-accent-emerald to-accent-cyan px-8 py-3 text-sm font-semibold text-navy-950 shadow-lg shadow-accent-emerald/20 transition-all hover:shadow-xl hover:shadow-accent-emerald/30"
            >
              {t('cta')}
              <m.svg
                className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </m.svg>
            </Link>
          </m.div>
          <m.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <a
              href="https://github.com/nalutbae/mAI-Brain"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center rounded-full border border-white/10 bg-white/5 px-8 py-3 text-sm font-semibold text-white transition-all hover:border-white/20 hover:bg-white/10"
            >
              <m.svg
                className="mr-2 h-4 w-4 transition-transform group-hover:rotate-12"
                whileHover={{ rotate: 15 }}
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </m.svg>
              {t('ctaSecondary')}
            </a>
          </m.div>
        </m.div>

        {/* Stats bar with counter animation */}
        <m.div
          className="mt-16 flex flex-col items-center justify-center gap-8 border-t border-white/5 pt-8 sm:flex-row sm:gap-12"
          variants={itemVariants}
        >
          {[
            { icon: 'star', key: 'stars', color: 'text-accent-emerald' },
            { icon: 'fork', key: 'forks', color: 'text-accent-cyan' },
            { icon: 'domain', key: 'domains', color: 'text-accent-emerald' },
          ].map((stat, i) => (
            <m.div
              key={stat.key}
              className="flex items-center gap-2"
              whileHover={{ scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              <m.svg
                className={`h-5 w-5 ${stat.color}`}
                fill="currentColor"
                viewBox="0 0 24 24"
                initial={{ rotate: -180, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
              >
                {stat.icon === 'star' && (
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                )}
                {stat.icon === 'fork' && (
                  <path fill="none" stroke="currentColor" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                )}
                {stat.icon === 'domain' && (
                  <path fill="none" stroke="currentColor" strokeWidth={2} d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                )}
              </m.svg>
              <span className="text-sm font-semibold text-white">{t(`stats.${stat.key}`)}</span>
            </m.div>
          ))}
        </m.div>
      </m.div>

      {/* Scroll indicator with bounce animation */}
      <m.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        <m.div
          className="flex flex-col items-center gap-2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="text-xs text-gray-500">Scroll</span>
          <div className="h-8 w-5 rounded-full border border-white/20 p-1">
            <m.div
              className="h-2 w-1.5 rounded-full bg-accent-emerald"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        </m.div>
      </m.div>
    </section>
  );
}