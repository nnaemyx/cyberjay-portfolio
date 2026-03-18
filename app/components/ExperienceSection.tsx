"use client";

import { useState } from "react";
import type { WorkExperience } from "../types";
import ScrollReveal from "./ScrollReveal";

interface Props {
  experiences: WorkExperience[];
  loading: boolean;
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
  });
}

export default function ExperienceSection({ experiences, loading }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="experience"
      className="py-24 px-4 lg:px-8"
      style={{ background: "#0a0f1c" }}
    >
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-14">
            <p
              className="text-primary text-sm tracking-widest uppercase mb-3"
              style={{ fontFamily: "monospace" }}
            >
              Where I&apos;ve worked
            </p>
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground">
              My <span className="text-primary">Journey</span>
            </h2>
            <p className="text-muted-foreground mt-4 text-base max-w-xl mx-auto">
              Every role has shaped who I am — filled with challenges, learning,
              and victories.
            </p>
          </div>
        </ScrollReveal>

        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="rounded-xl border border-border p-6 animate-pulse"
                style={{ background: "#0d1526" }}
              >
                <div className="h-5 bg-muted/20 rounded w-1/2 mb-2" />
                <div className="h-4 bg-muted/20 rounded w-1/3" />
              </div>
            ))}
          </div>
        ) : experiences.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            No work experience added yet.
          </div>
        ) : (
          <div className="space-y-4">
            {experiences.map((exp, i) => {
              const isOpen = openIndex === i;
              return (
                <ScrollReveal key={exp._id} delay={80 * i}>
                  <div
                    className={`rounded-xl border transition-all ${
                      isOpen ? "border-primary/40" : "border-border hover:border-primary/20"
                    }`}
                    style={{ background: "#0d1526" }}
                  >
                    {/* Header — clickable */}
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : i)}
                      className="w-full text-left px-6 py-5 flex items-center justify-between gap-4"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <h3 className="text-foreground font-semibold text-base truncate">
                            {exp.title}
                          </h3>
                          {exp.current && (
                            <span className="px-2 py-0.5 rounded-full text-xs font-medium text-green-400 border border-green-500/30 bg-green-500/10">
                              Current
                            </span>
                          )}
                        </div>
                        <p className="text-primary text-sm">
                          {exp.company}
                          {exp.location && (
                            <span className="text-muted-foreground"> · {exp.location}</span>
                          )}
                        </p>
                        <p className="text-muted-foreground text-xs mt-0.5">
                          {formatDate(exp.startDate)} —{" "}
                          {exp.current
                            ? "Present"
                            : exp.endDate
                            ? formatDate(exp.endDate)
                            : "N/A"}
                        </p>
                      </div>

                      {/* Chevron */}
                      <span
                        className="shrink-0 w-8 h-8 flex items-center justify-center rounded-lg border border-border transition-all"
                        style={{
                          background: isOpen
                            ? "rgba(59,130,246,0.10)"
                            : "transparent",
                          borderColor: isOpen ? "rgba(59,130,246,0.30)" : undefined,
                          transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                          transition: "transform 0.25s ease, background 0.2s",
                        }}
                      >
                        <svg
                          className="w-4 h-4 text-muted-foreground"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </span>
                    </button>

                    {/* Expanded content */}
                    {isOpen && (
                      <div className="px-6 pb-6 border-t border-border/50">
                        <p className="text-muted-foreground text-sm leading-relaxed whitespace-pre-line pt-4">
                          {exp.description}
                        </p>
                      </div>
                    )}
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
