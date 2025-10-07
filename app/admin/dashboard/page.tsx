'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [stats, setStats] = useState({
    projects: 0,
    experiences: 0,
    services: 0,
  });

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login');
    } else if (status === 'authenticated') {
      fetchStats();
    }
  }, [status, router]);

  const fetchStats = async () => {
    try {
      const [projectsRes, experiencesRes, servicesRes] = await Promise.all([
        fetch('/api/projects'),
        fetch('/api/work-experience'),
        fetch('/api/services'),
      ]);

      const projects = await projectsRes.json();
      const experiences = await experiencesRes.json();
      const services = await servicesRes.json();

      setStats({
        projects: projects.data?.length || 0,
        experiences: experiences.data?.length || 0,
        services: services.data?.length || 0,
      });
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    }
  };

  if (status === 'loading') {
    return <div className="min-h-screen flex items-center justify-center bg-background">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <nav className="bg-card border-b border-border px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-muted-foreground">{session?.user?.email}</span>
            <Link
              href="/"
              className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 transition-colors"
            >
              View Site
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-card p-6 rounded-2xl border border-border">
            <h3 className="text-muted-foreground text-sm mb-2">Total Projects</h3>
            <p className="text-4xl font-bold text-foreground">{stats.projects}</p>
          </div>
          <div className="bg-card p-6 rounded-2xl border border-border">
            <h3 className="text-muted-foreground text-sm mb-2">Work Experiences</h3>
            <p className="text-4xl font-bold text-foreground">{stats.experiences}</p>
          </div>
          <div className="bg-card p-6 rounded-2xl border border-border">
            <h3 className="text-muted-foreground text-sm mb-2">Services</h3>
            <p className="text-4xl font-bold text-foreground">{stats.services}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Link
            href="/admin/projects"
            className="bg-card p-8 rounded-2xl border border-border hover:border-primary/30 hover:shadow-lg transition-all"
          >
            <h2 className="text-2xl font-bold text-foreground mb-2">Manage Projects</h2>
            <p className="text-muted-foreground">Add, edit, or delete your portfolio projects</p>
          </Link>

          <Link
            href="/admin/work-experience"
            className="bg-card p-8 rounded-2xl border border-border hover:border-primary/30 hover:shadow-lg transition-all"
          >
            <h2 className="text-2xl font-bold text-foreground mb-2">Manage Work Experience</h2>
            <p className="text-muted-foreground">Add, edit, or delete your work history</p>
          </Link>

          <Link
            href="/admin/services"
            className="bg-card p-8 rounded-2xl border border-border hover:border-primary/30 hover:shadow-lg transition-all"
          >
            <h2 className="text-2xl font-bold text-foreground mb-2">Manage Services</h2>
            <p className="text-muted-foreground">Add, edit, or delete your services</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

