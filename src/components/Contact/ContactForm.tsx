'use client'

import React, { useMemo, useRef, useState } from 'react'

const GOOGLE_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbx_7sA8jwXEz3XGi8AbL5saJ6MZjZzVql8He3afL06tD-75UXq1WmqkR57Lw0Fzwwz2SQ/exec'

type FormState = 'idle' | 'sending' | 'success' | 'error'

const ContactForm = () => {
  const formRef = useRef<HTMLFormElement | null>(null)

  const [status, setStatus] = useState<FormState>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')

  // Honeypot anti-spam field (keep hidden)
  const [website, setWebsite] = useState('')

  const canSubmit = useMemo(() => {
    const validEmail = /^\S+@\S+\.\S+$/.test(email.trim())
    return (
      status !== 'sending' &&
      name.trim().length >= 2 &&
      validEmail &&
      message.trim().length >= 10 &&
      website.trim().length === 0
    )
  }, [status, name, email, message, website])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg('')

    // bot filled honeypot
    if (website.trim().length > 0) {
      setStatus('success')
      return
    }

    if (!canSubmit) {
      setStatus('error')
      setErrorMsg('Please fill in your name, a valid email, and a message (min 10 characters).')
      return
    }

    // Submit using normal form POST to GAS (no CORS)
    setStatus('sending')

    // Actually submit the form to the hidden iframe
    formRef.current?.submit()

    // Since we can’t read GAS response, assume success after submit
    setTimeout(() => {
      setStatus('success')
      setName('')
      setEmail('')
      setPhone('')
      setMessage('')
      setWebsite('')
    }, 600)
  }

  return (
    <>
      {/* Hidden iframe prevents redirect */}
      <iframe name="gas_hidden_iframe" className="hidden" />

      <form
        ref={formRef}
        action={GOOGLE_SCRIPT_URL}
        method="POST"
        target="gas_hidden_iframe"
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <div>
          <label className="text-neutral mb-1 block text-sm font-medium">Name</label>
          <input
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="bg-primary text-neutral placeholder:text-neutral/50 w-full rounded-lg border border-white/10 px-4 py-3 outline-none focus:border-white/20"
            required
          />
        </div>

        <div>
          <label className="text-neutral mb-1 block text-sm font-medium">Email</label>
          <input
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@email.com"
            type="email"
            className="bg-primary text-neutral placeholder:text-neutral/50 w-full rounded-lg border border-white/10 px-4 py-3 outline-none focus:border-white/20"
            required
          />
        </div>

        <div>
          <label className="text-neutral mb-1 block text-sm font-medium">Phone (optional)</label>
          <input
            name="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+63..."
            className="bg-primary text-neutral placeholder:text-neutral/50 w-full rounded-lg border border-white/10 px-4 py-3 outline-none focus:border-white/20"
          />
        </div>

        <div>
          <label className="text-neutral mb-1 block text-sm font-medium">Message</label>
          <textarea
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Tell me about your project..."
            rows={5}
            className="bg-primary text-neutral placeholder:text-neutral/50 w-full resize-none rounded-lg border border-white/10 px-4 py-3 outline-none focus:border-white/20"
            required
          />
        </div>

        {/* Honeypot - hidden */}
        <input
          type="text"
          name="website"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
          aria-hidden="true"
        />

        {status === 'success' && (
          <p className="text-accent text-sm font-medium">
            Message sent! ✅ I’ll get back to you soon.
          </p>
        )}

        {status === 'error' && <p className="text-sm font-medium text-red-400">{errorMsg}</p>}

        <button
          type="submit"
          disabled={!canSubmit}
          className="bg-accent text-primary w-full rounded-lg px-4 py-3 font-semibold transition-opacity disabled:opacity-50"
        >
          {status === 'sending' ? 'Sending…' : 'Send Message'}
        </button>
      </form>
    </>
  )
}

export default ContactForm