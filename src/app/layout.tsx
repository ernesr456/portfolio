import type { Metadata } from 'next'
import { DM_Sans } from 'next/font/google'
import './globals.css'
import Providers from './providers'

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
})

const title = 'Ernesto Almario | Senior Software Engineer & Web3 Technical Lead'
const description =
  'Senior Software Engineer and Technical Lead building full-stack, Web3, and cloud platforms with Next.js, Angular, NestJS, Laravel, Rust, and AWS.'
const url = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

export const metadata: Metadata = {
  title,
  description,
  category: 'technology',
  metadataBase: new URL(url),
  applicationName: 'Ernesto Almario Portfolio',
  authors: [{ name: 'Ernesto Almario', url }],
  creator: 'Ernesto Almario',
  publisher: 'Ernesto Almario',
  keywords: [
    'Ernesto Almario',
    'Senior Software Engineer',
    'Web3 Engineer',
    'Technical Lead',
    'Next.js Developer',
    'Rust Developer',
    'Cloud Platform Engineer',
    'AWS',
    'Cebu City Software Engineer',
  ],
  verification: {
    google: 'wYx2foxZwAhAEE0JHAWVWSeYH9ryk3-X5YtzhY5YjMo',
  },
  alternates: {
    canonical: url,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    title,
    description,
    url,
    siteName: 'Ernesto Portfolio',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 404,
        alt: 'Ernesto Almario - Senior Software Engineer and Web3 Technical Lead',
      },
    ],
  },
  twitter: {
    title,
    description,
    card: 'summary_large_image',
    creator: '@AlmarioErn81564',
    images: {
      url: '/opengraph-image.png',
      alt: 'Ernesto Almario - Senior Software Engineer and Web3 Technical Lead',
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={dmSans.variable}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
