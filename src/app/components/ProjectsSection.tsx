'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'
import AppImage from '@/components/UI/AppImage'
import Icon from '@/components/UI/AppIcon'
import multiPayXImage from '@/assets/images/MultiPayX.png'
import xGameImage from '@/assets/images/XGame.png'
import NIPTImage from '@/assets/images/NIPT.png'
import HogWildToysImage from '@/assets/images/HogWildToys.png'

const projects = [
  {
    id: 'xgame',
    name: 'XGame',
    subtitle: 'Web3 Gaming Platform',
    company: 'Rak Son OPC',
    duration: 'Jul 2023 - Apr 2026',
    role: 'Platform Manager (Web3)',
    url: 'https://xgame.live/',
    image: xGameImage,
    imageAlt:
      'Dark gaming platform interface with neon accent lights, digital game environment, moody atmospheric lighting',
    description:
      'A Web3 gaming ecosystem combining player onboarding, an NFT marketplace, and Substrate-based smart contracts in a streamlined consumer experience.',
    accentColor: 'primary' as const,
    stack: ['Next.js', 'NestJS', 'Rust (ink!)', 'Substrate', 'PostgreSQL', 'MongoDB', 'Figma'],
    highlights: [
      'Led full product lifecycle across Engineering and Marketing teams',
      'Architected zero-gas NFT Marketplace eliminating Web3 onboarding friction',
      'Deployed Rust-based ink! smart contracts on Substrate with dual DB layers',
      'Designed end-to-end user journeys and high-fidelity interfaces in Figma',
    ],
    featured: true,
  },
  {
    id: 'multipayx',
    name: 'MultipayX',
    subtitle: 'Crypto Payment Gateway & Exchange',
    company: 'Rak Son OPC',
    duration: 'Sep 2025 - Nov 2025',
    role: 'Sr. Software Engineer',
    url: 'https://multipayx.net',
    image: multiPayXImage,
    imageAlt:
      'Cryptocurrency trading interface with charts and data, dark background, teal and blue neon glow',
    description:
      'A multi-chain cryptocurrency payment gateway that helps merchants accept digital assets, audit transactions, and manage onboarding from a real-time dashboard.',
    accentColor: 'accent' as const,
    stack: ['Next.js', 'NestJS', 'TailwindCSS', 'AWS', 'PostgreSQL', 'MongoDB', 'Figma'],
    highlights: [
      'Engineered multi-chain crypto merchant payment system with near-instant finality',
      'Deployed Substrate ink! smart contracts for on-chain transaction verification',
      'Built real-time admin dashboards for transaction auditing and merchant onboarding',
    ],
    featured: true,
  },
  {
    id: 'hogwildtoys',
    name: 'Hog Wild Toys',
    subtitle: 'Wordpress Toy Brand Website.',
    company: 'Fizzbuzz PH',
    duration: 'Sep 2025 - Nov 2025',
    role: 'Sr. Software Engineer',
    url: 'https://hogwildtoys.com',
    image: HogWildToysImage,
    imageAlt:
      'Hog Wild Toys WordPress storefront featuring colorful toys, product collections, and promotional content',
    description:
      'A WordPress-powered e-commerce website showcasing playful toy collections through a responsive storefront, updated product content, and integrated online shopping features.',
    accentColor: 'accent' as const,
    stack: ['Wordpress', 'Elementor', 'PHP', 'JavaScript', 'JQuery', 'Yoast SEO'],
    highlights: [
      'Maintained the WordPress storefront, plugins, themes, and production hosting environment',
      'Managed product catalog updates, promotional content, and responsive page layouts',
      'Applied security patches and supported third-party e-commerce and API integrations',
    ],
    featured: true,
  },
  {
    id: 'nipt',
    name: 'NIPT Diagnostics',
    subtitle: 'Healthcare Portal',
    company: 'Human Incubator',
    duration: 'May 2023 - Jul 2023',
    role: 'Jr. Software Engineer',
    url: 'https://www.hiro-clinic.or.jp',
    image: NIPTImage,
    imageAlt:
      'Medical diagnostic software interface, clinical dashboard with charts, bright clean white and blue environment',
    description:
      'A clinical portal for processing genetic screening data, generating detailed PDF reports, and presenting diagnostic results through reactive dashboards.',
    accentColor: 'primary' as const,
    stack: ['Angular', 'Vue.js', 'Laravel', 'MySQL'],
    highlights: [
      'Maintained high-availability healthcare portal for genetic sequence parsing',
      'Built automated PDF report generation for complex trisomy screenings',
      'Developed real-time reactive clinical dashboards using Laravel background queues',
    ],
    featured: false,
  },
  {
    id: 'wms',
    name: 'Smart WMS & Logistics',
    subtitle: 'Inventory & Logistics Suite',
    company: 'Human Incubator Inc.',
    duration: 'Mar 2022 - Apr 2023',
    role: 'Junior Software Engineer',
    url: undefined,
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_12c9ad037-1774654716550.png',
    imageAlt:
      'Warehouse management system dashboard, logistics software interface, dark industrial warehouse with organized shelving',
    description:
      'An inventory and logistics suite covering shipment arrivals, warehouse transfers, barcode receiving, and IoT-assisted freight weighing.',
    accentColor: 'accent' as const,
    stack: ['Angular', 'Laravel (PHP)', 'MySQL', 'C# WinForms', 'IoT Integration'],
    highlights: [
      'Engineered full supply chain: ETA tracking, dock logging, bin-to-bin transfers',
      'Built barcode scanner receiving engine validating freight against digital manifests',
      'Integrated IoT weighing scale hardware, eliminating manual entry errors',
    ],
    featured: false,
  },
]

type ProjectStatus = 'checking' | 'online' | 'offline'

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [projectStatuses, setProjectStatuses] = useState<Record<string, ProjectStatus>>(
    Object.fromEntries(
      projects.filter((project) => project.url).map((project) => [project.id, 'checking']),
    ),
  )

  const updateProjectStatuses = useCallback(async () => {
    try {
      const response = await fetch('/api/project-status', { cache: 'no-store' })
      if (!response.ok) {
        throw new Error(`Project status check returned ${response.status}.`)
      }

      const data = (await response.json()) as {
        statuses?: Record<string, 'online' | 'offline'>
      }

      if (!data.statuses) {
        throw new Error('Project status response is missing statuses.')
      }

      setProjectStatuses((current) => ({ ...current, ...data.statuses }))
    } catch (error) {
      console.error('Unable to update project statuses.', error)
    }
  }, [])

  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll<HTMLElement>('.project-card')
    if (!cards) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12 },
    )
    cards.forEach((card) => observer.observe(card))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    void updateProjectStatuses()

    const intervalId = window.setInterval(() => {
      void updateProjectStatuses()
    }, 30_000)

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        void updateProjectStatuses()
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      window.clearInterval(intervalId)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [updateProjectStatuses])

  return (
    <section ref={sectionRef} id="projects" className="relative px-4 py-20 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="section-label mb-2 block">Featured Work</span>
            <h2 className="text-foreground text-3xl font-bold tracking-tight sm:text-4xl">
              Shipped Products
            </h2>
          </div>
          <p className="text-muted-foreground max-w-xs text-sm">
            Shipped platforms used by real users - from Web3 gaming to crypto payments.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {projects.map((project, index) => {
            const status = projectStatuses[project.id]

            return (
              <div
                key={project.id}
                className="project-card fade-slide-up animate-on-scroll glass-card glass-card-hover group border-border cursor-default overflow-hidden rounded-3xl border"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="relative h-52 overflow-hidden">
                  <AppImage
                    src={project.image}
                    alt={project.imageAlt}
                    fill
                    sizes="(min-width: 768px) 560px, calc(100vw - 32px)"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="from-card/95 via-card/40 absolute inset-0 bg-gradient-to-t to-transparent" />

                  {project.url && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="glass-card border-border hover:border-primary/40 absolute top-4 right-4 flex items-center gap-1.5 rounded-full border px-3 py-1.5 transition-colors"
                      onClick={(e) => e.stopPropagation()}
                      aria-label={`${project.name} website is ${status}`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          status === 'online'
                            ? 'bg-primary animate-pulse'
                            : status === 'offline'
                              ? 'bg-red-500'
                              : 'bg-muted-foreground animate-pulse'
                        }`}
                      />
                      <span className="text-foreground text-xs font-semibold">
                        {status === 'online'
                          ? 'Online'
                          : status === 'offline'
                            ? 'Offline'
                            : 'Checking'}
                      </span>
                      <Icon
                        name="ArrowTopRightOnSquareIcon"
                        size={12}
                        className="text-muted-foreground"
                      />
                    </a>
                  )}

                  <div className="glass-card border-border absolute top-4 left-4 rounded-full border px-2.5 py-1">
                    <span className="text-muted-foreground text-xs font-medium">
                      {project.company}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-4 p-6">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-foreground text-lg font-bold tracking-tight">
                        {project.name}
                      </h3>
                      <p className="text-muted-foreground text-sm">{project.subtitle}</p>
                    </div>
                    <span className="text-muted-foreground pt-0.5 text-xs whitespace-nowrap">
                      {project.duration}
                    </span>
                  </div>

                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className={`tech-chip ${
                          [
                            'Rust (ink!)',
                            'Substrate',
                            'Polkadot.JS API',
                            'IoT Integration',
                          ].includes(tech)
                            ? 'tech-chip-purple'
                            : ''
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <ul className="flex flex-col gap-2">
                    {project.highlights.map((hl, i) => (
                      <li
                        key={i}
                        className="text-muted-foreground flex items-start gap-2.5 text-sm leading-relaxed"
                      >
                        <span className="bg-primary mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full" />
                        {hl}
                      </li>
                    ))}
                  </ul>

                  <div className="border-border mt-auto flex items-center justify-between border-t pt-2">
                    <div className="flex items-center gap-2">
                      <Icon name="UserIcon" size={14} className="text-muted-foreground" />
                      <span className="text-muted-foreground text-xs font-medium">
                        {project.role}
                      </span>
                    </div>
                    {project.url ? (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-foreground flex items-center gap-1.5 text-xs font-semibold transition-colors"
                      >
                        View Project
                        <Icon name="ArrowRightIcon" size={12} />
                      </a>
                    ) : (
                      <span className="text-muted-foreground text-xs italic">
                        Private / Internal
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
