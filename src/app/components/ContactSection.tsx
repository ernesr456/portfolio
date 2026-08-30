'use client'

import React, { useState, useRef, useEffect } from 'react'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'
import Icon from '@/components/UI/AppIcon'

const contactInfo = [
  {
    icon: 'EnvelopeIcon',
    label: 'Email',
    value: 'ernestoalmario20@gmail.com',
    href: 'mailto:ernestoalmario20@gmail.com',
  },
  {
    icon: 'PhoneIcon',
    label: 'Phone',
    value: '+63 976 315 0504',
    href: 'tel:+639763150504',
  },
  {
    icon: 'GlobeAltIcon',
    label: 'Website',
    value: 'ernestoalmario.com',
    href: 'https://www.ernestoalmario.com',
  },
  {
    icon: 'CodeBracketIcon',
    label: 'GitHub',
    value: 'github.com/ernesr456',
    href: 'https://github.com/ernesr456',
  },
  {
    icon: 'BriefcaseIcon',
    label: 'LinkedIn',
    value: 'Ernesto Almario Jr.',
    href: 'https://www.linkedin.com/in/ernesto-almario-jr-4a9162191/',
  },
  {
    icon: 'MapPinIcon',
    label: 'Location',
    value: 'Inayawan, Cebu City, Philippines',
    href: undefined,
  },
]

const references = [
  {
    name: 'Harold Glenn Minerva',
    title: 'Former CEO/Co-Founder',
    company: 'RAK SON OPC',
    email: 'hgminerva@gmail.com',
    phone: '+63-917-812-3982',
  },
  {
    name: 'Oliver Enciso',
    title: 'Former President',
    company: 'Blockspace Corporation',
    email: 'oliverenciso07@gmail.com',
    phone: '+63-966-497-5095',
  },
  {
    name: 'Irvin Bernarte',
    title: 'Former Game Director',
    company: 'Rak Son OPC',
    email: 'irvinrbernarte@gmail.com',
    phone: '+63-966-413-2310',
  },
]

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const { executeRecaptcha } = useGoogleReCaptcha()

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.querySelectorAll<HTMLElement>('.contact-item').forEach((item, i) => {
              setTimeout(() => item.classList.add('visible'), i * 80)
            })
            observer.unobserve(el)
          }
        })
      },
      { threshold: 0.1 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    if (!executeRecaptcha) {
      setError('reCAPTCHA not ready. Please try again.')
      setLoading(false)
      return
    }

    try {
      const token = await executeRecaptcha('contact_submit')
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, token }),
      })

      if (!response.ok) {
        const result = (await response.json().catch(() => null)) as { error?: string } | null
        throw new Error(result?.error || 'Unable to send your message.')
      }

      setSubmitted(true)
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section ref={sectionRef} id="contact" className="relative px-4 py-20 sm:px-8">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
        <div className="blob-teal h-[400px] w-[600px] opacity-40" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="mb-14 text-center">
          <span className="section-label mb-3 block">Get In Touch</span>
          <h2 className="text-foreground mb-4 text-3xl font-bold tracking-tight sm:text-5xl">
            Ready to build something
            <span className="text-gradient-teal"> great?</span>
          </h2>
          <p className="text-muted-foreground mx-auto max-w-xl text-base leading-relaxed">
            I&apos;m open to full-time roles, contract work, and technical leadership opportunities.
            Let&apos;s talk.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
          <div className="flex flex-col gap-5 lg:col-span-2">
            {contactInfo.map((item, i) => (
              <div
                key={item.label}
                className="contact-item fade-slide-up animate-on-scroll glass-card glass-card-hover border-border flex items-center gap-4 rounded-2xl border p-4"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="bg-primary/10 border-primary/20 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border">
                  <Icon
                    name={item.icon as Parameters<typeof Icon>[0]['name']}
                    size={18}
                    className="text-primary"
                  />
                </div>
                <div className="min-w-0">
                  <p className="text-muted-foreground mb-0.5 text-xs font-medium">{item.label}</p>
                  {item.href ? (
                    <a
                      href={item.href}
                      target={item.href.startsWith('http') ? '_blank' : undefined}
                      rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="text-foreground hover:text-primary block truncate text-sm font-semibold transition-colors"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-foreground truncate text-sm font-semibold">{item.value}</p>
                  )}
                </div>
              </div>
            ))}

            <div
              className="contact-item fade-slide-up animate-on-scroll glass-card border-border rounded-2xl border p-5"
              style={{ transitionDelay: '320ms' }}
            >
              <div className="mb-4 flex items-center gap-2">
                <Icon name="StarIcon" size={14} className="text-primary" />
                <span className="section-label">Professional References</span>
              </div>
              <div className="flex flex-col gap-3">
                {references.map((ref) => (
                  <div
                    key={ref.name}
                    className="border-border border-b pb-3 last:border-0 last:pb-0"
                  >
                    <p className="text-foreground text-sm font-semibold">{ref.name}</p>
                    <p className="text-muted-foreground text-xs">
                      {ref.title} &middot; {ref.company}
                    </p>
                    <a
                      href={`mailto:${ref.email}`}
                      className="text-primary hover:text-foreground mt-0.5 block text-xs transition-colors"
                    >
                      {ref.email}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div
            className="contact-item fade-slide-up animate-on-scroll lg:col-span-3"
            style={{ transitionDelay: '120ms' }}
          >
            <div className="glass-card border-border flex h-full flex-col justify-center rounded-3xl border p-7">
              <h3 className="text-foreground mb-6 text-lg font-bold">Send a Message</h3>

              {submitted ? (
                <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
                  <div className="bg-primary/10 border-primary/30 teal-glow flex h-16 w-16 items-center justify-center rounded-full border">
                    <Icon name="CheckIcon" size={28} className="text-primary" />
                  </div>
                  <p className="text-foreground text-base font-semibold">Message sent!</p>
                  <p className="text-muted-foreground max-w-xs text-sm">
                    I&apos;ll get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-primary hover:text-foreground mt-2 text-sm transition-colors"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="contact-name"
                        className="text-muted-foreground text-xs font-semibold tracking-wider uppercase"
                      >
                        Your Name
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        placeholder="Maria Santos"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="bg-muted/50 border-border text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:ring-primary/30 h-11 w-full rounded-xl border px-4 text-sm transition-all focus:ring-1 focus:outline-none"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="contact-email"
                        className="text-muted-foreground text-xs font-semibold tracking-wider uppercase"
                      >
                        Your Email
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        placeholder="maria@company.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="bg-muted/50 border-border text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:ring-primary/30 h-11 w-full rounded-xl border px-4 text-sm transition-all focus:ring-1 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="contact-subject"
                      className="text-muted-foreground text-xs font-semibold tracking-wider uppercase"
                    >
                      Subject
                    </label>
                    <input
                      id="contact-subject"
                      type="text"
                      placeholder="Full-Time Senior Engineer Role"
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="bg-muted/50 border-border text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:ring-primary/30 h-11 w-full rounded-xl border px-4 text-sm transition-all focus:ring-1 focus:outline-none"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="contact-message"
                      className="text-muted-foreground text-xs font-semibold tracking-wider uppercase"
                    >
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      required
                      rows={5}
                      placeholder="Hi Ernesto, I came across your portfolio and would love to discuss..."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="bg-muted/50 border-border text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:ring-primary/30 w-full resize-none rounded-xl border px-4 py-3 text-sm transition-all focus:ring-1 focus:outline-none"
                    />
                  </div>

                  {error && (
                    <div className="rounded-xl bg-red-50 p-3 text-sm text-red-500 dark:bg-red-900/20">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-primary text-primary-foreground teal-glow teal-glow-hover mt-1 flex h-12 items-center justify-center gap-2.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {loading ? (
                      <span className="animate-pulse">Sending...</span>
                    ) : (
                      <>
                        <Icon name="PaperAirplaneIcon" size={16} />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
