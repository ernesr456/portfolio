import type { Metadata } from 'next';
import { DM_Sans } from 'next/font/google';
import './globals.css';
import Providers from './providers';

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
});

const title = 'Ernesto Almario | Senior Software Engineer & Web3 Technical Lead';
const description =
  'Senior Software Engineer and Technical Lead building full-stack and Web3 products with Next.js, Angular, NestJS, Laravel, and Rust.';
const url = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const metadata: Metadata = {
  title,
  description,
  category: 'technology',
  metadataBase: new URL(url),
  alternates: {
    canonical: url,
  },
  openGraph: {
    title,
    description,
    url,
    siteName: 'Ernesto Portfolio',
    type: 'website',
    images: '/opengraph-image.png',
  },
  twitter: {
    title,
    description,
    card: 'summary_large_image',
    creator: '@AlmarioErn81564',
    images: '/opengraph-image.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={dmSans.variable}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
