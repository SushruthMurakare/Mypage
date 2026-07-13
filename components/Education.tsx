"use client";

import { useState } from "react";
import portfolioData from "@/data/portfolio.json";

type EducationItem = (typeof portfolioData.education)[number];

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

function EducationCard({ edu }: { edu: EducationItem }) {
  const [open, setOpen] = useState(false);

  const courses = edu.relatedCourses
    .split(",")
    .map((c) => c.trim())
    .filter(Boolean);

  return (
    <div className="border-b border-zinc-200/80">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-start justify-between py-6 text-left gap-6 group"
        aria-expanded={open}
      >
        {/* Left */}
        <div className="flex-1 min-w-0">
          <p className="font-medium text-[#3C0008] text-base leading-snug group-hover:opacity-75 transition-opacity">
            {edu.degree}
          </p>
          <p className="text-sm text-zinc-500 mt-1 flex items-center flex-wrap gap-x-1.5 gap-y-1">
            <span>{edu.institution}</span>
            <span className="text-zinc-300">·</span>
            <span>{edu.location}</span>
            <span className="text-[10px] font-medium text-zinc-400 bg-zinc-100 px-2 py-0.5 rounded-full">
              GPA {edu.gpa}
            </span>
          </p>
        </div>

        {/* Right */}
        <div className="flex items-center gap-3 flex-shrink-0 pt-0.5">
          <span className="text-sm text-zinc-400 hidden sm:block">
            Graduated {edu.graduated}
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

      {/* Mobile: graduated date */}
      <p className="sm:hidden text-xs text-zinc-400 -mt-4 pb-4">
        Graduated {edu.graduated}
      </p>

      {/* Expandable: related courses */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          open ? "max-h-[400px] pb-8" : "max-h-0"
        }`}
      >
        <p className="text-[10px] uppercase tracking-[0.18em] text-zinc-400 mb-3">
          Related Coursework
        </p>
        <div className="flex flex-wrap gap-2">
          {courses.map((course) => (
            <span
              key={course}
              className="text-[11px] text-zinc-600 bg-zinc-100 px-3 py-1 rounded-full border border-zinc-200/60"
            >
              {course}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Education() {
  return (
    <section id="education" className="scroll-mt-28 bg-[#FAF8F5] px-6 py-16">
      <div className="max-w-4xl mx-auto">
        <p className="text-[11px] uppercase tracking-[0.2em] text-[#3C0008] italic mb-12 text-center">
          Education
        </p>
        <div>
          {portfolioData.education.map((edu) => (
            <EducationCard key={edu.id} edu={edu} />
          ))}
        </div>
      </div>
    </section>
  );
}
