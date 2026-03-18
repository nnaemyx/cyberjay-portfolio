"use client";

import { useState } from "react";
import type { Project } from "../types";
import ScrollReveal from "./ScrollReveal";

interface Props {
  projects: Project[];
  loading: boolean;
}

const FILTERS = ["All", "Web2", "Mobile", "Other"] as const;
type Filter = (typeof FILTERS)[number];

function getCategoryColor(category: string) {
  switch (category) {
    case "Web2":
      return "bg-blue-500/10 text-blue-400 border-blue-500/30";
    case "Mobile":
      return "bg-green-500/10 text-green-400 border-green-500/30";
    default:
      return "bg-gray-500/10 text-gray-400 border-gray-500/30";
  }
}

export default function ProjectsSection({ projects, loading }: Props) {
  const [filter, setFilter] = useState<Filter>("All");
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered =
    filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="projects" className="py-24 px-4 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-14">
            <p
              className="text-primary text-sm tracking-widest uppercase mb-3"
              style={{ fontFamily: "monospace" }}
            >
              What I've built
            </p>
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground">
              Featured <span className="text-primary">Projects</span>
            </h2>
            <p className="text-muted-foreground mt-4 text-base max-w-xl mx-auto">
              Each project tells a story of challenges overcome and impact created.
            </p>
          </div>
        </ScrollReveal>

        {/* Filter tabs */}
        <ScrollReveal delay={100}>
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  filter === f
                    ? "bg-primary text-primary-foreground"
                    : "border border-border text-muted-foreground hover:border-primary hover:text-foreground"
                }`}
                style={
                  filter === f
                    ? { boxShadow: "0 4px 16px rgba(59,130,246,0.25)" }
                    : {}
                }
              >
                {f}
                {f !== "All" && (
                  <span className="ml-1.5 opacity-60 text-xs">
                    ({projects.filter((p) => p.category === f).length})
                  </span>
                )}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Projects grid */}
        {loading ? (
          <div className="grid md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="rounded-2xl border border-border overflow-hidden animate-pulse"
                style={{ background: "#0d1526" }}
              >
                <div className="aspect-video bg-muted/20" />
                <div className="p-6 space-y-3">
                  <div className="h-5 bg-muted/20 rounded w-3/4" />
                  <div className="h-4 bg-muted/20 rounded w-full" />
                  <div className="h-4 bg-muted/20 rounded w-5/6" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            No {filter !== "All" ? filter : ""} projects available yet.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {filtered.map((project, i) => (
              <ScrollReveal key={project._id} delay={80 * (i % 4)}>
                <article
                  className="rounded-2xl border border-border overflow-hidden hover:border-primary/30 transition-all group"
                  style={{ background: "#0d1526" }}
                >
                  {/* Image */}
                  <div className="aspect-video relative overflow-hidden bg-muted/10">
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <svg className="w-12 h-12 text-border" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                    {/* Category badge */}
                    <div className="absolute top-3 right-3">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border backdrop-blur-sm ${getCategoryColor(project.category)}`}>
                        {project.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-foreground mb-2">
                      {project.title}
                    </h3>

                    {/* Description — expandable */}
                    <div>
                      <p
                        className={`text-muted-foreground text-sm leading-relaxed transition-all ${
                          expanded === project._id ? "" : "line-clamp-2"
                        }`}
                      >
                        {project.description}
                      </p>
                      {project.description.length > 120 && (
                        <button
                          onClick={() =>
                            setExpanded(
                              expanded === project._id ? null : project._id
                            )
                          }
                          className="text-primary text-xs mt-1 hover:underline"
                        >
                          {expanded === project._id ? "Show less" : "Read more"}
                        </button>
                      )}
                    </div>

                    {/* Tech tags */}
                    {project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-4">
                        {project.technologies.slice(0, 4).map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-0.5 rounded-full text-xs text-primary border border-primary/20"
                            style={{ background: "rgba(59,130,246,0.06)" }}
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 4 && (
                          <span className="px-2.5 py-0.5 rounded-full text-xs text-muted-foreground border border-border">
                            +{project.technologies.length - 4}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Links */}
                    <div className="flex gap-3 mt-5">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-xs font-semibold hover:bg-primary/90 transition-all"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                          Live Demo
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 px-4 py-2 border border-border rounded-lg text-xs font-semibold text-muted-foreground hover:border-primary hover:text-primary transition-all"
                        >
                          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                          </svg>
                          Source
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
