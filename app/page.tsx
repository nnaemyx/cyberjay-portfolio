"use client";

import { useState, useEffect } from "react";
import type { Project, WorkExperience } from "./types";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import MarqueeStrip from "./components/MarqueeStrip";
import AboutSection from "./components/AboutSection";
import ProjectsSection from "./components/ProjectsSection";
import ExperienceSection from "./components/ExperienceSection";
import SkillsSection from "./components/SkillsSection";
import ResumeSection from "./components/ResumeSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [experiences, setExperiences] = useState<WorkExperience[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectsRes, experiencesRes] = await Promise.all([
          fetch("/api/projects"),
          fetch("/api/work-experience"),
        ]);
        const projectsData = await projectsRes.json();
        const experiencesData = await experiencesRes.json();
        if (projectsData.success) setProjects(projectsData.data);
        if (experiencesData.success) setExperiences(experiencesData.data);
      } catch (error) {
        console.error("Failed to fetch portfolio data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <MarqueeStrip />
        <AboutSection />
        <ProjectsSection projects={projects} loading={loading} />
        <ExperienceSection experiences={experiences} loading={loading} />
        <SkillsSection />
        <ResumeSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
