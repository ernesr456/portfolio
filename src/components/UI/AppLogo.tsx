'use client';

type AppLogoProps = {
  size?: number;
  onClick?: () => void;
};

export default function AppLogo({ size = 32, onClick }: AppLogoProps) {
  const logo = (
    <span
      className="flex items-center justify-center rounded-xl text-primary transition-colors hover:text-foreground"
      style={{ width: size, height: size }}
    >
      <svg
        aria-hidden="true"
        className="h-full w-full"
        viewBox="0 0 40 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M14 6 6 16l8 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="m26 6 8 10-8 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="m22 6-4 20" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      </svg>
    </span>
  );

  if (!onClick) return logo;

  return (
    <button type="button" onClick={onClick} aria-label="Scroll to top">
      {logo}
    </button>
  );
}
