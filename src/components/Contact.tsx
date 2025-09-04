import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { Mail, Phone, Linkedin, MapPin } from 'lucide-react';

export const Contact = () => {
  const { t } = useLanguage();

  const contactItems = [
    {
      icon: <Mail className="w-6 h-6" />,
      label: t('contact.email'),
      value: 'nguyenmanhtri2907@gmail.com',
      href: 'mailto:nguyenmanhtri2907@gmail.com',
      color: 'accent',
    },
    {
      icon: <Phone className="w-6 h-6" />,
      label: t('contact.phone'),
      value: '+84 385 547 027',
      href: 'tel:0385547027',
      color: 'accent-orange',
    },
    {
      icon: <Linkedin className="w-6 h-6" />,
      label: t('contact.linkedin'),
      value: 'nguyenmanhtri2907',
      href: 'https://www.linkedin.com/in/nguyenmanhtri2907/',
      color: 'accent',
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      label: 'Location',
      value: 'Ho Chi Minh City, Vietnam',
      href: null,
      color: 'accent-orange',
    },
  ];

  return (
    <section id="contact" className="py-20 bg-gradient-hero">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              {t('contact.title')}
            </h2>
            <p className="text-xl text-primary-foreground/80">
              {t('contact.subtitle')}
            </p>
          </div>

          {/* Contact Cards Grid */}
          <div className="grid sm:grid-cols-2 gap-6 mb-12">
            {contactItems.map((item, index) => (
              <Card key={index} className="border-primary-foreground/20 bg-card/90 backdrop-blur-sm hover:bg-card transition-fast">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-lg ${
                      item.color === 'accent' 
                        ? 'bg-accent/10 text-accent' 
                        : 'bg-accent-orange/10 text-accent-orange'
                    }`}>
                      {item.icon}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-secondary mb-1">
                        {item.label}
                      </p>
                      {item.href ? (
                        <a
                          href={item.href}
                          target={item.href.startsWith('http') ? '_blank' : undefined}
                          rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                          className={`text-lg font-semibold transition-fast hover:underline ${
                            item.color === 'accent' ? 'text-accent' : 'text-accent-orange'
                          }`}
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-lg font-semibold text-primary">
                          {item.value}
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <Card className="border-primary-foreground/20 bg-card/90 backdrop-blur-sm">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold text-primary mb-4">
                  Ready to collaborate?
                </h3>
                <p className="text-secondary mb-6 leading-relaxed">
                  I'm always interested in discussing new opportunities, sharing insights about business analysis, 
                  or exploring how technology can solve business challenges.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    size="lg"
                    className="bg-accent hover:bg-accent/90 text-accent-foreground"
                    asChild
                  >
                    <a href="mailto:nguyenmanhtri2907@gmail.com">
                      <Mail className="w-5 h-5 mr-2" />
                      Send Email
                    </a>
                  </Button>
                  <Button 
                    size="lg"
                    variant="outline"
                    className="border-accent text-accent hover:bg-accent hover:text-accent-foreground"
                    asChild
                  >
                    <a 
                      href="https://www.linkedin.com/in/nguyenmanhtri2907/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      <Linkedin className="w-5 h-5 mr-2" />
                      Connect on LinkedIn
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};