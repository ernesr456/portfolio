import React from 'react';
import AppLogo from '@/components/UI/AppLogo';
import Icon from '@/components/UI/AppIcon';

export default function Footer() {
  return (
    <footer className="border-t border-border py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Logo + name */}
        <div className="flex items-center gap-2">
          <AppLogo size={28} />
          <span className="font-semibold text-sm text-foreground">
            Ernesto<span className="text-primary">.</span>
          </span>
        </div>

        {/* Links */}
        <div className="flex items-center gap-6 text-sm font-medium text-muted-foreground">
          <a href="#projects" className="hover:text-foreground transition-colors">Work</a>
          <a href="#skills" className="hover:text-foreground transition-colors">Skills</a>
          <a href="#experience" className="hover:text-foreground transition-colors">Experience</a>
          <a href="#contact" className="hover:text-foreground transition-colors">Contact</a>
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
          <span className="text-muted-foreground text-sm">© 2026 Ernesto Almario</span>
        </div>
      </div>
    </footer>
  );
}
