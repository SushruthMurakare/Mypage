import Image from "next/image";
import portfolioData from "@/data/portfolio.json";

type Testimonial = (typeof portfolioData.Testimonials)[number];

function QuoteIcon() {
  return (
    <svg width="24" height="20" viewBox="0 0 24 20" fill="currentColor" aria-hidden="true" className="text-[#3C0008]/20">
      <path d="M0 20V12.5C0 8.167 1.417 4.75 4.25 2.25 7.083-.25 10.833-.833 15.5 0L14 3.5C12 3.167 10.167 3.708 8.5 5.125 6.833 6.542 6 8.333 6 10.5V11h4V20H0zm14 0V12.5c0-4.333 1.417-7.75 4.25-10.25C21.083-.25 24.833-.833 29.5 0L28 3.5C26 3.167 24.167 3.708 22.5 5.125 20.833 6.542 20 8.333 20 10.5V11h4V20H14z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const initials = testimonial.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="flex flex-col justify-between p-6 rounded-2xl border border-zinc-200/70 bg-white/60 h-full">
      <div>
        <QuoteIcon />
        <p className="mt-4 text-sm text-zinc-700 leading-relaxed">
          {testimonial.recommendation}
        </p>
      </div>

      <div className="mt-6 flex items-center gap-3">
        {testimonial.image ? (
          <div className="relative w-9 h-9 rounded-full overflow-hidden flex-shrink-0">
            <Image
              src={testimonial.image}
              alt={testimonial.name}
              fill
              sizes="36px"
              className="object-cover"
            />
          </div>
        ) : (
          <div className="w-9 h-9 rounded-full bg-[#3C0008]/10 flex items-center justify-center flex-shrink-0">
            <span className="text-[11px] font-semibold text-[#3C0008]">{initials}</span>
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <p className="text-sm font-medium text-zinc-900 leading-tight">{testimonial.name}</p>
            {testimonial.linkedin && (
              <a
                href={testimonial.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${testimonial.name} on LinkedIn`}
                className="text-[#3C0008]/50 hover:text-[#3C0008] transition-colors"
              >
                <LinkedInIcon />
              </a>
            )}
          </div>
          <p className="text-[11px] text-zinc-500 mt-0.5">
            {testimonial.title} · {testimonial.company}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="bg-[#FAF8F5] px-6 py-16">
      <div className="max-w-4xl mx-auto">
        <p className="text-[11px] uppercase tracking-[0.2em] text-[#3C0008] italic mb-12 text-center">
          What my co-workers say
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {portfolioData.Testimonials.map((testimonial, idx) => (
            <TestimonialCard key={idx} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}
