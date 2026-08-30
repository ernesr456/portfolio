'use client'

import React, { useEffect, useRef } from 'react'
import AppImage from '@/components/UI/AppImage'
import Icon from '@/components/UI/AppIcon'
import heroPlaceholder from '@/assets/images/hero-placeholder.png'
import heroWeb3Engineer from '@/assets/images/hero-web3-engineer.jpg'

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const section = sectionRef.current
      if (!section) return
      const rect = section.getBoundingClientRect()
      const mx = (e.clientX - rect.left) / rect.width - 0.5
      const my = (e.clientY - rect.top) / rect.height - 0.5
      const blobs = section.querySelectorAll<HTMLElement>('[data-parallax]')
      blobs.forEach((blob) => {
        const speed = parseFloat(blob.dataset.parallax || '1')
        blob.style.transform = `translate(${mx * 40 * speed}px, ${my * 30 * speed}px)`
      })
    }
    const section = sectionRef.current
    section?.addEventListener('mousemove', handleMouseMove)
    return () => section?.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden px-4 pt-28 pb-16 sm:px-8"
    >
      {/* Atmospheric background blobs */}
      <div
        data-parallax="0.4"
        className="blob-teal pointer-events-none absolute top-1/4 left-1/4 h-[500px] w-[500px]"
        style={{ transition: 'transform 0.3s ease-out' }}
      />

      <div
        data-parallax="0.6"
        className="blob-purple pointer-events-none absolute right-1/4 bottom-1/4 h-[400px] w-[400px]"
        style={{ transition: 'transform 0.3s ease-out' }}
      />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Left column - Identity */}
        <div className="flex flex-col gap-7 lg:col-span-5">
          {/* Availability badge */}
          <div className="glass-card border-border inline-flex items-center gap-2.5 self-start rounded-full border px-3.5 py-1.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping-dot bg-primary absolute inline-flex h-full w-full rounded-full opacity-75" />
              <span className="bg-primary relative inline-flex h-2 w-2 rounded-full" />
            </span>
            <span className="section-label">Available for new opportunities</span>
          </div>

          {/* Name & title */}
          <div className="flex flex-col gap-3">
            <h1 className="text-foreground text-5xl leading-[1.05] font-bold tracking-tight sm:text-6xl">
              Ernesto
              <br />
              <span className="text-gradient-teal">Almario</span>
            </h1>
            <p className="text-muted-foreground text-lg font-medium tracking-wide">
              Senior Software Engineer <span className="text-border">&middot;</span> Web3 Engineer
            </p>
          </div>

          {/* Summary */}
          <p className="text-muted-foreground max-w-md text-base leading-relaxed font-light">
            Technical lead and senior full-stack engineer with 4+ years of experience building
            high-performance applications, modular platforms, Web3 systems, and reliable cloud
            infrastructure while guiding cross-functional teams.
          </p>

          {/* Tech chips */}
          <div className="flex flex-wrap gap-2">
            {['Angular', 'Next.js', 'NestJS', 'Rust (ink!)', 'Laravel', 'AWS', 'Web3'].map(
              (tech) => (
                <span
                  key={tech}
                  className={`tech-chip ${['Rust (ink!)', 'Web3'].includes(tech) ? 'tech-chip-purple' : ''}`}
                >
                  {tech}
                </span>
              ),
            )}
          </div>

          {/* CTAs */}
          <div className="mt-1 flex flex-col gap-3 sm:flex-row">
            <a
              href="#contact"
              className="bg-primary text-primary-foreground teal-glow teal-glow-hover flex items-center justify-center gap-2 rounded-xl px-7 py-3 text-sm font-semibold transition-all duration-200 hover:scale-[1.03]"
            >
              <Icon name="EnvelopeIcon" size={16} />
              Hire Me
            </a>
            <a
              href="#projects"
              className="glass-card border-border text-foreground hover:border-primary/40 flex items-center justify-center gap-2 rounded-xl border px-7 py-3 text-sm font-semibold transition-all duration-200"
            >
              View My Work
              <Icon name="ArrowDownIcon" size={14} className="text-primary" />
            </a>
            <a
              href="/Ernesto-Almario-CV.pdf"
              download
              className="glass-card border-border text-foreground hover:border-primary/40 flex items-center justify-center gap-2 rounded-xl border px-7 py-3 text-sm font-semibold transition-all duration-200"
            >
              <Icon name="DocumentArrowDownIcon" size={16} className="text-primary" />
              Download CV
            </a>
          </div>

          {/* Social proof row */}
          <div className="border-border flex items-center gap-5 border-t pt-2">
            <div className="flex flex-col gap-0.5">
              <span className="text-foreground text-xl font-bold">4+</span>
              <span className="text-muted-foreground text-xs">Years exp.</span>
            </div>
            <div className="bg-border h-8 w-px" />
            <div className="flex flex-col gap-0.5">
              <span className="text-foreground text-xl font-bold">4</span>
              <span className="text-muted-foreground text-xs">Shipped products</span>
            </div>
            <div className="bg-border h-8 w-px" />
            <div className="flex flex-col gap-0.5">
              <span className="text-foreground text-xl font-bold">4</span>
              <span className="text-muted-foreground text-xs">Companies</span>
            </div>
          </div>
        </div>

        {/* Right column - Visual bento */}
        <div className="relative hidden h-[580px] lg:col-span-7 lg:block">
          <div className="grid h-full w-full grid-cols-12 grid-rows-6 gap-3">
            {/* Tall main photo - col 1-5, all 6 rows */}
            <div className="group relative col-span-5 row-span-6 cursor-default overflow-hidden rounded-3xl shadow-2xl">
              <AppImage
                src="https://images.unsplash.com/photo-1623479322729-28b25c16b011"
                alt="Developer at dual monitors in dark office, blue ambient lighting, focused coding environment"
                fill
                sizes="(min-width: 1024px) 22vw, 1px"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="text-foreground absolute bottom-5 left-5">
                <p className="section-label mb-1">Location</p>
                <p className="text-sm font-semibold">Cebu City, Philippines</p>
              </div>
            </div>

            {/* Top right - wide photo, col 6-12, rows 1-3 */}
            <div className="group relative col-span-7 row-span-3 cursor-default overflow-hidden rounded-3xl shadow-2xl">
              <AppImage
                src={heroWeb3Engineer}
                alt="Web3 blockchain network visualization, glowing nodes and connections, dark background, blue and teal light"
                fill
                sizes="(min-width: 1024px) 32vw, 1px"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
              <div className="glass-card border-border absolute top-4 left-4 flex items-center gap-2 rounded-full border px-3 py-1.5">
                <span className="bg-primary h-2 w-2 rounded-full" />
                <span className="text-foreground text-xs font-semibold">Web3 Engineer</span>
              </div>
            </div>

            {/* Bottom right photo - col 6-9, rows 4-6 */}
            <div className="group relative col-span-4 row-span-3 cursor-default overflow-hidden rounded-3xl shadow-2xl">
              <AppImage
                src={heroPlaceholder}
                alt="Code editor with colorful syntax highlighting, dark theme, JavaScript or TypeScript code visible"
                fill
                sizes="(min-width: 1024px) 18vw, 1px"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            </div>

            {/* Rotating circle element - col 10-12, rows 4-6 */}
            <div className="relative col-span-3 row-span-3 flex items-center justify-center">
              <div className="relative flex h-32 w-32 items-center justify-center">
                <svg
                  className="animate-spin-slow text-muted-foreground absolute inset-0 h-full w-full overflow-visible"
                  viewBox="0 0 100 100"
                >
                  <path id="heroCirclePath" d="M 50 7 A 43 43 0 1 1 49.9 7" fill="none" />
                  <text fontSize="7" fontWeight="700" letterSpacing="1.5" fill="currentColor">
                    <textPath href="#heroCirclePath" startOffset="50%" textAnchor="middle">
                      FULL STACK &bull; DAPPS &bull; RUST &bull; SMART CONTRACT &bull; BUILD &bull;
                    </textPath>
                  </text>
                </svg>
                <div className="bg-primary teal-glow z-10 flex h-16 w-16 items-center justify-center rounded-full transition-transform duration-200 hover:scale-110">
                  <Icon name="CodeBracketIcon" size={22} className="text-primary-foreground" />
                </div>
              </div>
            </div>
          </div>

          {/* Floating availability card */}
          <div className="glass-card animate-float-card border-border absolute top-[38%] right-[-24px] w-56 rounded-2xl border p-4 shadow-2xl">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
                Open to Work
              </span>
              <Icon name="CheckCircleIcon" size={16} className="text-primary" />
            </div>
            <div className="mb-3 flex items-center gap-3">
              <div className="bg-primary/10 border-primary/20 flex h-9 w-9 items-center justify-center rounded-xl border">
                <Icon name="BriefcaseIcon" size={16} className="text-primary" />
              </div>
              <div>
                <p className="text-foreground text-sm font-semibold">Full-Time / Contract</p>
                <p className="text-muted-foreground text-xs">Remote friendly</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-1.5">
              <span className="tech-chip text-[10px]">Web3</span>
              <span className="tech-chip text-[10px]">Full-Stack</span>
              <span className="tech-chip text-[10px]">Manage</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
