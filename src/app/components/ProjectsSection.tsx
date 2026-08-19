'use client';

import React, { useEffect, useRef } from 'react';
import AppImage from '@/components/UI/AppImage';
import Icon from '@/components/UI/AppIcon';

const projects = [
{
  id: 'xgame',
  name: 'XGame',
  subtitle: 'Web3 Gaming Platform',
  company: 'Rak Son OPC',
  duration: 'Jul 2023 - Apr 2026',
  role: 'Platform Manager (Web3)',
  url: 'https://xgame.live/',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_14cb9eeb0-1772449226427.png",
  imageAlt: 'Dark gaming platform interface with neon accent lights, digital game environment, moody atmospheric lighting',
  accentColor: 'primary' as const,
  stack: ['Next.js', 'NestJS', 'Rust (ink!)', 'Substrate', 'PostgreSQL', 'MongoDB', 'Figma'],
  highlights: [
  'Led full product lifecycle across Engineering and Marketing teams',
  'Architected zero-gas NFT Marketplace eliminating Web3 onboarding friction',
  'Deployed Rust-based ink! smart contracts on Substrate with dual DB layers',
  'Designed end-to-end user journeys and high-fidelity interfaces in Figma'],

  featured: true
},
{
  id: 'multipayx',
  name: 'MultipayX',
  subtitle: 'Crypto Payment Gateway & Exchange',
  company: 'Rak Son OPC',
  duration: 'Sep 2025 - Nov 2025',
  role: 'Senior Software Engineer',
  url: 'https://multipayx.net/',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1378307c2-1767038173433.png",
  imageAlt: 'Cryptocurrency trading interface with charts and data, dark background, teal and blue neon glow',
  accentColor: 'accent' as const,
  stack: ['NestJS', 'Next.js', 'MySQL', 'PostgreSQL', 'Rust (ink!)', 'Polkadot.JS API'],
  highlights: [
  'Engineered multi-chain crypto merchant payment system with near-instant finality',
  'Deployed Substrate ink! smart contracts for on-chain transaction verification',
  'Built real-time admin dashboards for transaction auditing and merchant onboarding'],

  featured: true
},
{
  id: 'nipt',
  name: 'NIPT Diagnostics',
  subtitle: 'Healthcare Portal',
  company: 'Human Incubator',
  duration: 'May 2023 - Jul 2023',
  role: 'Jr. Software Engineer',
  url: 'https://www.hiro-clinic.or.jp/',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1644aff77-1764659451775.png",
  imageAlt: 'Medical diagnostic software interface, clinical dashboard with charts, bright clean white and blue environment',
  accentColor: 'primary' as const,
  stack: ['Angular', 'Vue.js', 'Laravel', 'MySQL'],
  highlights: [
  'Maintained high-availability healthcare portal for genetic sequence parsing',
  'Built automated PDF report generation for complex trisomy screenings',
  'Developed real-time reactive clinical dashboards using Laravel background queues'],

  featured: false
},
{
  id: 'wms',
  name: 'Smart WMS & Logistics',
  subtitle: 'Inventory & Logistics Suite',
  company: 'Human Incubator Inc.',
  duration: 'Mar 2022 - Apr 2023',
  role: 'Junior Software Engineer',
  url: undefined,
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_12c9ad037-1774654716550.png",
  imageAlt: 'Warehouse management system dashboard, logistics software interface, dark industrial warehouse with organized shelving',
  accentColor: 'accent' as const,
  stack: ['Angular', 'Laravel (PHP)', 'MySQL', 'C# WinForms', 'IoT Integration'],
  highlights: [
  'Engineered full supply chain: ETA tracking, dock logging, bin-to-bin transfers',
  'Built barcode scanner receiving engine validating freight against digital manifests',
  'Integrated IoT weighing scale hardware, eliminating manual entry errors'],

  featured: false
}];


export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll<HTMLElement>('.project-card');
    if (!cards) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="projects" className="py-20 px-4 sm:px-8 relative">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <span className="section-label block mb-2">Featured Work</span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
              Shipped Products
            </h2>
          </div>
          <p className="text-sm text-muted-foreground max-w-xs">
            Live platforms used by real users - from Web3 gaming to crypto payments.
          </p>
        </div>

        {/* Projects grid - 2 cols desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) =>
          <div
            key={project.id}
            className="project-card fade-slide-up animate-on-scroll glass-card glass-card-hover rounded-3xl overflow-hidden group cursor-default border border-border"
            style={{ transitionDelay: `${index * 100}ms` }}>
            
              {/* Image */}
              <div className="relative h-52 overflow-hidden">
                <AppImage
                src={project.image}
                alt={project.imageAlt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105" />
              
                <div className="absolute inset-0 bg-gradient-to-t from-card/95 via-card/40 to-transparent" />

                {/* Live badge */}
                {project.url &&
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute top-4 right-4 flex items-center gap-1.5 glass-card px-3 py-1.5 rounded-full border border-border hover:border-primary/40 transition-colors"
                onClick={(e) => e.stopPropagation()}
                aria-label={`View ${project.name} live`}>
                
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                    <span className="text-xs font-semibold text-foreground">Live</span>
                    <Icon name="ArrowTopRightOnSquareIcon" size={12} className="text-muted-foreground" />
                  </a>
              }

                {/* Company badge */}
                <div className="absolute top-4 left-4 glass-card px-2.5 py-1 rounded-full border border-border">
                  <span className="text-xs font-medium text-muted-foreground">{project.company}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col gap-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-bold text-foreground tracking-tight">{project.name}</h3>
                    <p className="text-sm text-muted-foreground">{project.subtitle}</p>
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap pt-0.5">{project.duration}</span>
                </div>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-1.5">
                  {project.stack.map((tech) =>
                <span
                  key={tech}
                  className={`tech-chip ${['Rust (ink!)', 'Substrate', 'Polkadot.JS API', 'IoT Integration'].includes(tech) ? 'tech-chip-purple' : ''}`}>
                  
                      {tech}
                    </span>
                )}
                </div>

                {/* Highlights */}
                <ul className="flex flex-col gap-2">
                  {project.highlights.map((hl, i) =>
                <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground leading-relaxed">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                      {hl}
                    </li>
                )}
                </ul>

                {/* Role + CTA */}
                <div className="flex items-center justify-between pt-2 border-t border-border mt-auto">
                  <div className="flex items-center gap-2">
                    <Icon name="UserIcon" size={14} className="text-muted-foreground" />
                    <span className="text-xs text-muted-foreground font-medium">{project.role}</span>
                  </div>
                  {project.url ?
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-foreground transition-colors">
                  
                      View Project
                      <Icon name="ArrowRightIcon" size={12} />
                    </a> :

                <span className="text-xs text-muted-foreground italic">Private / Internal</span>
                }
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
