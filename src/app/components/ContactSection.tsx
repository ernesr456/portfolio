'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import Icon from '@/components/UI/AppIcon';

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
    icon: 'MapPinIcon',
    label: 'Location',
    value: 'Inayawan, Cebu City, Philippines',
    href: undefined,
  },
];

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
];

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const { executeRecaptcha } = useGoogleReCaptcha();

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.querySelectorAll<HTMLElement>('.contact-item').forEach((item, i) => {
              setTimeout(() => item.classList.add('visible'), i * 80);
            });
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!executeRecaptcha) {
      setError('reCAPTCHA not ready. Please try again.');
      setLoading(false);
      return;
    }

    try {
      const token = await executeRecaptcha('contact_submit');
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, token }),
      });

      if (!response.ok) {
        const result = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(result?.error || 'Unable to send your message.');
      }

      setSubmitted(true);
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section ref={sectionRef} id="contact" className="py-20 px-4 sm:px-8 relative">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <div className="w-[600px] h-[400px] blob-teal opacity-40" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-14">
          <span className="section-label block mb-3">Get In Touch</span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-foreground mb-4">
            Ready to build something
            <span className="text-gradient-teal"> great?</span>
          </h2>
          <p className="text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">
            I&apos;m open to full-time roles, contract work, and technical leadership opportunities. Let&apos;s talk.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2 flex flex-col gap-5">
            {contactInfo.map((item, i) => (
              <div
                key={item.label}
                className="contact-item fade-slide-up animate-on-scroll glass-card glass-card-hover rounded-2xl border border-border p-4 flex items-center gap-4"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                  <Icon name={item.icon as Parameters<typeof Icon>[0]['name']} size={18} className="text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground font-medium mb-0.5">{item.label}</p>
                  {item.href ? (
                    <a
                      href={item.href}
                      target={item.href.startsWith('http') ? '_blank' : undefined}
                      rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="text-sm font-semibold text-foreground hover:text-primary transition-colors truncate block"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-sm font-semibold text-foreground truncate">{item.value}</p>
                  )}
                </div>
              </div>
            ))}

            <div className="contact-item fade-slide-up animate-on-scroll glass-card rounded-2xl border border-border p-5" style={{ transitionDelay: '320ms' }}>
              <div className="flex items-center gap-2 mb-4">
                <Icon name="StarIcon" size={14} className="text-primary" />
                <span className="section-label">Professional References</span>
              </div>
              <div className="flex flex-col gap-3">
                {references.map((ref) => (
                  <div key={ref.name} className="pb-3 border-b border-border last:border-0 last:pb-0">
                    <p className="text-sm font-semibold text-foreground">{ref.name}</p>
                    <p className="text-xs text-muted-foreground">{ref.title} &middot; {ref.company}</p>
                    <a href={`mailto:${ref.email}`} className="text-xs text-primary hover:text-foreground transition-colors mt-0.5 block">
                      {ref.email}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-3 contact-item fade-slide-up animate-on-scroll" style={{ transitionDelay: '120ms' }}>
            <div className="glass-card rounded-3xl border border-border p-7 h-full flex flex-col justify-center">
              <h3 className="text-lg font-bold text-foreground mb-6">Send a Message</h3>

              {submitted ? (
                <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center teal-glow">
                    <Icon name="CheckIcon" size={28} className="text-primary" />
                  </div>
                  <p className="text-base font-semibold text-foreground">Message sent!</p>
                  <p className="text-sm text-muted-foreground max-w-xs">
                    I&apos;ll get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-sm text-primary hover:text-foreground transition-colors mt-2"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="contact-name" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Your Name
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        placeholder="Maria Santos"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full h-11 bg-muted/50 border border-border rounded-xl px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="contact-email" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Your Email
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        placeholder="maria@company.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full h-11 bg-muted/50 border border-border rounded-xl px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="contact-subject" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Subject
                    </label>
                    <input
                      id="contact-subject"
                      type="text"
                      placeholder="Full-Time Senior Engineer Role"
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full h-11 bg-muted/50 border border-border rounded-xl px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="contact-message" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      required
                      rows={5}
                      placeholder="Hi Ernesto, I came across your portfolio and would love to discuss..."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full bg-muted/50 border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all resize-none"
                    />
                  </div>

                  {error && (
                    <div className="text-sm text-red-500 bg-red-50 dark:bg-red-900/20 p-3 rounded-xl">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="flex items-center justify-center gap-2.5 bg-primary text-primary-foreground h-12 rounded-xl text-sm font-semibold teal-glow teal-glow-hover transition-all duration-200 hover:scale-[1.02] mt-1 disabled:opacity-50 disabled:cursor-not-allowed"
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
  );
}