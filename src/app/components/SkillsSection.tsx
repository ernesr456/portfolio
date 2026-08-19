'use client';

import React, { useState, useEffect, useRef } from 'react';
import Icon from '@/components/UI/AppIcon';

type SkillItem = { name: string; level: number };
type SkillCategory = { label: string; icon: string; skills: SkillItem[] };

const skillCategories: SkillCategory[] = [
  {
    label: 'Front-End',
    icon: 'ComputerDesktopIcon',
    skills: [
      { name: 'Next.js (React)', level: 4 },
      { name: 'Angular', level: 4 },
      { name: 'Tailwind CSS', level: 4 },
      { name: 'Bootstrap', level: 4 },
      { name: 'Shadcn UI', level: 5 },
      { name: 'VueJS', level: 3 },
    ],
  },
  {
    label: 'Back-End',
    icon: 'ServerIcon',
    skills: [
      { name: 'NestJS (Node.JS)', level: 4 },
      { name: 'Laravel (PHP)', level: 4 },
      { name: 'Fastify (Node.JS)', level: 3 },
      { name: 'Rust', level: 3 },
      { name: 'C#', level: 2 },
      { name: 'Java', level: 2 },
    ],
  },
  {
    label: 'Web3',
    icon: 'CubeTransparentIcon',
    skills: [
      { name: 'Rust (ink! Framework)', level: 3 },
      { name: 'Substrate', level: 3 },
      { name: 'Polkadot.JS API', level: 3 },
      { name: 'Smart Contracts', level: 3 },
      { name: 'Wallet Integration', level: 3 },
      { name: 'dApps & NFT Logic', level: 3 },
    ],
  },
  {
    label: 'Databases',
    icon: 'CircleStackIcon',
    skills: [
      { name: 'Prisma ORM', level: 4 },
      { name: 'MariaDB (MySQL)', level: 4 },
      { name: 'MongoDB (NoSQL)', level: 3 },
      { name: 'PostgreSQL', level: 3 },
    ],
  },
  {
    label: 'Design & QA',
    icon: 'PaintBrushIcon',
    skills: [
      { name: 'Figma', level: 4 },
      { name: 'Manual Testing', level: 4 },
      { name: 'Debugging', level: 4 },
      { name: 'Unit Testing', level: 3 },
      { name: 'Canva', level: 3 },
      { name: 'Adobe Photoshop', level: 2 },
    ],
  },
  {
    label: 'Leadership',
    icon: 'UsersIcon',
    skills: [
      { name: 'Documentation', level: 4 },
      { name: 'Git / GitHub', level: 4 },
      { name: 'Collaboration', level: 4 },
      { name: 'Agile / Scrum', level: 3 },
      { name: 'Project Planning', level: 3 },
      { name: 'Decision-making', level: 3 },
    ],
  },
  {
    label: 'AI & Operations',
    icon: 'UsersIcon',
    skills: [
      { name: 'Documentation', level: 4 },
      { name: 'Git / GitHub', level: 4 },
      { name: 'Collaboration', level: 4 },
      { name: 'Agile / Scrum', level: 3 },
      { name: 'Project Planning', level: 3 },
      { name: 'Decision-making', level: 3 },
    ],
  },
];

function SkillDots({ level, max = 5 }: { level: number; max?: number }) {
  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: max }).map((_, i) => (
        <span key={i} className={i < level ? 'dot-filled' : 'dot-empty'} />
      ))}
    </div>
  );
}

export default function SkillsSection() {
  const [activeTab, setActiveTab] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.querySelectorAll<HTMLElement>('.skill-row').forEach((row, i) => {
              setTimeout(() => row.classList.add('visible'), i * 50);
            });
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [activeTab]);

  const active = skillCategories[activeTab];

  return (
    <section ref={sectionRef} id="skills" className="py-20 px-4 sm:px-8 relative">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="section-label block mb-2">Technical Proficiency</span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
              Skills & Stack
            </h2>
          </div>
          <p className="text-sm text-muted-foreground max-w-xs">
            Proficiency rated 1-5 across 6 engineering domains.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Tab navigation - left column on desktop */}
          <div className="lg:col-span-1 flex flex-row lg:flex-col gap-2 overflow-x-auto pb-1 lg:pb-0 lg:overflow-visible">
            {skillCategories.map((cat, i) => (
              <button
                key={cat.label}
                onClick={() => setActiveTab(i)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 whitespace-nowrap border ${
                  activeTab === i
                    ? 'bg-primary/10 border-primary/30 text-primary teal-glow' :'glass-card border-border text-muted-foreground hover:text-foreground hover:border-primary/20'
                }`}
              >
                <Icon name={cat.icon as Parameters<typeof Icon>[0]['name']} size={16} />
                {cat.label}
              </button>
            ))}
          </div>

          {/* Skills panel - right 2 cols */}
          <div className="lg:col-span-2 glass-card rounded-3xl border border-border p-6">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border">
              <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                <Icon name={active.icon as Parameters<typeof Icon>[0]['name']} size={18} className="text-primary" />
              </div>
              <div>
                <h3 className="text-base font-bold text-foreground">{active.label}</h3>
                <p className="text-xs text-muted-foreground">{active.skills.length} skills</p>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              {active.skills.map((skill, i) => (
                <div
                  key={skill.name}
                  className="skill-row fade-slide-up animate-on-scroll flex items-center justify-between py-2.5 px-3 rounded-xl hover:bg-muted/40 transition-colors"
                  style={{ transitionDelay: `${i * 50}ms` }}
                >
                  <span className="text-sm font-medium text-foreground">{skill.name}</span>
                  <SkillDots level={skill.level} />
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="mt-5 pt-4 border-t border-border flex items-center gap-4 flex-wrap">
              <span className="text-xs text-muted-foreground">Proficiency:</span>
              {[1, 2, 3, 4, 5].map((n) => (
                <div key={n} className="flex items-center gap-1.5">
                  <SkillDots level={n} max={5} />
                  <span className="text-xs text-muted-foreground">
                    {n === 1 ? 'Basic' : n === 2 ? 'Familiar' : n === 3 ? 'Proficient' : n === 4 ? 'Advanced' : 'Expert'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
