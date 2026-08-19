'use client';

import React, { useEffect, useRef } from 'react';
import Icon from '@/components/UI/AppIcon';

const experiences = [
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
    side: 'left',
  },
  {
    id: 'blockspace',
    role: 'Senior Software Engineer',
    company: 'Blockspace Corporation',
    companyUrl: 'https://blockspacecorp.com',
    duration: 'Jul 2023 - Jul 2024',
    period: '1 yr',
    type: 'Full-Time',
    stack: ['Angular', 'Fastify (Node.js)', 'MySQL', 'Prisma ORM', 'Polkadot APIs'],
    responsibilities: [
      'Developed high-throughput web apps using Angular, Fastify, MySQL, Prisma ORM, and Polkadot APIs',
      'Delivered regular technical status updates and architecture walkthroughs to primary client (RAK SON OPC)',
      'Designed end-to-end ERDs and relational database schemas tailored to client requirements',
      'Mentored junior developers through structured code reviews; facilitated Agile/Scrum sprint cycles',
      'Enforced TDD practices and comprehensive unit testing for high application reliability',
      'Crafted user flows, wireframes, and UI designs in Figma to align client visions pre-execution',
    ],
    side: 'right',
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
    side: 'left',
  },
];

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const items = sectionRef?.current?.querySelectorAll<HTMLElement>('.exp-card');
    if (!items) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    items?.forEach((item) => observer?.observe(item));
    return () => observer?.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="experience" className="py-20 px-4 sm:px-8 relative">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14">
          <div>
            <span className="section-label block mb-2">Career History</span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
              Work Experience
            </h2>
          </div>
          <div className="flex items-center gap-2 glass-card px-4 py-2 rounded-full border border-border self-start sm:self-auto">
            <Icon name="CalendarDaysIcon" size={14} className="text-primary" />
            <span className="text-sm font-medium text-muted-foreground">4+ years total</span>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Center line - hidden on mobile */}
          <div className="hidden md:block timeline-line" />

          <div className="flex flex-col gap-10">
            {experiences?.map((exp, index) => (
              <div
                key={exp?.id}
                className={`exp-card fade-slide-up animate-on-scroll relative grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 ${
                  exp?.side === 'right' ? 'md:direction-rtl' : ''
                }`}
                style={{ transitionDelay: `${index * 120}ms` }}
              >
                {/* Center dot - desktop */}
                <div className="hidden md:flex absolute left-1/2 top-6 -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-2 border-background z-10 teal-glow" />

                {/* Card - always left col on mobile; alternates on desktop */}
                <div
                  className={`glass-card glass-card-hover rounded-3xl border border-border p-6 flex flex-col gap-4 ${
                    exp?.side === 'right' ? 'md:col-start-2' : 'md:col-start-1'
                  }`}
                >
                  {/* Header */}
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-base font-bold text-foreground leading-tight">{exp?.role}</h3>
                      <a
                        href={exp?.companyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-primary hover:text-foreground transition-colors flex items-center gap-1 mt-0.5"
                      >
                        {exp?.company}
                        <Icon name="ArrowTopRightOnSquareIcon" size={11} />
                      </a>
                    </div>
                    <div className="flex flex-col items-end gap-1 flex-shrink-0">
                      <span className="text-xs font-semibold text-muted-foreground">{exp?.duration}</span>
                      <span className="tech-chip text-[10px]">{exp?.period}</span>
                    </div>
                  </div>

                  {/* Stack chips */}
                  <div className="flex flex-wrap gap-1.5">
                    {exp?.stack?.map((tech) => (
                      <span
                        key={tech}
                        className={`tech-chip ${['Rust (ink!)', 'Substrate', 'Polkadot APIs', 'C# WinForms']?.includes(tech) ? 'tech-chip-purple' : ''}`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Responsibilities */}
                  <ul className="flex flex-col gap-2">
                    {exp?.responsibilities?.map((r, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground leading-relaxed">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary/60 flex-shrink-0" />
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Spacer for the other column - desktop only */}
                {exp?.side === 'left' && <div className="hidden md:block md:col-start-2" />}
                {exp?.side === 'right' && <div className="hidden md:block md:col-start-1 md:row-start-1" />}
              </div>
            ))}
          </div>

          {/* Education card */}
          <div className="mt-10 exp-card fade-slide-up animate-on-scroll" style={{ transitionDelay: '360ms' }}>
            <div className="relative md:w-1/2 mx-auto glass-card rounded-3xl border border-border p-6 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center flex-shrink-0">
                <Icon name="AcademicCapIcon" size={18} className="text-accent" />
              </div>
              <div>
                <p className="section-label mb-1">Education</p>
                <h3 className="text-base font-bold text-foreground">BS Information Technology</h3>
                <p className="text-sm text-muted-foreground mt-0.5">Cebu Eastern College &middot; 2015 - 2019</p>
                <p className="text-xs text-muted-foreground mt-1">Leon Kilat St., Cebu City, Philippines</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
