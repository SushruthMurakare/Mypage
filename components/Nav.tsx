"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavLinkItem =
  | { label: string; sectionId: string }
  | { label: string; href: string; external?: boolean };

const NAV_LINKS: NavLinkItem[] = [
  { label: "Experience", sectionId: "experience" },
  { label: "Projects", sectionId: "projects" },
  { label: "Education", sectionId: "education" },
  { label: "Certificates", sectionId: "certificates" },
  { label: "Games", href: "/games" },
  { label: "Hackathons", href: "/hackathons" },
  // { label: "Gallery", href: "/experience" },
  { label: "Resume", href: "/resume" },
  {
    label: "Blog",
    href: "https://sushruthmurakarewrites.wordpress.com/my-blogs/",
    external: true,
  },
  { label: "About", sectionId: "about" },
];

function NavLink({
  link,
  active,
  onClick,
}: {
  link: NavLinkItem;
  active: boolean;
  onClick?: () => void;
}) {
  const className = `text-sm px-3 py-1.5 rounded-full transition-colors whitespace-nowrap ${
    active
      ? "bg-white text-zinc-900 shadow-sm"
      : "text-zinc-600 hover:bg-white hover:text-zinc-900"
  }`;

  if ("sectionId" in link) {
    return (
      <Link
        href={`/#${link.sectionId}`}
        scroll
        className={className}
        onClick={onClick}
      >
        {link.label}
      </Link>
    );
  }

  if (link.external) {
    return (
      <a
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        onClick={onClick}
      >
        {link.label}
      </a>
    );
  }

  return (
    <Link href={link.href} className={className} onClick={onClick}>
      {link.label}
    </Link>
  );
}

export default function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="sticky top-4 z-50 flex justify-center px-4">
      <div className="w-full xl:w-auto max-w-6xl">
        <div className="flex items-center gap-1 xl:rounded-full xl:border xl:border-zinc-200/70 xl:bg-white/70 xl:backdrop-blur-md xl:shadow-sm xl:px-2 xl:py-2">

          <div className="hidden xl:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.label}
                link={link}
                active={
                  "href" in link && !link.external && pathname === link.href
                }
              />
            ))}
          </div>

          <button
            onClick={() => setOpen((v) => !v)}
            className="xl:hidden ml-auto w-9 h-9 rounded-full border border-zinc-200/70 bg-white/70 backdrop-blur-md shadow-sm text-zinc-900 flex items-center justify-center flex-shrink-0"
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M2 2L14 14M14 2L2 14"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            ) : (
              <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
                <path
                  d="M0 1H18M0 7H18M0 13H18"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            )}
          </button>
        </div>

        {open && (
          <div className="xl:hidden mt-2 flex flex-col gap-1 rounded-2xl border border-zinc-200/70 bg-white/90 backdrop-blur-md shadow-sm p-2">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.label}
                link={link}
                active={
                  "href" in link && !link.external && pathname === link.href
                }
                onClick={() => setOpen(false)}
              />
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
