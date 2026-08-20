import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Page Not Found | Ernesto Almario',
  description: 'The requested page could not be found on Ernesto Almario’s portfolio.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <main className="min-h-screen bg-background px-4 flex items-center justify-center">
      <div className="glass-card max-w-lg rounded-3xl border border-border p-10 text-center">
        <p className="section-label mb-3">404 Error</p>
        <h1 className="text-4xl font-bold tracking-tight text-foreground mb-4">
          Page not found
        </h1>
        <p className="text-muted-foreground mb-7">
          The page you requested does not exist or may have moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground teal-glow-hover transition-all"
        >
          Return home
        </Link>
      </div>
    </main>
  );
}
