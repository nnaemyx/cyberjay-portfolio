'use client';

import Image from "next/image";
import { useState, useEffect } from "react";
import { TwitterIcon, LinkedInIcon, GitHubIcon, DribbbleIcon, ExternalLinkIcon, CodeIcon } from "./components/Icons";
import SlidingWorks from "./components/SlidingWorks";
import ScrollReveal from "./components/ScrollReveal";
import Logo from "../public/images/Frame 2087328881.svg"
import Logo2 from "../public/images/Frame 2087328884.svg"

interface Project {
  _id: string;
  title: string;
  description: string;
  image?: string;
  liveUrl?: string;
  githubUrl?: string;
  technologies: string[];
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

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      const [projectsRes, experiencesRes, servicesRes] = await Promise.all([
        fetch('/api/projects'),
        fetch('/api/work-experience'),
        fetch('/api/services'),
      ]);

      const projectsData = await projectsRes.json();
      const experiencesData = await experiencesRes.json();
      const servicesData = await servicesRes.json();

      if (projectsData.success) setProjects(projectsData.data);
      if (experiencesData.success) setExperiences(experiencesData.data);
      if (servicesData.success) setServices(servicesData.data);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Header */}
      <header className="hidden lg:block  fixed top-10 left-1/2 -translate-x-1/2 z-50 w-full max-w-[750px]">
        <nav className="bg-card/80 backdrop-blur-xl border bg-[#141414] border-border rounded-[20px] px-4 py-3 flex justify-between gap-6">
          <div className="flex items-center gap-3">
          <div>
            <Image src={Logo} alt="Johnpaul" width={40} height={40} />
          </div>
            <span className="text-foreground text-[15px] font-medium whitespace-nowrap flex items-center gap-2">Johnpaul <span>                  
              <div className="w-2 h-2 rounded-full bg-[#00B66F] animate-pulse" />
            </span>Web Developer</span>
          </div>

          <div className="flex items-center gap-4">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-2 text-muted-foreground hover:text-foreground transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-2 text-muted-foreground hover:text-foreground transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="p-2 text-muted-foreground hover:text-foreground transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
            <a href="mailto:hello@example.com" className="p-2 text-muted-foreground hover:text-foreground transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </a>
            <button className="bg-primary text-primary-foreground px-5 py-2.5 rounded-[14px] text-[15px] font-medium hover:bg-primary/90 transition-colors ml-2">
              Book a Call
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-xl">
        <nav className="px-4 py-3 flex items-center justify-between">
          <Image src={Logo} alt="Johnpaul" width={40} height={40} className="rounded-lg" />
          
          <button className="bg-primary text-primary-foreground px-6 py-2 rounded-lg text-[14px] font-medium hover:bg-primary/90 transition-colors">
            Book a call
          </button>
          
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-foreground p-1"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </nav>

        {mobileMenuOpen && (
          <div className="bg-card border-t border-border py-6 px-5 animate-in slide-in-from-top duration-200">
            <div className="flex flex-col gap-6">
              <a href="#work" className="text-foreground text-base hover:text-primary transition-colors" onClick={() => setMobileMenuOpen(false)}>
                Work
              </a>
              <a href="#experience" className="text-foreground text-base hover:text-primary transition-colors" onClick={() => setMobileMenuOpen(false)}>
                Experience
              </a>
              <a href="#about" className="text-foreground text-base hover:text-primary transition-colors" onClick={() => setMobileMenuOpen(false)}>
                About Me
              </a>
              <a href="#contact" className="text-foreground text-base hover:text-primary transition-colors" onClick={() => setMobileMenuOpen(false)}>
                Contact
          </a>
        </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <main className="pt-24 lg:mt-[132px]">
        <section className="mb-32 lg:mb-40 max-w-[720px] mx-auto">
          <div className="flex flex-col lg:flex-row items-start">
            <div className="flex-1 flex flex-col gap-[36px]">
              <div className="animate-in fade-in slide-in-from-left duration-500">
                <Image src={Logo2} alt="Johnpaul" width={120} height={120} />
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-medium text-[#ACACAC] leading-tight animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
                Hey, I'm <span className="text-[#F9F9F9]">Johnpaul</span>.<br />
                <span className="text-[#ACACAC]">Creative Web Developer.</span>
              </h1>
              <p className="text-muted-foreground text-lg lg:text-xl leading-relaxed max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
              Hello there, I'm Johnpaul, a full-stack developer dedicated to turning ideas into innovative web applications and digital experiences.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
                <button className="bg-primary text-primary-foreground px-8 py-3.5 rounded-[14px] text-[15px] font-medium hover:bg-primary/90 hover:scale-105 transition-all">
                  Hire me!
                </button>
                <div className="flex gap-4 ">
                <div className="inline-flex items-center gap-2 bg-[#00B66F]/10 border border-[#00B66F]/30 rounded-full px-4 py-2">
                  <div className="w-2 h-2 rounded-full bg-[#00B66F] animate-pulse" />
                  <span className="text-[15px] text-[#00B66F]">Available for new project</span>
                </div>
              </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* About Me Section */}
      <section id="about" className="py-20 px-5 lg:px-20">
        <div className="max-w-[720px] mx-auto">
          <div className="text-left mb-16">
            <ScrollReveal>
              <h2 className="text-3xl lg:text-4xl font-medium mb-8 text-center text-foreground">About Me</h2>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <div className="space-y-6 text-muted-foreground text-lg leading-relaxed max-w-4xl mx-auto">
                <p>
                  I am a software developer with more than 3 years of experience in web development. I specialize in building web solutions using modern tools and technologies, including MongoDB, React, Redux toolkit, Node.js, Express, Tailwind CSS, TypeScript and Next.js.
                </p>
                <p>
                  With a proven track record of creating efficient and scalable applications, I am committed to ensuring that your web interfaces are visually pleasing, user friendly, high-performing as well as functional in terms of user experience.
                </p>
              </div>
            </ScrollReveal>
          </div>
          
  
        </div>
      </section>

      {/* What I Can Do For You */}
      <section id="services" className="py-20 px-5 lg:px-20">
        <div className="max-w-[720px] mx-auto">
          <ScrollReveal>
            <h2 className="text-3xl lg:text-4xl font-bold mb-12 text-center text-foreground">What I can do for you</h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 gap-6">
            {loading ? (
              <div className="col-span-2 text-center py-12 text-muted-foreground">Loading services...</div>
            ) : services.length === 0 ? (
              <div className="col-span-2 text-center py-12 text-muted-foreground">No services available</div>
            ) : (
              services.map((service, index) => (
                <ScrollReveal key={service._id} delay={100 * (index + 1)}>
                  <div className="bg-card p-8 rounded-2xl border border-border hover:border-primary/30 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                    {service.icon && <div className="text-3xl mb-3">{service.icon}</div>}
                    <h3 className="text-xl font-semibold mb-3 text-foreground">{service.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                  </div>
                </ScrollReveal>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Work Experience */}
      <section id="experience" className="py-20 px-5 lg:px-20 bg-secondary">
        <div className="max-w-[720px] mx-auto">
          <ScrollReveal>
            <h2 className="text-3xl lg:text-4xl font-bold mb-12 text-foreground">Work Experience</h2>
          </ScrollReveal>
          <div className="space-y-8">
            {loading ? (
              <div className="text-center py-12 text-muted-foreground">Loading experiences...</div>
            ) : experiences.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">No work experiences available</div>
            ) : (
              experiences.map((experience, index) => (
                <ScrollReveal key={experience._id} delay={100 * (index + 1)}>
                  <div className={`border-l-2 ${index === 0 ? 'border-primary' : 'border-border'} pl-6`}>
                    <h3 className="text-xl font-semibold text-foreground">{experience.title}</h3>
                    <p className={`${index === 0 ? 'text-primary' : 'text-muted-foreground'} mb-2`}>
                      {experience.company} {experience.location && `• ${experience.location}`}
                    </p>
                    <p className="text-sm text-muted-foreground mb-3">
                      {formatDate(experience.startDate)} - {experience.current ? 'Present' : experience.endDate ? formatDate(experience.endDate) : 'N/A'}
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
            <h2 className="text-3xl lg:text-4xl font-bold mb-12 text-center text-foreground">My Works</h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 gap-8">
            {loading ? (
              <div className="col-span-2 text-center py-12 text-muted-foreground">Loading projects...</div>
            ) : projects.length === 0 ? (
              <div className="col-span-2 text-center py-12 text-muted-foreground">No projects available</div>
            ) : (
              projects.map((project, index) => (
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
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-2 text-foreground">{project.title}</h3>
                      <p className="text-muted-foreground mb-4">{project.description}</p>
                      
                      {project.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.technologies.slice(0, 3).map((tech, i) => (
                            <span key={i} className="px-2 py-1 bg-secondary text-secondary-foreground rounded text-xs">
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
            <h2 className="text-[32px] font-medium mb-4 text-[#F9F9F9]">Reach out to me!</h2>
            <p className="text-muted-foreground mb-12">
              Let's connect and discuss how we can work together on your next project.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-6 py-4 bg-[#141414] border border-border rounded-[14px] focus:border-primary focus:outline-none transition-colors text-foreground placeholder:text-muted-foreground"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-6 py-4 bg-[#141414] border border-border rounded-[14px] focus:border-primary focus:outline-none transition-colors text-foreground placeholder:text-muted-foreground"
              />
            </div>
            <input
              type="text"
              placeholder="Subject"
              className="w-full px-6 py-4 bg-[#141414] border border-border rounded-[14px] focus:border-primary focus:outline-none transition-colors text-foreground placeholder:text-muted-foreground"
            />
            <textarea
              placeholder="Your Message"
              rows={6}
              className="w-full px-6 py-4 bg-[#141414] border border-border rounded-[14px] focus:border-primary focus:outline-none transition-colors resize-none text-foreground placeholder:text-muted-foreground"
            ></textarea>
            <button
              type="submit"
              className="w-full px-8 py-4 bg-primary text-primary-foreground rounded-[14px] font-medium hover:bg-primary/90 transition-colors"
            >
              Send Message
            </button>
            </form>
          </ScrollReveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-5 lg:px-20 border-t border-border">
        <div className="max-w-[720px] mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-6 text-foreground">Let's Connect</h3>
            <div className="flex justify-center gap-8">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors p-2" aria-label="Twitter">
                <TwitterIcon />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors p-2" aria-label="LinkedIn">
                <LinkedInIcon />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors p-2" aria-label="GitHub">
                <GitHubIcon />
              </a>
              <a href="https://dribbble.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors p-2" aria-label="Dribbble">
                <DribbbleIcon />
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
