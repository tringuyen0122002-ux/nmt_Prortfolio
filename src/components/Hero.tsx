import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { Linkedin, Mail, Phone, Download } from 'lucide-react';
import profilePhoto from '@/assets/profile-photo.jpg';
export const Hero = () => {
  const {
    t
  } = useLanguage();
  return <section className="min-h-screen flex items-center justify-center bg-gradient-hero relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center text-primary-foreground">
          {/* Profile Photo */}
          <div className="mb-8">
            <div className="w-32 h-32 mx-auto rounded-full bg-gradient-accent p-1 shadow-xl">
              
            </div>
          </div>

          {/* Name & Title */}
          <div className="mb-6">
            <h1 className="text-4xl md:text-5xl font-bold mb-3">
              Nguyễn Mạnh Trí
            </h1>
            <div className="flex justify-center mb-4">
              <Badge variant="secondary" className="text-lg px-4 py-2">
                {t('hero.title')}
              </Badge>
            </div>
          </div>

          {/* Introduction */}
          <p className="text-lg md:text-xl text-primary-foreground/90 max-w-3xl mx-auto mb-8 leading-relaxed">
            {t('hero.intro')}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg" asChild>
              <a href="https://www.linkedin.com/in/nguyenmanhtri2907/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2">
                <Linkedin className="w-5 h-5" />
                {t('hero.viewLinkedIn')}
              </a>
            </Button>
            <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary shadow-lg">
              <Download className="w-5 h-5 mr-2" />
              {t('hero.downloadCV')}
            </Button>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center text-primary-foreground/80">
            <a href="mailto:nguyenmanhtri2907@gmail.com" className="inline-flex items-center gap-2 hover:text-accent transition-fast">
              <Mail className="w-4 h-4" />
              nguyenmanhtri2907@gmail.com
            </a>
            <a href="tel:0385547027" className="inline-flex items-center gap-2 hover:text-accent transition-fast">
              <Phone className="w-4 h-4" />
              0385 547 027
            </a>
          </div>
        </div>
      </div>
    </section>;
};