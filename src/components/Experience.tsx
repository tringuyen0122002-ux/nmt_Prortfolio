import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { Calendar, MapPin } from 'lucide-react';

export const Experience = () => {
  const { t } = useLanguage();

  const experiences = [
    {
      company: 'Delfi Technologies',
      role: t('experience.delfi.role'),
      period: `08/2025 – ${t('experience.present')}`,
      location: 'Ho Chi Minh City',
      isCurrentRole: true,
      projects: [],
    },
    {
      company: 'LCS Group',
      role: t('experience.lcs.role'),
      period: '03/2024 – 08/2025',
      location: 'Ho Chi Minh City',
      isCurrentRole: false,
      projects: ['RMS', 'TMS', 'E-Contract'],
      responsibilities: [
        t('experience.lcs.desc1'),
        t('experience.lcs.desc2'),
        t('experience.lcs.desc3'),
        t('experience.lcs.desc4'),
      ],
    },
  ];

  return (
    <section id="experience" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              {t('experience.title')}
            </h2>
          </div>

          {/* Timeline */}
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <Card 
                key={index}
                className={`border-card-border shadow-md hover:shadow-lg transition-fast relative ${
                  exp.isCurrentRole ? 'ring-2 ring-accent' : ''
                }`}
              >
                {exp.isCurrentRole && (
                  <div className="absolute -top-2 left-4">
                    <Badge className="bg-accent text-accent-foreground">Current</Badge>
                  </div>
                )}
                
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-primary mb-1">
                        {exp.role}
                      </h3>
                      <p className="text-lg font-semibold text-accent mb-2">
                        {exp.company}
                      </p>
                    </div>
                    <div className="text-secondary text-sm space-y-1">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {exp.period}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {exp.location}
                      </div>
                    </div>
                  </div>

                  {/* Major Projects */}
                  {exp.projects.length > 0 && (
                    <div className="mb-4">
                      <p className="text-sm font-medium text-secondary mb-2">Major Projects:</p>
                      <div className="flex flex-wrap gap-2">
                        {exp.projects.map((project) => (
                          <Badge key={project} variant="secondary">
                            {project}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Responsibilities */}
                  {exp.responsibilities && (
                    <div>
                      <p className="text-sm font-medium text-secondary mb-3">Key Responsibilities:</p>
                      <ul className="space-y-2">
                        {exp.responsibilities.map((resp, respIndex) => (
                          <li key={respIndex} className="flex items-start gap-3 text-secondary">
                            <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                            <span className="leading-relaxed">{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};