import Nav from "@/components/Nav";
import HackathonsGrid from "@/components/HackathonsGrid";

export const metadata = {
  title: "Hackathons — Sushruth Murakare",
  description: "Hackathons attended by Sushruth Murakare",
};

export default function HackathonsPage() {
  return (
    <main className="bg-[#FAF8F5] min-h-screen">
      <Nav />

      <div className="max-w-4xl mx-auto px-6 pt-32 pb-24">
        {/* Page header */}
        <div className="mb-16">
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#3C0008] italic mb-4 text-center">
            Hackathons I&apos;ve competed in
          </p>
          <h1
            className="font-extralight tracking-[0.06em] text-[#3C0008] leading-none text-center whitespace-nowrap"
            style={{ fontSize: "clamp(40px, 7vw, 96px)" }}
          >
            Hackathons
          </h1>
        </div>

        <HackathonsGrid />
      </div>
    </main>
  );
}
