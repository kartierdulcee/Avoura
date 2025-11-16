"use client";

import Link from "next/link";

const links = [
  { href: "#story", label: "About" },
  { href: "mailto:concierge@auvora.com", label: "Contact" },
  { href: "/privacy", label: "Privacy" },
];

function InstagramIcon() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <path d="M16.5 7.5h.01" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="12" r="4.5" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="currentColor"
    >
      <path d="M14.25 3c.24 1.57 1.3 3.02 3 3.27v2.22c-1.06.02-2.07-.3-3-.86v6.62c0 2.58-2.09 4.75-4.67 4.75-1.12 0-2.15-.4-2.95-1.05A4.66 4.66 0 0 1 5 14.82c0-2.58 2.09-4.75 4.58-4.75.3 0 .6.03.89.09v2.36c-.28-.1-.58-.16-.89-.16-1.22 0-2.21 1-2.21 2.24s.99 2.24 2.21 2.24 2.13-1 2.13-2.24V3h2.54Z" />
    </svg>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-foreground/10 bg-background px-6 py-10 text-foreground/60 sm:px-12">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <span className="text-xs uppercase tracking-[0.4em] text-foreground/40">
          Auvora
        </span>
        <nav className="flex flex-wrap items-center gap-6 text-sm">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="transition hover:text-accent"
            >
              {link.label}
            </Link>
          ))}
          <div className="flex gap-3">
            <Link
              href="https://instagram.com/auvorabakery"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-accent/60 text-accent transition hover:border-accent hover:text-foreground"
              aria-label="Instagram"
            >
              <InstagramIcon />
            </Link>
            <Link
              href="https://www.tiktok.com/@auvora.gf.vegan.c"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-accent/60 text-accent transition hover:border-accent hover:text-foreground"
              aria-label="TikTok"
            >
              <TikTokIcon />
            </Link>
          </div>
        </nav>
      </div>
      <p className="mt-4 text-xs uppercase tracking-[0.3em] text-foreground/45">
        Not a nut free environment.
      </p>
      <p className="mt-6 text-xs text-foreground/35">
        © {new Date().getFullYear()} Auvora. Crafted with care.
      </p>
    </footer>
  );
}
