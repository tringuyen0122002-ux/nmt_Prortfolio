import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useLanguage } from '@/contexts/LanguageContext';
import { ImageUpload } from '@/components/ui/image-upload';
import { ExternalLink, Calendar, Upload } from 'lucide-react';

interface Project {
  id: string;
  titleKey: string;
  companyKey: string;
  roleKey: string;
  period: string;
  summaryKey: string;
  badges: string[];
  responsibilities: string[];
  technologies: string[];
  outcomes: string[];
}

export const Projects = () => {
  const { t } = useLanguage();
  const [rmsImages, setRmsImages] = useState<File[]>([]);

  const projects: Project[] = [
    {
      id: 'cms',
      titleKey: 'projects.cms.title',
      companyKey: 'projects.cms.company',
      roleKey: 'projects.cms.role',
      period: '12/2024 – Present',
      summaryKey: 'Contract management platform with SAP integration for Central Retail Vietnam',
      badges: ['SAP Integration', '30% faster processing', 'Web Application'],
      responsibilities: [
        'Requirements gathering and analysis',
        'BRD and technical specification creation',
        'Stakeholder coordination',
        'User acceptance testing support',
      ],
      technologies: ['Figma', 'Microsoft Office', 'SAP', 'BPMN'],
      outcomes: [
        '30% reduction in contract processing time',
        'Improved compliance tracking',
        'Streamlined approval workflows',
      ],
    },
    {
      id: 'rms',
      titleKey: 'projects.rms.title',
      companyKey: 'projects.rms.company',
      roleKey: 'Business Analyst',
      period: '11/2024 – 04/2025',
      summaryKey: 'projects.rms.summary',
      badges: ['QR Spare Parts', 'SAP Sync', '10+ processes', 'Mobile App'],
      responsibilities: [
        'Elicit requirements from maintenance teams',
        'Create comprehensive BRD & Blueprint documentation',
        'Design UI mockups for Web and Mobile platforms',
        'Coordinate with stakeholders across multiple departments',
        'Support User Acceptance Testing phases',
      ],
      technologies: ['Figma', 'BPMN', 'SAP', 'Microsoft Office', 'SQL'],
      outcomes: [
        'Standardized 10+ maintenance processes',
        'Implemented QR code spare parts system',
        'Achieved real-time SAP/MEMS synchronization',
        'Improved maintenance request tracking efficiency',
      ],
    },
  ];

  return (
    <section id="projects" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              {t('projects.title')}
            </h2>
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project) => (
              <Card key={project.id} className="border-card-border shadow-md hover:shadow-lg transition-fast">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <CardTitle className="text-xl text-primary leading-tight">
                      {t(project.titleKey)}
                    </CardTitle>
                    <div className="flex items-center gap-2 text-secondary text-sm">
                      <Calendar className="w-4 h-4" />
                      {project.period}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-accent font-medium">{t(project.companyKey)}</p>
                    <p className="text-sm text-secondary">{project.roleKey}</p>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <p className="text-secondary mb-4 leading-relaxed">
                    {t(project.summaryKey)}
                  </p>
                  
                  {/* Highlight Badges */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.badges.map((badge) => (
                      <Badge key={badge} className="bg-accent/10 text-accent border-accent/20">
                        {badge}
                      </Badge>
                    ))}
                  </div>

                  {/* View Details Button */}
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="w-full">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        {t('projects.viewDetails')}
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle className="text-2xl text-primary">
                          {t(project.titleKey)}
                        </DialogTitle>
                        <div className="flex items-center gap-4 text-secondary">
                          <span>{t(project.companyKey)}</span>
                          <span>•</span>
                          <span>{project.roleKey}</span>
                          <span>•</span>
                          <span>{project.period}</span>
                        </div>
                      </DialogHeader>
                      
                      <div className="space-y-6">
                        {/* Summary */}
                        <div>
                          <h4 className="text-lg font-semibold text-primary mb-2">Project Overview</h4>
                          <p className="text-secondary leading-relaxed">{t(project.summaryKey)}</p>
                        </div>

                        {/* Responsibilities */}
                        <div>
                          <h4 className="text-lg font-semibold text-primary mb-3">Key Responsibilities</h4>
                          <ul className="space-y-2">
                            {project.responsibilities.map((resp, index) => (
                              <li key={index} className="flex items-start gap-3 text-secondary">
                                <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                                <span>{resp}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Technologies */}
                        <div>
                          <h4 className="text-lg font-semibold text-primary mb-3">Technologies & Tools</h4>
                          <div className="flex flex-wrap gap-2">
                            {project.technologies.map((tech) => (
                              <Badge key={tech} variant="secondary">{tech}</Badge>
                            ))}
                          </div>
                        </div>

                        {/* Outcomes */}
                        <div>
                          <h4 className="text-lg font-semibold text-primary mb-3">Key Outcomes & Achievements</h4>
                          <ul className="space-y-2">
                            {project.outcomes.map((outcome, index) => (
                              <li key={index} className="flex items-start gap-3 text-secondary">
                                <div className="w-1.5 h-1.5 rounded-full bg-accent-orange mt-2 flex-shrink-0" />
                                <span>{outcome}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Image Upload for RMS Project */}
                        {project.id === 'rms' && (
                          <div>
                            <h4 className="text-lg font-semibold text-primary mb-3 flex items-center gap-2">
                              <Upload className="w-5 h-5" />
                              Project Mockups
                            </h4>
                            <ImageUpload
                              onImagesChange={setRmsImages}
                              maxImages={8}
                              className="max-w-2xl"
                            />
                          </div>
                        )}
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};