"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import emailjs from '@emailjs/browser';
import {
  TwitterIcon,
  TelegramIcon,
  FacebookIcon,
  GitHubIcon,
  ExternalLinkIcon,
  CodeIcon,
} from "./components/Icons";
import ScrollReveal from "./components/ScrollReveal";

interface Project {
  _id: string;
  title: string;
  description: string;
  image?: string;
  liveUrl?: string;
  githubUrl?: string;
  technologies: string[];
  category: "Web3" | "Web2" | "Mobile" | "Other";
  featured: boolean;
  order: number;
}

interface WorkExperience {
  _id: string;
  title: string;
  company: string;
  location?: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
  order: number;
}

interface Service {
  _id: string;
  title: string;
  description: string;
  icon?: string;
  order: number;
}

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [experiences, setExperiences] = useState<WorkExperience[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [projectFilter, setProjectFilter] = useState<
    "All" | "Web3" | "Web2" | "Mobile" | "Other"
  >("All");
  const [contactForm, setContactForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [contactStatus, setContactStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      const [projectsRes, experiencesRes, servicesRes] = await Promise.all([
        fetch("/api/projects"),
        fetch("/api/work-experience"),
        fetch("/api/services"),
      ]);

      const projectsData = await projectsRes.json();
      const experiencesData = await experiencesRes.json();
      const servicesData = await servicesRes.json();

      if (projectsData.success) setProjects(projectsData.data);
      if (experiencesData.success) setExperiences(experiencesData.data);
      if (servicesData.success) setServices(servicesData.data);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    });
  };

  const filteredProjects =
    projectFilter === "All"
      ? projects
      : projects.filter((project) => project.category === projectFilter);

  const getCategoryBadgeColor = (category: string) => {
    switch (category) {
      case "Web3":
        return "bg-purple-500/10 text-purple-400 border-purple-500/30";
      case "Web2":
        return "bg-blue-500/10 text-blue-400 border-blue-500/30";
      case "Mobile":
        return "bg-green-500/10 text-green-400 border-green-500/30";
      default:
        return "bg-gray-500/10 text-gray-400 border-gray-500/30";
    }
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setContactStatus('sending');

    try {
      // EmailJS configuration - Get these from your EmailJS dashboard
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'your_service_id';
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'your_template_id';
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'your_public_key';

      // Send email using EmailJS
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: contactForm.name,
          from_email: contactForm.email,
          subject: contactForm.subject,
          message: contactForm.message,
          to_email: 'edehjohnpaul@gmail.com', // Your email
        },
        publicKey
      );

      setContactStatus('success');
      setContactForm({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setContactStatus('idle'), 5000);
    } catch (error) {
      console.error('EmailJS Error:', error);
      setContactStatus('error');
      setTimeout(() => setContactStatus('idle'), 5000);
    }
  };

  return (
    <div className="min-h-screen bg-[#090A0C]">
      {/* Desktop Header */}
      <header className="hidden lg:block  fixed top-10 left-1/2 -translate-x-1/2 z-50 w-full max-w-[850px]">
        <nav className="backdrop-blur-xl border bg-[#141414] border-border rounded-[20px] px-4 py-3 flex justify-between gap-6">
          <div className="flex items-center gap-3">
          <div>
              <Image
                src="/images/Frame 2087328881.svg"
                alt="Johnpaul"
                width={40}
                height={40}
              />
          </div>
            <span className="text-foreground text-[15px] font-medium whitespace-nowrap flex items-center gap-2">
              Johnpaul{" "}
              <span>
              <div className="w-2 h-2 rounded-full bg-[#00B66F] animate-pulse" />
              </span>
              Web3 & Full-stack Developer
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://twitter.com/edehjohnpaul"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-muted-foreground hover:text-foreground transition-colors"
              title="Twitter/X"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a
              href="https://t.me/mydevportfolio"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-muted-foreground hover:text-foreground transition-colors"
              title="Telegram"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
              </svg>
            </a>
            <a
              href="https://facebook.com/edehjohnpaul25"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-muted-foreground hover:text-foreground transition-colors"
              title="Facebook"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a
              href="https://github.com/nnaemyx"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-muted-foreground hover:text-foreground transition-colors"
              title="GitHub"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
            <a
              href="mailto:edehjohnpaul@gmail.com"
              className="p-2 text-muted-foreground hover:text-foreground transition-colors"
              title="Email me"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </a>
            <a 
              href="https://calendly.com/edehjohnpaul" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-primary text-primary-foreground px-5 py-2.5 rounded-[14px] text-[15px] font-medium hover:bg-primary/90 transition-colors ml-2 inline-block"
            >
              Book a Call
            </a>
          </div>
        </nav>
      </header>

      {/* Mobile Header */}
      <header className="lg:hidden fixed block mx-auto left-0 top-3 right-0 z-50 bg-[#141414] w-full max-w-[361px] backdrop-blur-xl  border border-solid border-[#FFFFFF08] rounded-[12px]">
        <nav className="px-4 py-3 flex items-center justify-between">
          <Image
            src="/images/Frame 2087328881.svg"
            alt="Johnpaul"
            width={40}
            height={40}
            className="rounded-lg"
          />

          <div className="flex items-center gap-4">
          <a 
            href="https://calendly.com/your-username" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-primary text-primary-foreground px-6 py-2 rounded-lg text-[14px] font-medium hover:bg-primary/90 transition-colors inline-block"
          >
            Book a call
          </a>
          
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-foreground p-1"
            aria-label="Toggle menu"
          >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={2}
              >
              {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
              )}
            </svg>
          </button>
          </div>
        </nav>

        {mobileMenuOpen && (
          <div className="bg-card border-t border-border py-6 px-5 animate-in slide-in-from-top duration-200">
            <div className="flex flex-col gap-6">
              <a
                href="#work"
                className="text-foreground text-base hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Work
              </a>
              <a
                href="#experience"
                className="text-foreground text-base hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Experience
              </a>
              <a
                href="#about"
                className="text-foreground text-base hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                About Me
              </a>
              <a
                href="#contact"
                className="text-foreground text-base hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
          </a>
        </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <main className="pt-24 mt-[92px] lg:mt-[132px]">
        <section className="mb-32 lg:mb-40 max-w-[820px] mx-auto lg:px-0 px-4">
          <div className="flex flex-col lg:flex-row items-start">
            <div className="flex-1 flex flex-col gap-[36px]">
              <div className="animate-in fade-in slide-in-from-left duration-500">
                <Image
                  src="/images/Frame 2087328884.svg"
                  alt="Johnpaul"
                  width={120}
                  height={120}
                />
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-medium text-[#ACACAC] leading-tight animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
                Hey, I'm <span className="text-[#F9F9F9]">Johnpaul</span>.<br />
                <span className="text-[#ACACAC]">
                  Web3 & Full-stack Developer.
                </span>
              </h1>
              <p className="text-muted-foreground text-lg lg:text-xl leading-relaxed max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
                Hello there, I'm Johnpaul, a full-stack developer specializing
                in Web3 and blockchain technologies. I build decentralized
                applications, smart contracts, and innovative digital
                experiences for the future of the web.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
                <a 
                  href="#contact" 
                  className="bg-primary text-primary-foreground px-8 py-3.5 rounded-[12px] text-[15px] font-medium hover:bg-primary/90 hover:scale-105 transition-all text-center"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                >
                  Hire me!
                </a>
                <div className="flex gap-4 ">
                  <div className="inline-flex w-full max-w-auto mx-auto text-center justify-center items-center gap-2 bg-[#00B66F]/10 border border-[#00B66F]/30 rounded-full px-4 py-2">
                  <div className="w-2 h-2 rounded-full bg-[#00B66F] animate-pulse" />
                    <span className="text-[15px] lg:text-[16px] text-[#00B66F]">
                      Available for new project
                    </span>
                </div>
              </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* About Me Section */}
      <section id="about" className="py-20 px-5 lg:px-20">
        <div className="max-w-[820px] mx-auto">
          <div className="text-left mb-16">
            <ScrollReveal>
              <h2 className="text-3xl lg:text-4xl font-medium mb-8 text-center text-foreground">
                About Me
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <div className="space-y-6 text-muted-foreground text-lg leading-relaxed max-w-4xl mx-auto">
                <p>
                  I am a software developer with more than 3 years of experience
                  in full-stack and Web3 development. I specialize in building
                  decentralized applications (dApps), smart contracts, and
                  modern web solutions using cutting-edge technologies.
                </p>
                <p>
                  My Web3 expertise includes{" "}
                  <span className="text-primary font-medium">
                    Solidity, Ethereum, Hardhat, Web3.js, Ethers.js, IPFS, and
                    blockchain integration
                  </span>
                  . On the full-stack side, I work with{" "}
                  <span className="text-primary font-medium">
                    React, Next.js, TypeScript, Node.js, MongoDB, and Tailwind
                    CSS
                  </span>
                  .
                </p>
                <p>
                  With a proven track record of creating efficient and scalable
                  applications, I bridge the gap between Web2 and Web3,
                  delivering user-friendly, high-performing solutions that shape
                  the future of the decentralized internet.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* What I Can Do For You */}
      <section id="services" className="py-20 px-5 lg:px-20">
        <div className="max-w-[820px] mx-auto">
          <ScrollReveal>
            <h2 className="text-3xl lg:text-4xl font-medium mb-12 text-center text-[#F6F6F6]">
              What I can do for you
            </h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 gap-6">
            {loading ? (
              <div className="col-span-2 text-center py-12 text-muted-foreground">
                Loading services...
              </div>
            ) : services.length === 0 ? (
              <div className="col-span-2 text-center py-12 text-muted-foreground">
                No services available
              </div>
            ) : (
              services.map((service, index) => (
                <ScrollReveal key={service._id} delay={100 * (index + 1)}>
                  <div className="bg-card p-8 rounded-2xl border border-border hover:border-primary/30 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                    {service.icon && (
                      <div className="text-3xl mb-3">{service.icon}</div>
                    )}
                    <h3 className="text-xl font-semibold mb-3 text-foreground">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </ScrollReveal>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Work Experience */}
      <section id="experience" className="py-20 px-5 lg:px-20">
        <div className="max-w-[820px] mx-auto">
          <ScrollReveal>
            <h2 className="text-3xl lg:text-4xl text-center font-medium mb-12 text-[#F6F6F6]">
              Work Experience
            </h2>
          </ScrollReveal>
          <div className="space-y-8">
            {loading ? (
              <div className="text-center py-12 text-muted-foreground">
                Loading experiences...
              </div>
            ) : experiences.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                No work experiences available
              </div>
            ) : (
              experiences.map((experience, index) => (
                <ScrollReveal key={experience._id} delay={100 * (index + 1)}>
                  <div
                    className={`border-l-2 ${
                      index === 0 ? "border-primary" : "border-border"
                    } pl-6`}
                  >
                    <h3 className="text-xl font-semibold text-foreground">
                      {experience.title}
                    </h3>
                    <p
                      className={`${
                        index === 0 ? "text-primary" : "text-muted-foreground"
                      } mb-2`}
                    >
                      {experience.company}{" "}
                      {experience.location && `• ${experience.location}`}
                    </p>
                    <p className="text-sm text-muted-foreground mb-3">
                      {formatDate(experience.startDate)} -{" "}
                      {experience.current
                        ? "Present"
                        : experience.endDate
                        ? formatDate(experience.endDate)
                        : "N/A"}
                    </p>
                    <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                      {experience.description}
                    </p>
                  </div>
                </ScrollReveal>
              ))
            )}
          </div>
        </div>
      </section>

      {/* My Works */}
      <section id="works" className="py-20 px-5 lg:px-20">
        <div className="max-w-[1200px] mx-auto">
          <ScrollReveal>
            <h2 className="text-3xl lg:text-4xl font-medium text-center text-[#F6F6F6] mb-8">
              My Works
            </h2>
          </ScrollReveal>

          {/* Category Filter */}
          <ScrollReveal delay={100}>
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {(["All", "Web3", "Web2", "Mobile", "Other"] as const).map(
                (category) => (
                  <button
                    key={category}
                    onClick={() => setProjectFilter(category)}
                    className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                      projectFilter === category
                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                        : "bg-card border border-border text-muted-foreground hover:border-primary hover:text-foreground"
                    }`}
                  >
                    {category}
                    {category !== "All" && (
                      <span className="ml-2 text-xs opacity-70">
                        (
                        {projects.filter((p) => p.category === category).length}
                        )
                      </span>
                    )}
                  </button>
                )
              )}
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-8">
            {loading ? (
              <div className="col-span-2 text-center py-12 text-muted-foreground">
                Loading projects...
              </div>
            ) : filteredProjects.length === 0 ? (
              <div className="col-span-2 text-center py-12 text-muted-foreground">
                No {projectFilter !== "All" ? projectFilter : ""} projects
                available
              </div>
            ) : (
              filteredProjects.map((project, index) => (
                <ScrollReveal key={project._id} delay={100 * (index + 1)}>
                  <div className="bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                    <div className="aspect-video bg-gradient-to-br from-muted/20 to-muted/40 relative overflow-hidden">
                      {project.image ? (
          <Image
                          src={project.image} 
                          alt={project.title}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                          Project Screenshot
                        </div>
                      )}
                      {/* Category Badge */}
                      <div className="absolute top-4 right-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold border backdrop-blur-sm ${getCategoryBadgeColor(
                            project.category
                          )}`}
                        >
                          {project.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-xl font-semibold text-foreground">
                          {project.title}
                        </h3>
                      </div>
                      <p className="text-muted-foreground mb-4">
                        {project.description}
                      </p>
                      
                      {project.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.technologies.slice(0, 3).map((tech, i) => (
                            <span
                              key={i}
                              className="px-2 py-1 bg-secondary text-secondary-foreground rounded text-xs"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                      
                      <div className="flex gap-3">
                        {project.liveUrl && (
                          <a 
                            href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
                            className="px-4 py-2 bg-primary text-primary-foreground rounded-[14px] font-medium hover:bg-primary/90 hover:scale-105 transition-all text-sm flex items-center gap-2"
                          >
                            <span>View Project</span>
                            <ExternalLinkIcon />
                          </a>
                        )}
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
                            className="px-4 py-2 border border-border rounded-[14px] hover:border-primary hover:scale-105 transition-all text-sm flex items-center gap-2 text-foreground"
                          >
                            <CodeIcon />
                            <span>Source Code</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-5 lg:px-20">
        <div className="max-w-3xl mx-auto text-center">
          <ScrollReveal>
            <h2 className="text-[32px] font-medium mb-4 text-[#F9F9F9]">
              Reach out to me!
            </h2>
            <p className="text-muted-foreground mb-12">
              Let's connect and discuss how we can work together on your next
              project.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <form onSubmit={handleContactSubmit} className="space-y-6">
              {contactStatus === 'success' && (
                <div className="bg-green-500/10 border border-green-500/30 text-green-400 px-6 py-4 rounded-[14px] text-center">
                  ✓ Message sent successfully! I'll get back to you soon.
                </div>
              )}
              {contactStatus === 'error' && (
                <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-6 py-4 rounded-[14px] text-center">
                  ✗ Failed to send message. Please try again or email me directly.
                </div>
              )}
              <div className="grid md:grid-cols-2 gap-6">
                <input
                  type="text"
                  placeholder="Your Name"
                  required
                  value={contactForm.name}
                  onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                  className="w-full px-6 py-4 bg-[#141414] border border-border rounded-[14px] focus:border-primary focus:outline-none transition-colors text-foreground placeholder:text-muted-foreground"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  required
                  value={contactForm.email}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  className="w-full px-6 py-4 bg-[#141414] border border-border rounded-[14px] focus:border-primary focus:outline-none transition-colors text-foreground placeholder:text-muted-foreground"
                />
              </div>
              <input
                type="text"
                placeholder="Subject"
                required
                value={contactForm.subject}
                onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                className="w-full px-6 py-4 bg-[#141414] border border-border rounded-[14px] focus:border-primary focus:outline-none transition-colors text-foreground placeholder:text-muted-foreground"
              />
              <textarea
                placeholder="Your Message"
                rows={6}
                required
                value={contactForm.message}
                onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                className="w-full px-6 py-4 bg-[#141414] border border-border rounded-[14px] focus:border-primary focus:outline-none transition-colors resize-none text-foreground placeholder:text-muted-foreground"
              ></textarea>
              <button
                type="submit"
                disabled={contactStatus === 'sending'}
                className="w-full px-8 py-4 bg-primary text-primary-foreground rounded-[14px] font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {contactStatus === 'sending' ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </ScrollReveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-5 lg:px-20 border-t border-border">
        <div className="max-w-[720px] mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-6 text-foreground">
              Let's Connect
            </h3>
            <div className="flex justify-center gap-8">
              <a
                href="https://twitter.com/edehjohnpaul"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors p-2"
                aria-label="Twitter"
              >
                <TwitterIcon />
              </a>
              <a
                href="https://t.me/mydevportfolio"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors p-2"
                aria-label="Telegram"
              >
                <TelegramIcon />
              </a>
              <a
                href="https://facebook.com/edehjohnpaul25"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors p-2"
                aria-label="Facebook"
              >
                <FacebookIcon />
              </a>
              <a
                href="https://github.com/nnaemyx"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors p-2"
                aria-label="GitHub"
              >
                <GitHubIcon />
              </a>
            </div>
          </div>
          <div className="text-center text-muted-foreground text-sm">
            <p>© 2024 Johnpaul. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
