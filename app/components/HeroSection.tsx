import Image from "next/image";

const dots = [
  { top: "12%", left: "5%", size: 3 },
  { top: "28%", left: "42%", size: 2 },
  { top: "15%", left: "78%", size: 4 },
  { top: "65%", left: "12%", size: 3 },
  { top: "50%", left: "90%", size: 2 },
  { top: "80%", left: "58%", size: 3 },
  { top: "90%", left: "28%", size: 2 },
  { top: "38%", left: "96%", size: 3 },
  { top: "72%", left: "74%", size: 2 },
  { top: "6%", left: "62%", size: 3 },
  { top: "45%", left: "2%", size: 2 },
  { top: "92%", left: "82%", size: 3 },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Background radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(59,130,246,0.07) 0%, transparent 70%)",
        }}
      />

      {/* Floating dots */}
      {dots.map((dot, i) => (
        <span
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            top: dot.top,
            left: dot.left,
            width: dot.size,
            height: dot.size,
            background: "rgba(148,163,184,0.35)",
          }}
        />
      ))}

      <div className="relative max-w-6xl mx-auto px-4 lg:px-8 py-20 lg:py-28 w-full">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-16">
          {/* ── Text column ── */}
          <div className="flex-1 flex flex-col gap-6 lg:gap-7">
            {/* Label */}
            <p
              className="animate-in fade-in slide-in-from-bottom-4 duration-500 text-primary text-sm tracking-widest uppercase"
              style={{ fontFamily: "monospace", animationDelay: "0ms" }}
            >
              Hi, my name is
            </p>

            {/* Name + role */}
            <div
              className="animate-in fade-in slide-in-from-bottom-4 duration-700"
              style={{ animationDelay: "100ms" }}
            >
              <h1 className="text-5xl lg:text-[72px] font-bold leading-none tracking-tight">
                <span className="text-foreground">Johnpaul</span>
              </h1>
              <h2 className="text-3xl lg:text-[42px] font-bold text-primary mt-1 leading-tight">
                Full-stack Developer
              </h2>
            </div>

            {/* Tagline */}
            <p
              className="animate-in fade-in slide-in-from-bottom-4 duration-700 text-lg lg:text-xl font-semibold text-foreground leading-snug max-w-lg"
              style={{ animationDelay: "200ms" }}
            >
              I build scalable, modern web applications that bring ideas to life.
            </p>

            {/* Description */}
            <p
              className="animate-in fade-in slide-in-from-bottom-4 duration-700 text-muted-foreground text-base lg:text-[17px] leading-relaxed max-w-lg"
              style={{ animationDelay: "300ms" }}
            >
              With 4+ years of experience, I craft performant full-stack
              solutions using React, Next.js, TypeScript, and Node.js —
              focusing on clean architecture and user-centric design.
            </p>

            {/* CTA Buttons */}
            <div
              className="animate-in fade-in slide-in-from-bottom-4 duration-700 flex flex-wrap gap-3"
              style={{ animationDelay: "400ms" }}
            >
              <a
                href="#projects"
                className="bg-primary text-primary-foreground px-6 py-3 rounded-lg text-sm font-semibold transition-all hover:bg-primary/90"
                style={{ boxShadow: "0 0 0 transparent" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.boxShadow =
                    "0 6px 24px rgba(59,130,246,0.4)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.boxShadow = "0 0 0 transparent")
                }
              >
                View My Work
              </a>
              <a
                href="#contact"
                className="border border-primary text-primary px-6 py-3 rounded-lg text-sm font-semibold hover:bg-primary/10 transition-all"
              >
                Hire Me
              </a>
              <a
                href="/files/Johnpaul-CV.pdf"
                className="border border-border text-muted-foreground px-6 py-3 rounded-lg text-sm font-semibold hover:border-primary hover:text-primary transition-all"
              >
                Download CV
              </a>
            </div>

            {/* Available badge */}
            <div
              className="animate-in fade-in duration-700 flex items-center gap-2"
              style={{ animationDelay: "500ms" }}
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{
                  background: "var(--green)",
                  boxShadow: "0 0 6px var(--green)",
                  animation: "pulse-dot 2s ease-in-out infinite",
                }}
              />
              <span className="text-sm text-muted-foreground">
                Available for freelance &amp; new projects
              </span>
            </div>

            {/* Social links */}
            <div
              className="animate-in fade-in duration-700 flex items-center gap-2"
              style={{ animationDelay: "600ms" }}
            >
              {/* GitHub */}
              <a
                href="https://github.com/nnaemyx"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 border border-border rounded-lg text-muted-foreground hover:text-primary hover:border-primary transition-all"
                title="GitHub"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
              {/* Twitter / X */}
              <a
                href="https://twitter.com/edehjohnpaul"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 border border-border rounded-lg text-muted-foreground hover:text-primary hover:border-primary transition-all"
                title="Twitter"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              {/* Telegram */}
              <a
                href="https://t.me/mydevportfolio"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 border border-border rounded-lg text-muted-foreground hover:text-primary hover:border-primary transition-all"
                title="Telegram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                </svg>
              </a>
              {/* Facebook */}
              <a
                href="https://facebook.com/edehjohnpaul25"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 border border-border rounded-lg text-muted-foreground hover:text-primary hover:border-primary transition-all"
                title="Facebook"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              {/* Email */}
              <a
                href="mailto:edehjohnpaul@gmail.com"
                className="p-2.5 border border-border rounded-lg text-muted-foreground hover:text-primary hover:border-primary transition-all"
                title="Email"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
            </div>
          </div>

          {/* ── Profile image column ── */}
          <div className="lg:flex-none flex justify-center">
            <div className="relative">
              {/* Blue glow behind the image */}
              <div
                className="absolute inset-0 rounded-2xl"
                style={{
                  background: "rgba(59,130,246,0.18)",
                  filter: "blur(40px)",
                  transform: "scale(1.15)",
                }}
              />
              <div
                className="relative rounded-2xl overflow-hidden border border-primary/20"
                style={{ background: "#0d1526" }}
              >
                <Image
                  src="/images/Frame 2087328884.svg"
                  alt="Johnpaul — Full-stack Developer"
                  width={360}
                  height={360}
                  priority
                  className="object-cover"
                />
              </div>
              {/* Decorative corner accent */}
              <div
                className="absolute -bottom-3 -right-3 w-16 h-16 rounded-full border border-primary/30"
                style={{ background: "rgba(59,130,246,0.06)" }}
              />
              <div
                className="absolute -top-3 -left-3 w-10 h-10 rounded-full border border-primary/20"
                style={{ background: "rgba(59,130,246,0.04)" }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-40">
        <span className="text-xs text-muted-foreground tracking-widest uppercase">scroll</span>
        <svg className="w-4 h-4 text-muted-foreground animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}
