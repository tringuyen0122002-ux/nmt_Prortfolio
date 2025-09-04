import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { GraduationCap, Calendar, Award } from 'lucide-react';

export const Education = () => {
  const { t } = useLanguage();

  return (
    <section id="education" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              {t('education.title')}
            </h2>
          </div>

          {/* Education Card */}
          <Card className="border-card-border shadow-lg hover:shadow-xl transition-fast">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                <div className="flex items-start gap-4 mb-6 md:mb-0">
                  <div className="p-3 rounded-lg bg-accent/10">
                    <GraduationCap className="w-8 h-8 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-primary mb-2">
                      {t('education.university')}
                    </h3>
                    <p className="text-lg text-accent font-semibold mb-2">
                      {t('education.degree')}
                    </p>
                    <div className="flex items-center gap-2 text-secondary mb-4">
                      <Calendar className="w-4 h-4" />
                      <span>2020 – 2024</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="flex items-center gap-2 justify-end mb-2">
                    <Award className="w-5 h-5 text-accent-orange" />
                    <Badge className="bg-accent-orange text-accent-orange-foreground text-base px-3 py-1">
                      {t('education.gpa')}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Relevant Coursework */}
              <div className="mt-6 pt-6 border-t border-card-border">
                <h4 className="text-lg font-semibold text-primary mb-3">
                  Relevant Coursework
                </h4>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="border-accent text-accent">
                    Information Systems Analysis
                  </Badge>
                  <Badge variant="outline" className="border-accent text-accent">
                    Database Management
                  </Badge>
                  <Badge variant="outline" className="border-accent text-accent">
                    Business Process Management
                  </Badge>
                  <Badge variant="outline" className="border-accent text-accent">
                    Project Management
                  </Badge>
                  <Badge variant="outline" className="border-accent text-accent">
                    Systems Design
                  </Badge>
                  <Badge variant="outline" className="border-accent text-accent">
                    Requirements Engineering
                  </Badge>
                </div>
              </div>

              {/* Academic Projects */}
              <div className="mt-6 pt-6 border-t border-card-border">
                <h4 className="text-lg font-semibold text-primary mb-3">
                  Notable Academic Projects
                </h4>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-primary">Enterprise Resource Planning System Analysis</p>
                      <p className="text-secondary text-sm">
                        Analyzed and documented business requirements for a comprehensive ERP implementation
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-primary">Mobile Application UI/UX Design</p>
                      <p className="text-secondary text-sm">
                        Designed user-centered interfaces using modern design principles and tools
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-primary">Database Design & Optimization</p>
                      <p className="text-secondary text-sm">
                        Designed and optimized relational databases for business applications
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};