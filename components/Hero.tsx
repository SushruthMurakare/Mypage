import Image from "next/image";
import portfolioData from "@/data/portfolio.json";

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-[#FAF8F5] flex flex-col items-center justify-center px-6 py-16">
      <div className="relative z-10 flex flex-col-reverse md:flex-row items-center gap-10 md:gap-16 max-w-6xl w-full">
        <div className="flex-1 text-center md:text-left">
          <h1
            className="animate-fade-slide-up font-black tracking-tight text-[#3C0008] leading-[1.05]"
            style={{ fontSize: "clamp(36px, 6vw, 88px)" }}
          >
            I&apos;m Sushruth Murakare, Software Engineer
          </h1>
        </div>

        <div className="relative shrink-0 aspect-square overflow-hidden rounded-full shadow-xl w-[220px] sm:w-[280px] md:w-[320px]">
          <Image
            src="/Images/MyPic.png"
            alt="Sushruth Murakare"
            fill
            priority
            className="object-cover object-top"
          />
        </div>
      </div>

      <div className="relative z-10 mt-10 flex items-center gap-3 text-sm font-medium text-zinc-500">
        {portfolioData.socials.map((social, i) => (
          <span key={`${social.id}-${social.title}`} className="flex items-center gap-3">
            {i > 0 && <span className="text-zinc-300">/</span>}
            <a
              href={social.link}
              target={social.link.startsWith("mailto") ? undefined : "_blank"}
              rel={social.link.startsWith("mailto") ? undefined : "noopener noreferrer"}
              className="hover:text-[#3C0008] transition-colors duration-200"
            >
              {social.title}
            </a>
          </span>
        ))}
      </div>
    </section>
  );
}
