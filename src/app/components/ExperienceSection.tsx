'use client'

import React, { useEffect, useRef } from 'react'
import Icon from '@/components/UI/AppIcon'

const experiences = [
  {
    id: 'fizzbuzz',
    role: 'Sr. Software Engineer (Freelance)',
    company: 'FizzBuzz PH',
    companyUrl: 'https://www.fizzbuzz.ph',
    duration: 'Mar 2025 - Present',
    period: 'Ongoing',
    type: 'Freelance',
    stack: ['AWS', 'Bluehost', 'Firebase', 'WordPress', 'DNS', 'Unity QA'],
    responsibilities: [
      'Monitor and maintain cloud infrastructure, hosting environments, server health, and database operations across AWS, Bluehost, and Firebase',
      'Administer enterprise domains and DNS across GoDaddy and Network Solutions, ensuring reliable routing, renewals, and secure access',
      'Audit Apple App Store Connect and Google Play Console accounts for stability, compliance alerts, and crash reports',
      'Maintain WordPress infrastructure through security patches, catalog updates, and third-party API integrations',
      'Build internal QR code, barcode generation, and product asset tracking utilities',
      'Perform cross-platform QA for Unity mobile applications on iOS and Android, documenting performance and release issues',
    ],
    side: 'left',
  },
  {
    id: 'rakson-manager',
    role: 'Platform Engineer Manager (Web3)',
    company: 'RAK SON OPC',
    companyUrl: 'https://rocksontech.com',
    duration: 'Aug 2024 - Apr 2026',
    period: '~1 yr 8 mo',
    type: 'Full-Time',
    stack: ['Angular', 'Next.js', 'NestJS', 'Rust (ink!)', 'Substrate', 'Figma'],
    responsibilities: [
      'Directed engineering for hybrid Web3 gaming platform; led cross-functional dev and design teams',
      'Conducted Web2-to-Web3 market research modeling friction-free onboarding with zero-gas token economics',
      'Represented company at major tech and industrial conferences, building ecosystem partnerships',
      'Managed end-to-end project planning, resource mapping, and budget allocation for executive stakeholders',
      'Standardized modular monolith boundary patterns, ERDs, and domain contracts across projects',
      'Engineered Angular/Next.js frontends + NestJS backends + Rust ink! smart contracts on Substrate',
    ],
    side: 'right',
  },
  {
    id: 'blockspace',
    role: 'Senior Software Engineer (Web3)',
    company: 'Blockspace Corporation',
    companyUrl: 'https://blockspacecorp.com',
    duration: 'Jul 2023 - Jul 2024',
    period: '1 yr',
    type: 'Full-Time',
    stack: ['Angular', 'Fastify (Node.js)', 'MySQL', 'Prisma ORM', 'Polkadot APIs', 'Figma'],
    responsibilities: [
      'Pioneered entry into Web3 engineering by architecting dApps and high-throughput applications integrated with Polkadot APIs',
      'Delivered regular technical status updates and architecture walkthroughs to primary client (RAK SON OPC)',
      'Led technical walkthroughs, Web3 architecture presentations, and milestone updates for primary client RAK SON OPC',
      'Designed end-to-end ERDs and relational database schemas optimized for Web3 transaction logging and state tracking',
      'Mentored junior engineers on Web3 integration patterns, clean code practices, and Agile/Scrum sprint workflows',
      'Enforced TDD practices and unit testing across API services to guarantee Web3 application reliability and data integrity',
      'Crafted Web3 user flows, dApp onboarding wireframes, and UI prototypes in Figma to streamline the user experience prior to execution',
    ],
    side: 'left',
  },
  {
    id: 'humanincubator',
    role: 'Junior Software Engineer',
    company: 'Human Incubator',
    companyUrl: 'https://humedit.ph',
    duration: 'Mar 2022 - Jul 2023',
    period: '1 yr 4 mo',
    type: 'Full-Time',
    stack: ['Laravel (PHP)', 'Angular', 'Vue.js', 'Node.js', 'C# WinForms', 'Figma'],
    responsibilities: [
      'Developed responsive web apps using PHP (Laravel), Angular, Node.js, and Vue.js',
      'Engineered C# Windows Forms desktop app to interface with IoT weight scale hardware',
      'Translated product requirements into interactive wireframes and high-fidelity Figma prototypes',
      'Authored comprehensive automated unit tests in Agile environment, reducing production defects',
    ],
    side: 'right',
  },
]

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const items = sectionRef?.current?.querySelectorAll<HTMLElement>('.exp-card')
    if (!items) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 },
    )
    items?.forEach((item) => observer?.observe(item))
    return () => observer?.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="experience" className="relative px-4 py-20 sm:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-14 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="section-label mb-2 block">Career History</span>
            <h2 className="text-foreground text-3xl font-bold tracking-tight sm:text-4xl">
              Work Experience
            </h2>
          </div>
          <div className="glass-card border-border flex items-center gap-2 self-start rounded-full border px-4 py-2 sm:self-auto">
            <Icon name="CalendarDaysIcon" size={14} className="text-primary" />
            <span className="text-muted-foreground text-sm font-medium">4+ years total</span>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative">
          <div className="relative">
            {/* Center line - hidden on mobile */}
            <div className="timeline-line hidden md:block" />

            <div className="flex flex-col gap-10">
              {experiences?.map((exp, index) => (
                <div
                  key={exp?.id}
                  className={`exp-card fade-slide-up animate-on-scroll relative grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-10 ${
                    exp?.side === 'right' ? 'md:direction-rtl' : ''
                  }`}
                  style={{ transitionDelay: `${index * 120}ms` }}
                >
                  {/* Center dot - desktop */}
                  <div className="bg-primary border-background teal-glow absolute top-6 left-1/2 z-10 hidden h-4 w-4 -translate-x-1/2 rounded-full border-2 md:flex" />

                  {/* Card - always left col on mobile; alternates on desktop */}
                  <div
                    className={`glass-card glass-card-hover border-border flex flex-col gap-4 rounded-3xl border p-6 ${
                      exp?.side === 'right' ? 'md:col-start-2' : 'md:col-start-1'
                    }`}
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-foreground text-base leading-tight font-bold">
                          {exp?.role}
                        </h3>
                        <a
                          href={exp?.companyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:text-foreground mt-0.5 flex items-center gap-1 text-sm font-medium transition-colors"
                        >
                          {exp?.company}
                          <Icon name="ArrowTopRightOnSquareIcon" size={11} />
                        </a>
                      </div>
                      <div className="flex flex-shrink-0 flex-col items-end gap-1">
                        <span className="text-muted-foreground text-xs font-semibold">
                          {exp?.duration}
                        </span>
                        <span className="tech-chip text-[10px]">{exp?.period}</span>
                      </div>
                    </div>

                    {/* Stack chips */}
                    <div className="flex flex-wrap gap-1.5">
                      {exp?.stack?.map((tech) => (
                        <span
                          key={tech}
                          className={`tech-chip ${['Rust (ink!)', 'Substrate', 'Polkadot APIs', 'C# WinForms', 'Unity QA']?.includes(tech) ? 'tech-chip-purple' : ''}`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Responsibilities */}
                    <ul className="flex flex-col gap-2">
                      {exp?.responsibilities?.map((r, i) => (
                        <li
                          key={i}
                          className="text-muted-foreground flex items-start gap-2.5 text-sm leading-relaxed"
                        >
                          <span className="bg-primary/60 mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full" />
                          {r}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Spacer for the other column - desktop only */}
                  {exp?.side === 'left' && <div className="hidden md:col-start-2 md:block" />}
                  {exp?.side === 'right' && (
                    <div className="hidden md:col-start-1 md:row-start-1 md:block" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Education card */}
          <div
            className="exp-card fade-slide-up animate-on-scroll mt-10"
            style={{ transitionDelay: '480ms' }}
          >
            <div className="glass-card border-border relative mx-auto flex items-start gap-4 rounded-3xl border p-6 md:w-1/2">
              <div className="bg-accent/10 border-accent/20 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border">
                <Icon name="AcademicCapIcon" size={18} className="text-accent" />
              </div>
              <div>
                <p className="section-label mb-1">Education</p>
                <h3 className="text-foreground text-base font-bold">BS Information Technology</h3>
                <p className="text-muted-foreground mt-0.5 text-sm">
                  Cebu Eastern College &middot; 2015 - 2019
                </p>
                <p className="text-muted-foreground mt-1 text-xs">
                  Leon Kilat St., Cebu City, Philippines
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
