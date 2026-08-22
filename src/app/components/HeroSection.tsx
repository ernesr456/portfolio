'use client';

import React, { useEffect, useRef } from 'react';
import AppImage from '@/components/UI/AppImage';
import Icon from '@/components/UI/AppIcon';
import heroPlaceholder from '@/assets/images/hero-placeholder.png';
import heroWeb3Engineer from '@/assets/images/hero-web3-engineer.jpg'

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const mx = (e.clientX - rect.left) / rect.width - 0.5;
      const my = (e.clientY - rect.top) / rect.height - 0.5;
      const blobs = section.querySelectorAll<HTMLElement>('[data-parallax]');
      blobs.forEach((blob) => {
        const speed = parseFloat(blob.dataset.parallax || '1');
        blob.style.transform = `translate(${mx * 40 * speed}px, ${my * 30 * speed}px)`;
      });
    };
    const section = sectionRef.current;
    section?.addEventListener('mousemove', handleMouseMove);
    return () => section?.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center pt-28 pb-16 px-4 sm:px-8 overflow-hidden">
      
      {/* Atmospheric background blobs */}
      <div
        data-parallax="0.4"
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] blob-teal pointer-events-none"
        style={{ transition: 'transform 0.3s ease-out' }} />
      
      <div
        data-parallax="0.6"
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] blob-purple pointer-events-none"
        style={{ transition: 'transform 0.3s ease-out' }} />
      

      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
        {/* Left column - Identity */}
        <div className="lg:col-span-5 flex flex-col gap-7">
          {/* Availability badge */}
          <div className="inline-flex items-center gap-2.5 self-start glass-card px-3.5 py-1.5 rounded-full border border-border">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping-dot absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            <span className="section-label">Available for new opportunities</span>
          </div>

          {/* Name & title */}
          <div className="flex flex-col gap-3">
            <h1 className="text-5xl sm:text-6xl font-bold tracking-tight leading-[1.05] text-foreground">
              Ernesto<br />
              <span className="text-gradient-teal">Almario</span>
            </h1>
            <p className="text-lg font-medium text-muted-foreground tracking-wide">
              Senior Software Engineer <span className="text-border">&middot;</span> Web3 Engineer
            </p>
          </div>

          {/* Summary */}
          <p className="text-base font-light leading-relaxed text-muted-foreground max-w-md">
            4+ years of full-stack experience, with the last 2 years dedicated to Web3. I build high-performance platforms, Rust ink! smart contracts on Substrate, and modern frontends while leading engineering teams.
          </p>

          {/* Tech chips */}
          <div className="flex flex-wrap gap-2">
            {['Angular', 'Next.js', 'NestJS', 'Rust (ink!)', 'Laravel', 'Web3'].map((tech) =>
            <span key={tech} className={`tech-chip ${['Rust (ink!)', 'Web3'].includes(tech) ? 'tech-chip-purple' : ''}`}>
                {tech}
              </span>
            )}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 mt-1">
            <a
              href="#contact"
              className="flex items-center justify-center gap-2 bg-primary text-primary-foreground px-7 py-3 rounded-xl text-sm font-semibold teal-glow teal-glow-hover transition-all duration-200 hover:scale-[1.03]">
              
              <Icon name="EnvelopeIcon" size={16} />
              Hire Me
            </a>
            <a
              href="#projects"
              className="flex items-center justify-center gap-2 glass-card border border-border px-7 py-3 rounded-xl text-sm font-semibold text-foreground hover:border-primary/40 transition-all duration-200">
              
              View My Work
              <Icon name="ArrowDownIcon" size={14} className="text-primary" />
            </a>
          </div>

          {/* Social proof row */}
          <div className="flex items-center gap-5 pt-2 border-t border-border">
            <div className="flex flex-col gap-0.5">
              <span className="text-xl font-bold text-foreground">4+</span>
              <span className="text-xs text-muted-foreground">Years exp.</span>
            </div>
            <div className="w-px h-8 bg-border" />
            <div className="flex flex-col gap-0.5">
              <span className="text-xl font-bold text-foreground">4</span>
              <span className="text-xs text-muted-foreground">Shipped products</span>
            </div>
            <div className="w-px h-8 bg-border" />
            <div className="flex flex-col gap-0.5">
              <span className="text-xl font-bold text-foreground">3</span>
              <span className="text-xs text-muted-foreground">Companies</span>
            </div>
          </div>
        </div>

        {/* Right column - Visual bento */}
        <div className="lg:col-span-7 relative hidden lg:block h-[580px]">
          <div className="grid grid-cols-12 grid-rows-6 gap-3 h-full w-full">
            {/* Tall main photo - col 1-5, all 6 rows */}
            <div className="col-span-5 row-span-6 rounded-3xl overflow-hidden relative group cursor-default shadow-2xl">
              <AppImage
                src="https://images.unsplash.com/photo-1623479322729-28b25c16b011"
                alt="Developer at dual monitors in dark office, blue ambient lighting, focused coding environment"
                fill
                sizes="(min-width: 1024px) 22vw, 1px"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-5 left-5 text-foreground">
                <p className="section-label mb-1">Location</p>
                <p className="text-sm font-semibold">Cebu City, Philippines</p>
              </div>
            </div>

            {/* Top right - wide photo, col 6-12, rows 1-3 */}
            <div className="col-span-7 row-span-3 rounded-3xl overflow-hidden relative group cursor-default shadow-2xl">
              <AppImage
                src={heroWeb3Engineer}
                alt="Web3 blockchain network visualization, glowing nodes and connections, dark background, blue and teal light"
                fill
                sizes="(min-width: 1024px) 32vw, 1px"
                className="object-cover transition-transform duration-700 group-hover:scale-105" />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
              <div className="absolute top-4 left-4 glass-card px-3 py-1.5 rounded-full flex items-center gap-2 border border-border">
                <span className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-xs font-semibold text-foreground">Web3 Engineer</span>
              </div>
            </div>

            {/* Bottom right photo - col 6-9, rows 4-6 */}
            <div className="col-span-4 row-span-3 rounded-3xl overflow-hidden relative group cursor-default shadow-2xl">
              <AppImage
                src={heroPlaceholder}
                alt="Code editor with colorful syntax highlighting, dark theme, JavaScript or TypeScript code visible"
                fill
                sizes="(min-width: 1024px) 18vw, 1px"
                className="object-cover transition-transform duration-700 group-hover:scale-105" />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            </div>

            {/* Rotating circle element - col 10-12, rows 4-6 */}
            <div className="col-span-3 row-span-3 flex items-center justify-center relative">
              <div className="relative w-32 h-32 flex items-center justify-center">
                <svg className="absolute inset-0 h-full w-full overflow-visible animate-spin-slow text-muted-foreground" viewBox="0 0 100 100">
                  <path id="heroCirclePath" d="M 50 7 A 43 43 0 1 1 49.9 7" fill="none" />
                  <text fontSize="7" fontWeight="700" letterSpacing="1.5" fill="currentColor">
                    <textPath href="#heroCirclePath" startOffset="50%" textAnchor="middle">
                      FULL STACK &bull; DAPPS &bull; RUST &bull; SMART CONTRACT &bull; BUILD &bull;
                    </textPath>
                  </text>
                </svg>
                <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center teal-glow z-10 hover:scale-110 transition-transform duration-200">
                  <Icon name="CodeBracketIcon" size={22} className="text-primary-foreground" />
                </div>
              </div>
            </div>
          </div>

          {/* Floating availability card */}
          <div className="absolute top-[38%] right-[-24px] glass-card p-4 rounded-2xl w-56 shadow-2xl animate-float-card border border-border">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Open to Work</span>
              <Icon name="CheckCircleIcon" size={16} className="text-primary" />
            </div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                <Icon name="BriefcaseIcon" size={16} className="text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">Full-Time / Contract</p>
                <p className="text-xs text-muted-foreground">Remote friendly</p>
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
  );
}
