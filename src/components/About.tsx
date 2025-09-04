import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { Target, TrendingUp } from 'lucide-react';

export const About = () => {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              {t('about.title')}
            </h2>
          </div>

          {/* Career Goals */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="border-card-border shadow-md hover:shadow-lg transition-fast">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-accent/10">
                    <Target className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="text-xl font-semibold text-primary">
                    {t('about.shortTerm')}
                  </h3>
                </div>
                <p className="text-secondary leading-relaxed">
                  {t('about.shortTermDesc')}
                </p>
              </CardContent>
            </Card>

            <Card className="border-card-border shadow-md hover:shadow-lg transition-fast">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-accent-orange/10">
                    <TrendingUp className="w-6 h-6 text-accent-orange" />
                  </div>
                  <h3 className="text-xl font-semibold text-primary">
                    {t('about.longTerm')}
                  </h3>
                </div>
                <p className="text-secondary leading-relaxed">
                  {t('about.longTermDesc')}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Key Skills Summary */}
          <Card className="border-card-border shadow-md bg-gradient-card">
            <CardContent className="p-6 text-center">
              <p className="text-secondary text-lg leading-relaxed mb-4">
                {t('about.keySkills')}
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                <Badge variant="outline" className="border-accent text-accent">
                  Requirements Elicitation
                </Badge>
                <Badge variant="outline" className="border-accent text-accent">
                  BRD/URD
                </Badge>
                <Badge variant="outline" className="border-accent text-accent">
                  Blueprint
                </Badge>
                <Badge variant="outline" className="border-accent text-accent">
                  UI/UX Design
                </Badge>
                <Badge variant="outline" className="border-accent text-accent">
                  Figma
                </Badge>
                <Badge variant="outline" className="border-accent text-accent">
                  Agile/Scrum
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};