import ScrollReveal from "./ScrollReveal";

const skillCategories = [
  {
    title: "Frontend Engineering",
    icon: "🖥️",
    skills: ["React", "Next.js", "TypeScript", "JavaScript", "HTML5", "CSS3", "Tailwind CSS", "Redux"],
  },
  {
    title: "Backend & APIs",
    icon: "⚙️",
    skills: ["Node.js", "Express.js", "REST APIs", "GraphQL", "WebSockets", "Next.js API Routes"],
  },
  {
    title: "Database & Storage",
    icon: "🗄️",
    skills: ["MongoDB", "Mongoose", "PostgreSQL", "Firebase", "Redis", "Data Modeling"],
  },
  {
    title: "State Management",
    icon: "🔄",
    skills: ["TanStack Query", "Redux Toolkit", "Zustand", "Context API", "React Hook Form"],
  },
  {
    title: "DevOps & Tools",
    icon: "🛠️",
    skills: ["Git", "GitHub", "Vercel", "Postman", "Docker (Basic)", "VS Code", "Linux CLI"],
  },
  {
    title: "Soft Skills",
    icon: "🤝",
    skills: ["Problem Solving", "Team Collaboration", "Technical Writing", "Mentorship", "Agile / Scrum"],
  },
];

export default function SkillsSection() {
  return (
    <section id="skills" className="py-24 px-4 lg:px-8" style={{ background: "#0a0f1c" }}>
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-14">
            <p
              className="text-primary text-sm tracking-widest uppercase mb-3"
              style={{ fontFamily: "monospace" }}
            >
              What I bring to the table
            </p>
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground">
              Skills &amp; <span className="text-primary">Expertise</span>
            </h2>
            <p className="text-muted-foreground mt-4 text-base max-w-xl mx-auto">
              A comprehensive toolkit built over 4+ years of hands-on experience
              across diverse projects.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {skillCategories.map((cat, i) => (
            <ScrollReveal key={cat.title} delay={100 * (i + 1)}>
              <div
                className="p-6 rounded-xl border border-border hover:border-primary/40 transition-all group h-full"
                style={{ background: "#0d1526" }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">{cat.icon}</span>
                  <h3 className="text-foreground font-semibold text-[15px]">
                    {cat.title}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 rounded-full text-xs font-medium text-primary border border-primary/20 hover:bg-primary/10 transition-colors"
                      style={{ background: "rgba(59,130,246,0.06)" }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
