'use client';

import { useTranslations } from 'next-intl';
import { Link, usePathname, useRouter } from '@/navigation';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { LanguageSwitcher } from './LanguageSwitcher';
import { m } from 'framer-motion';

const navLinks = [
  { href: '/product', labelKey: 'product' },
  { href: '/about', labelKey: 'about' },
  { href: '/contact', labelKey: 'contact' },
] as const;

export function Navbar() {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <m.header
      className={cn(
        'fixed top-0 z-50 w-full border-b border-white/5 backdrop-blur-xl transition-all duration-300',
        scrolled ? 'bg-navy-950/90 shadow-lg' : 'bg-navy-950/80'
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Logo with hover effect */}
        <m.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link
            href="/"
            className="flex items-center gap-2 text-lg font-bold tracking-tight"
          >
            <m.span
              className="gradient-text"
              whileHover={{
                backgroundPosition: '100% 0',
                transition: { duration: 0.5 }
              }}
            >
              다른새벽
            </m.span>
            <span className="text-gray-500">IT</span>
          </Link>
        </m.div>

        {/* Desktop nav with enhanced hover effects */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <m.div key={link.href} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href={link.href}
                className={cn(
                  'text-sm transition-colors hover:text-white relative',
                  pathname === link.href
                    ? 'text-white'
                    : 'text-gray-400'
                )}
              >
                {t(link.labelKey)}
                {pathname === link.href && (
                  <m.div
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-accent-emerald to-accent-cyan"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </Link>
            </m.div>
          ))}
          <m.a
            href="https://github.com/nalutbae/mAI-Brain"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gray-400 transition-colors hover:text-white"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {t('github')}
          </m.a>
          <m.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <LanguageSwitcher />
          </m.div>
        </div>

        {/* Mobile toggle — replaced AnimatePresence with CSS transitions */}
        <m.button
          className="md:hidden text-gray-400 hover:text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <div className="relative h-6 w-6">
            <svg
              className={`absolute inset-0 h-6 w-6 transition-all duration-200 ${mobileOpen ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0'}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            <svg
              className={`absolute inset-0 h-6 w-6 transition-all duration-200 ${mobileOpen ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </div>
        </m.button>
      </nav>

      {/* Mobile menu — replaced AnimatePresence with CSS transition */}
      <div
        className={`border-t border-white/5 bg-navy-950/95 backdrop-blur-xl md:hidden overflow-hidden transition-all duration-300 ${
          mobileOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="mx-auto max-w-6xl space-y-1 px-4 py-4">
          {navLinks.map((link) => (
            <m.div
              key={link.href}
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                href={link.href}
                className={cn(
                  'block rounded-lg px-3 py-2 text-sm transition-colors hover:bg-white/5',
                  pathname === link.href
                    ? 'text-white bg-white/5'
                    : 'text-gray-400 hover:text-white'
                )}
              >
                {t(link.labelKey)}
              </Link>
            </m.div>
          ))}
          <m.div
            whileHover={{ x: 5 }}
            whileTap={{ scale: 0.98 }}
          >
            <a
              href="https://github.com/nalutbae/mAI-Brain"
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-lg px-3 py-2 text-sm text-gray-400 transition-colors hover:bg-white/5 hover:text-white"
            >
              {t('github')}
            </a>
          </m.div>
          <m.div className="pt-2">
            <LanguageSwitcher />
          </m.div>
        </div>
      </div>
    </m.header>
  );
}