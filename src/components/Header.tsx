import React from 'react';
import { Button } from '@/components/ui/button';
import { LanguageToggle } from './LanguageToggle';
import AuthButton from './AuthButton';
import { useLanguage } from '@/contexts/LanguageContext';
import { Menu } from 'lucide-react';

export const Header = () => {
  const { t } = useLanguage();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-lg border-b border-card-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo/Name */}
        <div className="flex items-center space-x-2">
          <div className="font-bold text-lg text-primary">
            Nguyễn Mạnh Trí
          </div>
        </div>

        {/* Navigation - Desktop */}
        <nav className="hidden md:flex items-center space-x-8">
          <Button
            variant="ghost"
            onClick={() => scrollToSection('about')}
            className="text-secondary hover:text-primary transition-fast"
          >
            {t('nav.about')}
          </Button>
          <Button
            variant="ghost"
            onClick={() => scrollToSection('experience')}
            className="text-secondary hover:text-primary transition-fast"
          >
            {t('nav.experience')}
          </Button>
          <Button
            variant="ghost"
            onClick={() => scrollToSection('projects')}
            className="text-secondary hover:text-primary transition-fast"
          >
            {t('nav.projects')}
          </Button>
          <Button
            variant="ghost"
            onClick={() => scrollToSection('skills')}
            className="text-secondary hover:text-primary transition-fast"
          >
            {t('nav.skills')}
          </Button>
          <Button
            variant="ghost"
            onClick={() => scrollToSection('education')}
            className="text-secondary hover:text-primary transition-fast"
          >
            {t('nav.education')}
          </Button>
          <Button
            variant="ghost"
            onClick={() => scrollToSection('contact')}
            className="text-secondary hover:text-primary transition-fast"
          >
            {t('nav.contact')}
          </Button>
        </nav>

        {/* Language Toggle, Auth & Mobile Menu */}
        <div className="flex items-center space-x-4">
          <AuthButton />
          <LanguageToggle />
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};