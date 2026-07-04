"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

type NavLinkItem = {
  label: string;
  href: string;
  external?: boolean;
};

const NAV_LINKS: NavLinkItem[] = [
  { label: "Experience", href: "/experience" },
  { label: "Projects", href: "/experience" },
  { label: "Education", href: "/experience" },
  { label: "Certificates", href: "/experience" },
  { label: "Games", href: "/games" },
  { label: "Gallery", href: "/experience" },
  { label: "Resume", href: "/resume" },
  {
    label: "Blog",
    href: "https://sushruthmurakarewrites.wordpress.com/my-blogs/",
    external: true,
  },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
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
  const className = `text-sm px-4 py-1.5 rounded-full transition-colors whitespace-nowrap ${
    active
      ? "bg-white text-zinc-900 shadow-sm"
      : "text-zinc-600 hover:bg-white hover:text-zinc-900"
  }`;

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
      <div className="w-full max-w-3xl">
        <div className="flex items-center gap-1 rounded-full border border-zinc-200/70 bg-white/70 backdrop-blur-md shadow-sm px-2 py-2">
          <Link
            href="/"
            className="flex items-center gap-2 pl-2 pr-3 flex-shrink-0"
          >
            <Image
              src="/Images/logo.svg"
              alt=""
              width={22}
              height={22}
              className="w-[22px] h-[22px]"
            />
            <span className="text-sm font-medium text-zinc-900 tracking-tight">
              Sushruth
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-1 flex-1 justify-end overflow-x-auto">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.label}
                link={link}
                active={!link.external && pathname === link.href}
              />
            ))}
          </div>

          <button
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden ml-auto mr-1 text-zinc-900 w-8 h-8 flex items-center justify-center flex-shrink-0"
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
          <div className="lg:hidden mt-2 flex flex-col gap-1 rounded-2xl border border-zinc-200/70 bg-white/90 backdrop-blur-md shadow-sm p-2">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.label}
                link={link}
                active={!link.external && pathname === link.href}
                onClick={() => setOpen(false)}
              />
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
