import React from 'react';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Experience } from '@/components/Experience';
import { Projects } from '@/components/Projects';
import { Skills } from '@/components/Skills';
import { Education } from '@/components/Education';
import { Contact } from '@/components/Contact';

const Portfolio = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Education />
        <Contact />
      </main>
      
      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-8 text-center">
        <div className="container mx-auto px-4">
          <p className="text-primary-foreground/80">
            © 2024 Nguyễn Mạnh Trí. Built with React, TypeScript & Tailwind CSS.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;