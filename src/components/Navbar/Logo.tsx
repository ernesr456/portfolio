const Logo = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="40"
      height="32"
      viewBox="0 0 40 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {/* Left Bracket */}
      <path
        d="M14 6L6 16L14 26"
        stroke="url(#gradient)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Right Bracket */}
      <path
        d="M26 6L34 16L26 26"
        stroke="url(#gradient)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Slash */}
      <path
        d="M22 6L18 26"
        stroke="url(#gradient)"
        strokeWidth="3"
        strokeLinecap="round"
      />

      <defs>
        <linearGradient
          id="gradient"
          x1="0"
          y1="0"
          x2="40"
          y2="32"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="var(--gradient-start)" />
          <stop offset="1" stopColor="var(--gradient-mid)" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export default Logo
