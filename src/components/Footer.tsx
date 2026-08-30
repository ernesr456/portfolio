import React from 'react'
import AppLogo from '@/components/UI/AppLogo'
import Icon from '@/components/UI/AppIcon'

export default function Footer() {
  return (
    <footer className="border-border border-t px-6 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
        {/* Logo + name */}
        <div className="flex items-center gap-2">
          <AppLogo size={28} />
          <span className="text-foreground text-sm font-semibold">
            Ernesto<span className="text-primary">.</span>
          </span>
        </div>

        {/* Links */}
        <div className="text-muted-foreground flex items-center gap-6 text-sm font-medium">
          <a href="#projects" className="hover:text-foreground transition-colors">
            Work
          </a>
          <a href="#skills" className="hover:text-foreground transition-colors">
            Skills
          </a>
          <a href="#experience" className="hover:text-foreground transition-colors">
            Experience
          </a>
          <a href="#contact" className="hover:text-foreground transition-colors">
            Contact
          </a>
        </div>

        {/* Social + copyright */}
        <div className="flex items-center gap-4">
          <a
            href="mailto:ernestoalmario20@gmail.com"
            className="text-muted-foreground hover:text-primary transition-colors"
            aria-label="Email"
          >
            <Icon name="EnvelopeIcon" size={18} />
          </a>
          <a
            href="https://www.ernestoalmario.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
            aria-label="Website"
          >
            <Icon name="GlobeAltIcon" size={18} />
          </a>
          <a
            href="https://github.com/ernesr456"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
            aria-label="GitHub"
          >
            <Icon name="CodeBracketIcon" size={18} />
          </a>
          <a
            href="https://www.linkedin.com/in/ernesto-almario-jr-4a9162191/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
            aria-label="LinkedIn"
          >
            <Icon name="BriefcaseIcon" size={18} />
          </a>
          <span className="text-muted-foreground text-sm">© 2026 Ernesto Almario</span>
        </div>
      </div>
    </footer>
  )
}
