import Image from "next/image";
import portfolioData from "@/data/portfolio.json";

type CertItem = (typeof portfolioData.certifications)[number];

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

function CertCard({ cert }: { cert: CertItem }) {
  const hasLink = Boolean(cert.url);

  const inner = (
    <div
      className={`group h-full flex flex-col justify-between p-5 rounded-2xl border border-zinc-200/70 bg-white/60 transition-all duration-200 ${
        hasLink
          ? "hover:border-[#3C0008]/30 hover:bg-white cursor-pointer"
          : "opacity-80"
      }`}
    >
      <div>
        {cert.imageSrc && (
          <div className="relative w-full aspect-[4/3] mb-4 rounded-xl overflow-hidden bg-zinc-100/70">
            <Image
              src={cert.imageSrc}
              alt={cert.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-contain p-2"
            />
          </div>
        )}
        <p className="text-sm font-medium text-zinc-900 leading-snug">
          {cert.title}
        </p>
        <p className="text-xs text-zinc-500 mt-1.5">{cert.description}</p>
      </div>

      {hasLink && (
        <div className="mt-4 flex items-center gap-1 text-[11px] font-medium text-[#3C0008] group-hover:opacity-70 transition-opacity">
          <span>View credential</span>
          <ExternalLinkIcon />
        </div>
      )}
    </div>
  );

  return hasLink ? (
    <a href={cert.url} target="_blank" rel="noopener noreferrer">
      {inner}
    </a>
  ) : (
    <div>{inner}</div>
  );
}

export default function Certifications() {
  return (
    <section id="certificates" className="scroll-mt-28 bg-[#FAF8F5] px-6 py-16">
      <div className="max-w-4xl mx-auto">
        <p className="text-[11px] uppercase tracking-[0.2em] text-[#3C0008] italic mb-12 text-center">
          Certifications
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {portfolioData.certifications.map((cert) => (
            <CertCard key={cert.id} cert={cert} />
          ))}
        </div>
      </div>
    </section>
  );
}
