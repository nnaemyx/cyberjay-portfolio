import ScrollReveal from "./ScrollReveal";

const stats = [
  { value: "4+", label: "Years of Experience", sub: "Building web applications" },
  { value: "20+", label: "Projects Delivered", sub: "Across diverse industries" },
  { value: "10+", label: "Happy Clients", sub: "Trusted partnerships" },
  { value: "5+", label: "Technologies", sub: "Mastered across the stack" },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-24 px-4 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <ScrollReveal>
          <div className="text-center mb-14">
            <p className="text-primary text-sm tracking-widest uppercase mb-3" style={{ fontFamily: "monospace" }}>
              Get to know me
            </p>
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground">
              About <span className="text-primary">Me</span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Bio */}
          <div className="space-y-5">
            <ScrollReveal delay={100}>
              <p className="text-muted-foreground text-[17px] leading-relaxed">
                Hello 👋 I&apos;m Johnpaul, a{" "}
                <span className="text-foreground font-medium">
                  Full-stack Developer
                </span>{" "}
                with over 4 years of professional experience building scalable,
                secure, and high-performance digital platforms.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={150}>
              <p className="text-muted-foreground text-[17px] leading-relaxed">
                I design and deliver modern web applications using{" "}
                <span className="text-primary font-medium">
                  React, Next.js, TypeScript, Node.js, MongoDB, and Tailwind CSS
                </span>
                . I also work with{" "}
                <span className="text-primary font-medium">
                  TanStack Query, Redux, Zustand, and RESTful APIs
                </span>
                .
              </p>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <p className="text-muted-foreground text-[17px] leading-relaxed">
                With a proven track record of creating efficient and scalable
                applications, I deliver user-friendly, high-performing solutions
                that meet modern web development standards and best practices.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={250}>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 mt-2 text-primary text-sm font-medium hover:gap-3 transition-all"
              >
                Let&apos;s work together
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </ScrollReveal>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, i) => (
              <ScrollReveal key={stat.label} delay={150 + i * 80}>
                <div
                  className="p-6 rounded-xl border border-border hover:border-primary/40 transition-all group"
                  style={{ background: "#0d1526" }}
                >
                  <p className="text-4xl font-bold text-primary mb-1 group-hover:scale-105 transition-transform">
                    {stat.value}
                  </p>
                  <p className="text-foreground text-sm font-semibold mb-0.5">{stat.label}</p>
                  <p className="text-muted-foreground text-xs">{stat.sub}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
