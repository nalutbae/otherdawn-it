import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '다른새벽 IT',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}