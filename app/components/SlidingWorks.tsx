'use client';

import { useState, useEffect } from 'react';

const works = [
  {
    id: 1,
    title: "E-commerce Platform",
    description: "A modern e-commerce platform built with Next.js and Stripe integration",
    image: "/api/placeholder/400/300"
  },
  {
    id: 2,
    title: "Task Management App",
    description: "A collaborative task management application with real-time updates",
    image: "/api/placeholder/400/300"
  },
  {
    id: 3,
    title: "Portfolio Website",
    description: "A responsive portfolio website with dark theme and animations",
    image: "/api/placeholder/400/300"
  },
  {
    id: 4,
    title: "Weather Dashboard",
    description: "A weather dashboard with interactive charts and location tracking",
    image: "/api/placeholder/400/300"
  },
  {
    id: 5,
    title: "Social Media App",
    description: "A social media application with real-time messaging and media sharing",
    image: "/api/placeholder/400/300"
  }
];

export default function SlidingWorks() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % works.length);
        setIsTransitioning(false);
      }, 300);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % works.length);
      setIsTransitioning(false);
    }, 300);
  };

  const prevSlide = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + works.length) % works.length);
      setIsTransitioning(false);
    }, 300);
  };

  return (
    <div className="relative overflow-hidden rounded-xl bg-card border border-border">
      {/* Main Slide */}
      <div className="relative h-80">
        <div 
          className={`absolute inset-0 transition-opacity duration-300 ${
            isTransitioning ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <div className="h-full bg-gradient-to-br from-muted/20 to-muted/40 flex items-center justify-center">
            <div className="text-center p-8">
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {works[currentIndex].title}
              </h3>
              <p className="text-muted-foreground">
                {works[currentIndex].description}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/80 border border-border hover:bg-accent transition-colors"
          aria-label="Previous work"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/80 border border-border hover:bg-accent transition-colors"
          aria-label="Next work"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Slide Indicators */}
      <div className="flex justify-center gap-2 p-4">
        {works.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setIsTransitioning(true);
              setTimeout(() => {
                setCurrentIndex(index);
                setIsTransitioning(false);
              }, 300);
            }}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex ? 'bg-primary' : 'bg-muted'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
