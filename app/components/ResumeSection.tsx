"use client";

/**
 * Interactive Resume Section
 *
 * TO ADD YOUR REAL CV:
 * 1. Place your PDF file(s) inside the `public/files/` folder, e.g.:
 *      public/files/Johnpaul-CV.pdf
 * 2. Update the `cvTypes` array below with the correct `file` paths and labels.
 *
 * The iframe will automatically load and display the selected PDF.
 */

import { useState } from "react";
import ScrollReveal from "./ScrollReveal";

const cvTypes = [
  {
    label: "Full-stack Developer",
    // ← Replace with your actual full-stack CV PDF
    file: "/files/Johnpaul_Edeh_FullStack_Developer-compressed.pdf",
  },
  {
    label: "Frontend Developer",
    // ← Replace with a frontend-focused CV PDF (or keep same file)
    file: "/files/Johnpaul_Edeh_Frontend_Developer.pdf",
  },
  {
    label: "Backend Developer",
    // ← Replace with a backend-focused CV PDF (or keep same file)
    file: "/files/Johnpaul_Edeh_Backend_Developer.pdf",
  },
];

export default function ResumeSection() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selected = cvTypes[selectedIndex];

  return (
    <section id="resume" className="py-24 px-4 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* ── Heading ── */}
        <ScrollReveal>
          <div className="text-center mb-10">
            <h2
              className="text-4xl lg:text-6xl font-bold mb-3"
              style={{
                background:
                  "linear-gradient(135deg, #60a5fa 0%, #3b82f6 50%, #2563eb 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Interactive Resume
            </h2>
            {/* Blue underline accent */}
            <div className="flex justify-center mb-4">
              <div
                className="h-1 w-20 rounded-full"
                style={{
                  background:
                    "linear-gradient(90deg, #60a5fa, #2563eb)",
                }}
              />
            </div>
            <p className="text-muted-foreground text-base max-w-lg mx-auto">
              Explore my professional journey, skills, and education in detail.
            </p>
          </div>
        </ScrollReveal>

        {/* ── Selector row ── */}
        <ScrollReveal delay={100}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-3">
            {/* Dropdown */}
            <div className="relative">
              <select
                value={selectedIndex}
                onChange={(e) => setSelectedIndex(Number(e.target.value))}
                className="appearance-none px-5 py-2.5 pr-10 rounded-lg text-sm font-medium text-foreground border border-border cursor-pointer focus:outline-hidden focus:border-primary transition-colors"
                style={{ background: "#0d1526", minWidth: "200px" }}
              >
                {cvTypes.map((cv, i) => (
                  <option key={cv.label} value={i}>
                    {cv.label}
                  </option>
                ))}
              </select>
              {/* Chevron icon */}
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </div>

            {/* Download button */}
            <a
              href={selected.file}
              download={`Johnpaul-CV-${selected.label.replace(/\s+/g, "-")}.pdf`}
              className="flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold text-primary-foreground transition-all"
              style={{
                background: "#3b82f6",
                boxShadow: "0 4px 16px rgba(59,130,246,0.35)",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.boxShadow =
                  "0 6px 24px rgba(59,130,246,0.55)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.boxShadow =
                  "0 4px 16px rgba(59,130,246,0.35)")
              }
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download CV
            </a>
          </div>

          {/* Helper text */}
          <p className="text-center text-xs text-muted-foreground mb-6">
            Use the selector to switch between CVs. Each one opens a live preview and can be downloaded instantly.
          </p>
        </ScrollReveal>

        {/* ── PDF Iframe ── */}
        <ScrollReveal delay={200}>
          <div
            className="rounded-xl overflow-hidden border border-border"
            style={{ background: "#0d1526" }}
          >
            <iframe
              key={selected.file}
              src={selected.file}
              title={`${selected.label} Resume`}
              className="w-full"
              style={{ height: "700px", border: "none" }}
            />
          </div>
          <p className="text-center text-xs text-muted-foreground mt-3">
            📄 Can&apos;t see the PDF?{" "}
            <a
              href={selected.file}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline underline-offset-2"
            >
              Open in a new tab
            </a>
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
