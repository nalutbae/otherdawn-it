import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { routing } from '@/routing';
import '@/app/globals.css';

export const metadata: Metadata = {
  title: '다른새벽 IT — Domain-Specialized RAG for Every Industry',
  description:
    'mAI-Brain: Open-source domain-specific RAG chatbot framework. Qdrant + DeepSeek/OpenAI/Ollama.',
  keywords: ['RAG', 'chatbot', 'domain-specific', 'Qdrant', 'open-source', 'mAI-Brain'],
  openGraph: {
    title: '다른새벽 IT — Domain-Specialized RAG',
    description: 'Open-source domain-specific RAG chatbot framework for every industry.',
    siteName: '다른새벽 IT',
    type: 'website',
  },
};

const locales = routing.locales;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale as 'en' | 'ko')) {
    notFound();
  }

  // 핵심: locale을 명시적으로 설정하여 headers() 호출을 우회
  setRequestLocale(locale);

  // Static import for each locale to avoid headers() during SSG
  const messages = (await import(`../../messages/${locale}.json`)).default;

  return (
    <html lang={locale} className="dark">
      <body className={`${GeistSans.className} bg-navy-950 text-white antialiased`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}