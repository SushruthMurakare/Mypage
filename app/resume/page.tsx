import Nav from "@/components/Nav";

export const metadata = {
  title: "Resume — Sushruth Murakare",
  description: "Resume of Sushruth Murakare, full-stack software engineer.",
};

export default function ResumePage() {
  return (
    <main className="bg-[#FAF8F5] min-h-screen">
      <Nav />

      <div className="max-w-4xl mx-auto px-6 pt-28 pb-16">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#3C0008] italic mb-2">
              Resume
            </p>
            <h1
              className="font-black tracking-tight text-[#3C0008] leading-none"
              style={{ fontSize: "clamp(32px, 6vw, 64px)" }}
            >
              Sushruth Murakare
            </h1>
          </div>

          <a
            href="/Sushruth_Resume.pdf"
            download
            className="inline-flex items-center gap-2 bg-[#3C0008] text-white text-sm font-medium px-5 py-2.5 rounded-full hover:bg-[#5a0010] transition-colors self-start sm:self-auto"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Download PDF
          </a>
        </div>

        <div className="rounded-2xl overflow-hidden border border-zinc-200/70 shadow-sm bg-white">
          <iframe
            src="/Sushruth_Resume.pdf"
            title="Sushruth Murakare Resume"
            className="w-full"
            style={{ height: "85vh", minHeight: "600px" }}
          />
        </div>
      </div>
    </main>
  );
}
