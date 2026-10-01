// Small UI icons. Decorative unless a label is passed by the caller.
type P = { size?: number; className?: string };
const base = (size: number) => ({ width: size, height: size, viewBox: "0 0 24 24", fill: "none", "aria-hidden": true as const });

export const ArrowIcon = ({ size = 18, className = "" }: P) => (
  <svg {...base(size)} className={`rtl:-scale-x-100 ${className}`}>
    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const ArrowUpRight = ({ size = 18, className = "" }: P) => (
  <svg {...base(size)} className={`rtl:-scale-x-100 ${className}`}>
    <path d="M7 17 17 7M8 7h9v9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const ChatIcon = ({ size = 18, className = "" }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M12 3C7 3 3 6.6 3 11c0 2.2 1 4.2 2.7 5.6L5 21l4.3-2.2c.9.2 1.8.3 2.7.3 5 0 9-3.6 9-8s-4-8-9-8Z" fill="currentColor" />
  </svg>
);

export const MailIcon = ({ size = 16, className = "" }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M3 6h18v12H3z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    <path d="m3 7 9 6 9-6" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
  </svg>
);

export const PinIcon = ({ size = 16, className = "" }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M12 21s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12Z" stroke="currentColor" strokeWidth="1.8" />
    <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.8" />
  </svg>
);

export const LinkedInIcon = ({ size = 16, className = "" }: P) => (
  <svg {...base(size)} className={className}>
    <path
      d="M6.5 9.5V18M6.5 6v.01M11 18v-5a3 3 0 0 1 6 0v5M11 9.5V18"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

export const MenuIcon = ({ size = 26, className = "" }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M3 7h18M7 12h14M3 17h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const CloseIcon = ({ size = 24, className = "" }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const CheckIcon = ({ size = 14, className = "" }: P) => (
  <svg {...base(size)} className={className}>
    <path d="m5 12.5 4.5 4.5L19 7.5" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const DownloadIcon = ({ size = 16, className = "" }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M12 4v11m0 0-4.5-4.5M12 15l4.5-4.5M5 20h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
