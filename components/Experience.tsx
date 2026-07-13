"use client";

import { useState } from "react";
import portfolioData from "@/data/portfolio.json";

type ExperienceItem = (typeof portfolioData.experience)[number];

function ChevronDown() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
      <path
        d="M2.5 5.5L7.5 10.5L12.5 5.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ExperienceCard({ exp }: { exp: ExperienceItem }) {
  const [open, setOpen] = useState(false);
  const duration = `${exp.started} – ${exp.ended}`;

  return (
    <div className="border-b border-zinc-200/80">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-start justify-between py-6 text-left gap-6 group"
        aria-expanded={open}
      >
        {/* Left: title + org / location */}
        <div className="flex-1 min-w-0">
          <p className="font-medium text-[#3C0008] text-base leading-snug group-hover:opacity-75 transition-opacity">
            {exp.title}
          </p>
          <p className="text-sm text-zinc-500 mt-1 flex items-center flex-wrap gap-x-1.5 gap-y-1">
            <span>{exp.organization}</span>
            <span className="text-zinc-300">·</span>
            <span>{exp.location}</span>
            {"type" in exp && exp.type && (
              <span className="text-[10px] font-medium text-zinc-400 bg-zinc-100 px-2 py-0.5 rounded-full">
                {exp.type}
              </span>
            )}
          </p>
        </div>

        {/* Right: duration + chevron */}
        <div className="flex items-center gap-3 flex-shrink-0 pt-0.5">
          <span className="text-sm text-zinc-400 tabular-nums hidden sm:block">
            {duration}
          </span>
          <span
            className={`text-[#3C0008] transition-transform duration-300 ${
              open ? "rotate-180" : "rotate-0"
            }`}
          >
            <ChevronDown />
          </span>
        </div>
      </button>

      {/* Mobile: duration below title */}
      <p className="sm:hidden text-xs text-zinc-400 -mt-4 pb-4 tabular-nums">
        {duration}
      </p>

      {/* Expandable bullets */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          open ? "max-h-[900px] pb-8" : "max-h-0"
        }`}
      >
        <ul className="space-y-3">
          {exp.description.map((bullet, i) => (
            <li key={i} className="flex gap-3 text-sm text-zinc-600 leading-relaxed">
              <span className="text-[#3C0008] flex-shrink-0 select-none mt-px">—</span>
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="scroll-mt-28 bg-[#FAF8F5] px-6 py-16">
      <div className="max-w-4xl mx-auto">
        <p className="text-[11px] uppercase tracking-[0.2em] text-[#3C0008] italic mb-12 text-center">
          Work Experience
        </p>
        <div>
          {portfolioData.experience.map((exp) => (
            <ExperienceCard key={exp.id} exp={exp} />
          ))}
        </div>
      </div>
    </section>
  );
}
