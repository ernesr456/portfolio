import React from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import HeroSection from '@/app/components/HeroSection'
import ProjectsSection from '@/app/components/ProjectsSection'
import SkillsSection from '@/app/components/SkillsSection'
import ExperienceSection from '@/app/components/ExperienceSection'
import ContactSection from '@/app/components/ContactSection'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ProfilePage',
      '@id': `${siteUrl}/#profile-page`,
      url: siteUrl,
      name: 'Ernesto Almario | Senior Software Engineer & Web3 Technical Lead',
      description:
        'Portfolio of Ernesto Almario, a Senior Software Engineer and Web3 Technical Lead building full-stack products, blockchain systems, and reliable cloud platforms.',
      mainEntity: {
        '@id': `${siteUrl}/#person`,
      },
    },
    {
      '@type': 'Person',
      '@id': `${siteUrl}/#person`,
      name: 'Ernesto Almario',
      url: siteUrl,
      image: `${siteUrl}/opengraph-image.png`,
      jobTitle: ['Senior Software Engineer', 'Web3 Technical Lead'],
      description:
        'Senior Software Engineer and Web3 Technical Lead specializing in Next.js, Angular, NestJS, Laravel, Rust, Substrate, and cloud platform operations.',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Cebu City',
        addressCountry: 'PH',
      },
      knowsAbout: [
        'Full-stack web development',
        'Web3',
        'Next.js',
        'Angular',
        'NestJS',
        'Laravel',
        'Rust',
        'Substrate',
        'Smart contracts',
        'Cloud infrastructure',
        'Technical leadership',
        'Mobile application quality assurance',
      ],
      sameAs: [
        'https://github.com/ernesr456',
        'https://www.linkedin.com/in/ernesto-almario-jr-4a9162191/',
        'https://x.com/AlmarioErn81564',
      ],
    },
  ],
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, '\\u003c'),
        }}
      />
      <main className="bg-background min-h-screen overflow-x-hidden">
        <Header />
        <HeroSection />
        <ProjectsSection />
        <SkillsSection />
        <ExperienceSection />
        <ContactSection />
        <Footer />
      </main>
    </>
  )
}
