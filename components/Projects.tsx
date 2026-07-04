"use client";

import { useState } from "react";
import portfolioData from "@/data/portfolio.json";

type ProjectItem = (typeof portfolioData.projects)[number];

function ExternalLinkIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
      <path
        d="M2 9L9 2M9 2H4.5M9 2V6.5"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

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

function ProjectCard({ project, index }: { project: ProjectItem; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-zinc-200/80">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-start justify-between py-6 text-left gap-6 group"
        aria-expanded={open}
      >
        <div className="flex-1 min-w-0">
          <p className="font-medium text-[#3C0008] text-base leading-snug group-hover:opacity-75 transition-opacity">
            {project.title.trim()}
          </p>
        </div>

        <span
          className={`text-[#3C0008] flex-shrink-0 mt-1 transition-transform duration-300 ${
            open ? "rotate-180" : "rotate-0"
          }`}
        >
          <ChevronDown />
        </span>
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          open ? "max-h-[400px] pb-8" : "max-h-0"
        }`}
      >
        <p className="text-sm text-zinc-600 leading-relaxed">
          {project.description}
        </p>

        {project.url && (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 mt-5 text-[11px] font-medium text-[#3C0008] hover:opacity-70 transition-opacity"
          >
            <span>View project</span>
            <ExternalLinkIcon />
          </a>
        )}
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <section className="bg-[#FAF8F5] px-6 py-24">
      <div className="max-w-4xl mx-auto">
        <p className="text-[11px] uppercase tracking-[0.2em] text-[#3C0008] italic mb-12 text-center">
          Projects
        </p>
        <div>
          {portfolioData.projects.map((project, index) => (
            <ProjectCard key={`${project.id}-${index}`} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
