const techStack = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "MongoDB",
  "Express.js",
  "Tailwind CSS",
  "Redux",
  "TanStack Query",
  "Zustand",
  "REST APIs",
  "Git",
  "Vercel",
  "GitHub",
  "JavaScript",
  "HTML5",
  "CSS3",
  "Mongoose",
];

export default function MarqueeStrip() {
  const doubled = [...techStack, ...techStack];

  return (
    <section
      className="py-12 border-y border-border overflow-hidden"
      style={{ background: "#0a0f1c" }}
    >
      <p className="text-center text-xs text-muted-foreground tracking-widest uppercase mb-6">
        Technologies I Work With
      </p>

      <div
        className="relative"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        }}
      >
        <div
          className="flex gap-4 w-max animate-marquee"
          style={{ willChange: "transform" }}
        >
          {doubled.map((tech, i) => (
            <span
              key={i}
              className="flex items-center gap-2 px-5 py-2 rounded-full border border-border text-sm text-muted-foreground whitespace-nowrap"
              style={{ background: "rgba(59,130,246,0.05)" }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: "#3b82f6" }}
              />
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
