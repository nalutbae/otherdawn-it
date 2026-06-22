import { redirect } from 'next/navigation';
import { routing } from '@/routing';

export default function LocaleNotFound() {
  redirect(`/${routing.defaultLocale}`);
}