import { getRequestConfig, getLocale } from 'next-intl/server';
import { routing } from '../routing';

export default getRequestConfig(async () => {
  // setRequestLocale()로 설정된 locale을 읽어옴 (headers() 호출 없음)
  const locale = await getLocale();

  if (!locale || !routing.locales.includes(locale as 'en' | 'ko')) {
    return {
      locale: routing.defaultLocale,
      messages: (await import(`../messages/${routing.defaultLocale}.json`)).default,
    };
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});