import React from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

export const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center space-x-1 rounded-lg border border-border p-1">
      <Button
        variant={language === 'en' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => setLanguage('en')}
        className="h-7 px-2 text-xs font-medium transition-fast"
      >
        EN
      </Button>
      <Button
        variant={language === 'vi' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => setLanguage('vi')}
        className="h-7 px-2 text-xs font-medium transition-fast"
      >
        VN
      </Button>
    </div>
  );
};