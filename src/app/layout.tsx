import type { Metadata } from 'next'
import './globals.css'

import Footer from '@/components/Footer/Footer'
import Navbar from '@/components/Navbar/Navbar'
import ThemeMenu from '@/components/Theme/ThemeMenu'
import { Fira_Code } from 'next/font/google'

const firaCode = Fira_Code({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'] })

const title = 'Ernesto Almario | Full-Stack Developer, Web3 Engineer in the Philippines'

const description =
    "Ernesto Almario is a Full-Stack and Web3 Engineer based in the Philippines. He builds scalable web applications and blockchain-powered solutions using React, Next.js, Node.js, and Rust. Let’s build secure, modern digital products together."

const url = process.env.NEXT_PUBLIC_SITE_URL

export const metadata: Metadata = {
  title,
  description,
  category: 'technology',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL!),
  alternates: {
    canonical: url,
  },
  openGraph: {
    title,
    description,
    url,
    siteName: 'Ernesto Portfolio',
    type: 'website',
    images: './twitter-image.png'
  },
  twitter: {
    title,
    description,
    card: 'summary_large_image',
    creator: '@AlmarioErn81564',
    images: './twitter-image.png'
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" data-theme="dark">
      <body className={`${firaCode.className}`}>
        <header>
          <Navbar />
        </header>
        {children}
        <ThemeMenu />
        <Footer />
      </body>
    </html>
  )
}
