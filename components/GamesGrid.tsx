"use client";

import { useState } from "react";
import Image from "next/image";
import portfolioData from "@/data/portfolio.json";

type GameItem = (typeof portfolioData.games)[number];

function ExternalLinkIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path
        d="M2.5 9.5L9.5 2.5M9.5 2.5H5M9.5 2.5V7"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronDown() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path
        d="M2.5 5L7 9.5L11.5 5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function GameCard({ game }: { game: GameItem }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-2xl border border-zinc-200/80 bg-white/50 overflow-hidden">
      {/* Image */}
      <div className="relative w-full aspect-video bg-zinc-100 overflow-hidden">
        {game.imageSrc ? (
          /* TODO: Replace imageSrc in portfolio.json with actual game screenshots */
          <Image
            src={game.imageSrc}
            alt={game.title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs text-zinc-400 tracking-widest uppercase">
              Screenshot coming soon
            </span>
          </div>
        )}
      </div>

      {/* Header row — always visible */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-start justify-between px-5 py-4 text-left group"
        aria-expanded={open}
      >
        <div className="flex-1 min-w-0 pr-3">
          <p className="font-medium text-[#3C0008] text-sm leading-snug group-hover:opacity-75 transition-opacity">
            {game.title}
          </p>
          <p className="text-xs text-zinc-500 mt-0.5">{game.subtitle}</p>
        </div>
        <span
          className={`text-[#3C0008] flex-shrink-0 mt-0.5 transition-transform duration-300 ${
            open ? "rotate-180" : "rotate-0"
          }`}
        >
          <ChevronDown />
        </span>
      </button>

      {/* Expandable details */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          open ? "max-h-[600px]" : "max-h-0"
        }`}
      >
        <div className="px-5 pb-5 border-t border-zinc-100">
          <ul className="space-y-2.5 mt-4">
            {game.bullets.map((bullet, i) => (
              <li
                key={i}
                className="flex gap-2.5 text-xs text-zinc-600 leading-relaxed"
              >
                <span className="text-[#3C0008] flex-shrink-0 select-none mt-px">
                  —
                </span>
                <span>{bullet}</span>
              </li>
            ))}
          </ul>

          {game.url && (
            <a
              href={game.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 mt-5 text-[11px] font-medium text-[#3C0008] hover:opacity-70 transition-opacity"
            >
              <span>View game</span>
              <ExternalLinkIcon />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function GamesGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start">
      {portfolioData.games.map((game) => (
        <GameCard key={game.id} game={game} />
      ))}
    </div>
  );
}
