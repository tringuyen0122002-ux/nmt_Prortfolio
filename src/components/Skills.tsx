import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { Code, Database, PenTool, Workflow } from 'lucide-react';

export const Skills = () => {
  const { t } = useLanguage();

  const skillCategories = [
    {
      icon: <PenTool className="w-6 h-6" />,
      title: t('skills.business'),
      color: 'accent',
      skills: [
        'Business Analysis',
        'Requirements Elicitation',
        'BRD/URD Documentation',
        'Blueprint Design',
        'Process Analysis',
        'Stakeholder Management',
        'User Story Writing',
        'Gap Analysis',
      ],
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: t('skills.tools'),
      color: 'accent-orange',
      skills: [
        'Figma',
        'Microsoft Office',
        'Jira',
        'BPMN',
        'UML',
        'SQL Server',
        'Python',
        'Visio',
      ],
    },
    {
      icon: <Workflow className="w-6 h-6" />,
      title: 'Methodologies',
      color: 'accent',
      skills: [
        'Agile/Scrum',
        'Waterfall',
        'Design Thinking',
        'Lean Methodology',
        'Change Management',
        'Risk Assessment',
      ],
    },
    {
      icon: <Database className="w-6 h-6" />,
      title: 'Technical Knowledge',
      color: 'accent-orange',
      skills: [
        'SAP Integration',
        'CRM Systems',
        'ERP Systems',
        'API Understanding',
        'Database Concepts',
        'Web Technologies',
        'Mobile App Design',
      ],
    },
  ];

  return (
    <section id="skills" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              {t('skills.title')}
            </h2>
          </div>

          {/* Skills Categories */}
          <div className="grid md:grid-cols-2 gap-8">
            {skillCategories.map((category, index) => (
              <Card key={index} className="border-card-border shadow-md hover:shadow-lg transition-fast">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-primary">
                    <div className={`p-2 rounded-lg ${
                      category.color === 'accent' 
                        ? 'bg-accent/10 text-accent' 
                        : 'bg-accent-orange/10 text-accent-orange'
                    }`}>
                      {category.icon}
                    </div>
                    {category.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <Badge
                        key={skill}
                        variant="outline"
                        className={`transition-fast hover:scale-105 ${
                          category.color === 'accent'
                            ? 'border-accent text-accent hover:bg-accent hover:text-accent-foreground'
                            : 'border-accent-orange text-accent-orange hover:bg-accent-orange hover:text-accent-orange-foreground'
                        }`}
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Professional Certifications/Learning */}
          <Card className="mt-8 border-card-border shadow-md bg-gradient-card">
            <CardContent className="p-6 text-center">
              <h3 className="text-xl font-semibold text-primary mb-4">
                Continuous Learning & Development
              </h3>
              <p className="text-secondary mb-4">
                Actively pursuing knowledge in emerging technologies and best practices in business analysis
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                <Badge className="bg-accent text-accent-foreground">
                  Agile Certified
                </Badge>
                <Badge className="bg-accent-orange text-accent-orange-foreground">
                  UI/UX Design
                </Badge>
                <Badge variant="outline" className="border-accent text-accent">
                  Business Process Management
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};