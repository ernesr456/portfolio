'use client';

import React, { useState, useEffect } from 'react';
import AppLogo from '@/components/UI/AppLogo';
import Icon from '@/components/UI/AppIcon';

const navLinks = [
  { label: 'Work', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = () => setMenuOpen(false);

  return (
    <header className="fixed top-0 w-full z-50 pt-5 px-4 sm:px-8">
      <div
        className={`nav-pill max-w-6xl mx-auto flex items-center justify-between px-5 py-3 rounded-full transition-all duration-300 ${
          scrolled ? 'py-2.5' : ''
        }`}
      >
        {/* Logo */}
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-2.5"
          aria-label="Scroll to top"
        >
          <AppLogo size={32} />
          <span className="font-bold text-base tracking-tight text-foreground hidden sm:block">
            Ernesto<span className="text-primary">.</span>
          </span>
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-muted-foreground">
          {navLinks?.map((link) => (
            <a
              key={link?.label}
              href={link?.href}
              className="hover:text-foreground transition-colors duration-200"
            >
              {link?.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div className="flex items-center gap-3">
          <a
            href="#contact"
            className="hidden sm:flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2 rounded-full text-sm font-semibold teal-glow-hover transition-all duration-200 hover:scale-105"
          >
            Hire Me
            <Icon name="ArrowRightIcon" size={14} />
          </a>
          {/* Mobile hamburger */}
          <button
            className="md:hidden flex items-center justify-center w-9 h-9 rounded-full glass-card"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <Icon name={menuOpen ? 'XMarkIcon' : 'Bars3Icon'} size={18} className="text-foreground" />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden max-w-6xl mx-auto mt-2 glass-card rounded-2xl px-5 py-4 flex flex-col gap-4">
          {navLinks?.map((link) => (
            <a
              key={link?.label}
              href={link?.href}
              onClick={handleNavClick}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2 border-b border-border last:border-0"
            >
              {link?.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={handleNavClick}
            className="flex items-center justify-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-full text-sm font-semibold mt-1"
          >
            Hire Me
          </a>
        </div>
      )}
    </header>
  );
}
