export default function About() {
  return (
    <section id="about" className="scroll-mt-28 bg-[#FAF8F5] pt-12 md:pt-16 pb-16 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-[11px] uppercase tracking-[0.2em] text-[#3C0008] italic mb-10">
          A bit about me
        </p>
        <p
          className="font-bold leading-[1.15] tracking-tight"
          style={{ fontSize: "clamp(18px, 4.5vw, 24px)" }}
        >
          <span className="text-zinc-900">
            I&apos;m a Full-stack and AI software engineer with 4 years of
            experience building production web and mobile applications across
            insurance, telecom, geospatial, and healthcare SaaS. My core stack
            is React, Next, TypeScript, Node.js, Python, FastAPI, GraphQL, AWS,
            and Docker, with hands-on experience integrating AI tools like
            LangChain, GPT, Claude Code and Google Gemini into real products.
            What drives me is the hunger to grow as a Software Engineer, and
            what differentiates me is that I consistently go beyond
            expectations. I've been a team player, and I've managed everything
            end-to-end alone. I've worked in structured organizations, and I've
            thrived in fast-paced startup environments. I've completed assigned
            tasks, and I've taken initiative on things no one asked me to do.
            I've mentored juniors, and I've led products and features. Every
            team I've worked with has loved having me. Outside of work, you'll
            find me lifting weights, hiking trails, or trying to pet every dog I
            see. Received my Master's degree in Computer Science from Colorado
            School of Mines and ready to step back into industry with a clearer
            vision and sharper skills
          </span>
          <span className="text-zinc-400">
            {" "}
            — let's connect
          </span>
        </p>
      </div>
    </section>
  );
}
