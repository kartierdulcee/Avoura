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
          <Link
            href="https://instagram.com/auvora"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-accent/60 text-accent transition hover:border-accent hover:text-foreground"
            aria-label="Instagram"
          >
            <InstagramIcon />
          </Link>
        </nav>
      </div>
      <p className="mt-4 text-xs uppercase tracking-[0.3em] text-foreground/45">
        Not a nut free environment.
      </p>
      <p className="mt-6 text-xs text-foreground/35">
        © {new Date().getFullYear()} Auvora. Crafted in small batches for those
        who linger.
      </p>
    </footer>
  );
}
