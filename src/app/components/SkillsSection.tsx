'use client'

import React, { useState, useEffect, useRef } from 'react'
import Icon from '@/components/UI/AppIcon'

type SkillItem = { name: string; level: number }
type SkillCategory = { label: string; icon: string; skills: SkillItem[] }

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
      { name: 'C++', level: 2 },
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
      { name: 'Mongoose', level: 3 },
      { name: 'PostgreSQL', level: 3 },
      { name: 'Supabase', level: 3 },
    ],
  },
  {
    label: 'Cloud & Platforms',
    icon: 'CloudIcon',
    skills: [
      { name: 'AWS / Amazon S3', level: 3 },
      { name: 'Firebase', level: 3 },
      { name: 'Vercel', level: 4 },
      { name: 'Bluehost / WordPress', level: 3 },
      { name: 'Domain & DNS Administration', level: 3 },
      { name: 'CI/CD Workflows', level: 3 },
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
      { name: 'Mobile App & Unity QA', level: 3 },
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
      { name: 'Budgeting & Coordination', level: 3 },
      { name: 'Decision-making', level: 3 },
    ],
  },
  {
    label: 'AI & Productivity Tools',
    icon: 'CpuChipIcon',
    skills: [
      { name: 'Gemini AI', level: 3 },
      { name: 'GitHub Copilot Chat', level: 3 },
      { name: 'Technical Documentation', level: 4 },
      { name: 'Code Refactoring', level: 4 },
      { name: 'Automated Unit Testing', level: 3 },
      { name: 'Debugging & Optimization', level: 4 },
    ],
  },
]

function SkillDots({ level, max = 5 }: { level: number; max?: number }) {
  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: max }).map((_, i) => (
        <span key={i} className={i < level ? 'dot-filled' : 'dot-empty'} />
      ))}
    </div>
  )
}

export default function SkillsSection() {
  const [activeTab, setActiveTab] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.querySelectorAll<HTMLElement>('.skill-row').forEach((row, i) => {
              setTimeout(() => row.classList.add('visible'), i * 50)
            })
            observer.unobserve(el)
          }
        })
      },
      { threshold: 0.1 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [activeTab])

  const active = skillCategories[activeTab]

  return (
    <section ref={sectionRef} id="skills" className="relative px-4 py-20 sm:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="section-label mb-2 block">Technical Proficiency</span>
            <h2 className="text-foreground text-3xl font-bold tracking-tight sm:text-4xl">
              Skills & Stack
            </h2>
          </div>
          <p className="text-muted-foreground max-w-xs text-sm">
            Proficiency rated 1-5 across {skillCategories.length} engineering domains.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Tab navigation - left column on desktop */}
          <div className="flex flex-row gap-2 overflow-x-auto pb-1 lg:col-span-1 lg:flex-col lg:overflow-visible lg:pb-0">
            {skillCategories.map((cat, i) => (
              <button
                key={cat.label}
                onClick={() => setActiveTab(i)}
                className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
                  activeTab === i
                    ? 'bg-primary/10 border-primary/30 text-primary teal-glow'
                    : 'glass-card border-border text-muted-foreground hover:text-foreground hover:border-primary/20'
                }`}
              >
                <Icon name={cat.icon as Parameters<typeof Icon>[0]['name']} size={16} />
                {cat.label}
              </button>
            ))}
          </div>

          {/* Skills panel - right 2 cols */}
          <div className="glass-card border-border rounded-3xl border p-6 lg:col-span-2">
            <div className="border-border mb-6 flex items-center gap-3 border-b pb-4">
              <div className="bg-primary/10 border-primary/20 flex h-10 w-10 items-center justify-center rounded-xl border">
                <Icon
                  name={active.icon as Parameters<typeof Icon>[0]['name']}
                  size={18}
                  className="text-primary"
                />
              </div>
              <div>
                <h3 className="text-foreground text-base font-bold">{active.label}</h3>
                <p className="text-muted-foreground text-xs">{active.skills.length} skills</p>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              {active.skills.map((skill, i) => (
                <div
                  key={skill.name}
                  className="skill-row fade-slide-up animate-on-scroll hover:bg-muted/40 flex items-center justify-between rounded-xl px-3 py-2.5 transition-colors"
                  style={{ transitionDelay: `${i * 50}ms` }}
                >
                  <span className="text-foreground text-sm font-medium">{skill.name}</span>
                  <SkillDots level={skill.level} />
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="border-border mt-5 flex flex-wrap items-center gap-4 border-t pt-4">
              <span className="text-muted-foreground text-xs">Proficiency:</span>
              {[1, 2, 3, 4, 5].map((n) => (
                <div key={n} className="flex items-center gap-1.5">
                  <SkillDots level={n} max={5} />
                  <span className="text-muted-foreground text-xs">
                    {n === 1
                      ? 'Basic'
                      : n === 2
                        ? 'Familiar'
                        : n === 3
                          ? 'Proficient'
                          : n === 4
                            ? 'Advanced'
                            : 'Expert'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
