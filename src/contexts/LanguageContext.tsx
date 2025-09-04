import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'vi';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Navigation
    'nav.about': 'About',
    'nav.experience': 'Experience',
    'nav.projects': 'Projects',
    'nav.skills': 'Skills',
    'nav.education': 'Education',
    'nav.contact': 'Contact',
    
    // Hero
    'hero.title': 'IT Business Analyst',
    'hero.intro': 'Aspiring Business Analyst with hands-on experience in internal system projects (RMS, TMS, E-Contract). Passionate about bridging users and technology through requirement analysis, BRD/URD documentation, and UI/UX design with Figma.',
    'hero.viewLinkedIn': 'View LinkedIn',
    'hero.downloadCV': 'Download CV',
    
    // About
    'about.title': 'About Me',
    'about.shortTerm': 'Short Term',
    'about.shortTermDesc': 'Grow Business Analysis and coordination skills in complex IT projects',
    'about.longTerm': 'Long Term',
    'about.longTermDesc': 'Become Senior Business Analyst/Project Manager bridging business and technology',
    'about.keySkills': 'Key Skills: Requirements elicitation, BRD/URD, Blueprint, UI/UX design with Figma, Agile/Scrum',
    
    // Experience
    'experience.title': 'Experience',
    'experience.present': 'Present',
    'experience.delfi.role': 'IT Business Analyst',
    'experience.lcs.role': 'Business Analyst',
    'experience.lcs.desc1': 'Collect and clarify business requirements from stakeholders',
    'experience.lcs.desc2': 'Analyze business needs and propose solutions (BRD/URD/Blueprint)',
    'experience.lcs.desc3': 'Design UI mockups for web & mobile applications with Figma',
    'experience.lcs.desc4': 'Collaborate with clients & development teams to validate solutions',
    
    // Projects
    'projects.title': 'Projects',
    'projects.viewDetails': 'View Details',
    'projects.mockups.title': 'Project Mockups',
    'projects.cms.title': 'Contract Management System (CMS)',
    'projects.cms.company': 'Central Retail Vietnam',
    'projects.cms.role': 'Assistant Project Manager / BA',
    'projects.rms.title': 'RMS 2.0 – Repair & Maintenance System',
    'projects.rms.company': 'Suntory PepsiCo Vietnam',
    'projects.rms.summary': 'Multi-functional platform for MEM to handle repair/maintenance requests, QR code spare parts, SAP synchronization',
    
    // Skills
    'skills.title': 'Skills',
    'skills.tools': 'Tools & Technologies',
    'skills.business': 'Business Analysis',
    
    // Education
    'education.title': 'Education',
    'education.university': 'HUTECH – Ho Chi Minh City University of Technology',
    'education.degree': 'Management Information Systems',
    'education.gpa': 'GPA 3.3/4.0',
    
    // Contact
    'contact.title': 'Contact',
    'contact.subtitle': 'Let\'s collaborate on your next project',
    'contact.email': 'Email',
    'contact.phone': 'Phone',
    'contact.linkedin': 'LinkedIn',
  },
  vi: {
    // Navigation
    'nav.about': 'Giới thiệu',
    'nav.experience': 'Kinh nghiệm',
    'nav.projects': 'Dự án',
    'nav.skills': 'Kỹ năng',
    'nav.education': 'Học vấn',
    'nav.contact': 'Liên hệ',
    
    // Hero
    'hero.title': 'Chuyên viên phân tích nghiệp vụ CNTT',
    'hero.intro': 'Business Analyst nhiều kinh nghiệm trong các dự án nội bộ (RMS, TMS, E-Contract). Đam mê phân tích yêu cầu, viết BRD/URD và thiết kế UI/UX bằng Figma, kết nối người dùng với công nghệ.',
    'hero.viewLinkedIn': 'Xem LinkedIn',
    'hero.downloadCV': 'Tải CV',
    
    // About
    'about.title': 'Giới thiệu',
    'about.shortTerm': 'Mục tiêu ngắn hạn',
    'about.shortTermDesc': 'Phát triển kỹ năng phân tích nghiệp vụ và điều phối trong các dự án CNTT phức tạp',
    'about.longTerm': 'Mục tiêu dài hạn',
    'about.longTermDesc': 'Trở thành Senior Business Analyst/Project Manager kết nối nghiệp vụ và công nghệ',
    'about.keySkills': 'Kỹ năng chính: Thu thập yêu cầu, BRD/URD, Blueprint, thiết kế UI/UX với Figma, Agile/Scrum',
    
    // Experience
    'experience.title': 'Kinh nghiệm',
    'experience.present': 'Hiện tại',
    'experience.delfi.role': 'Chuyên viên phân tích nghiệp vụ CNTT',
    'experience.lcs.role': 'Chuyên viên phân tích nghiệp vụ',
    'experience.lcs.desc1': 'Thu thập và làm rõ yêu cầu nghiệp vụ từ các bên liên quan',
    'experience.lcs.desc2': 'Phân tích nhu cầu nghiệp vụ và đề xuất giải pháp (BRD/URD/Blueprint)',
    'experience.lcs.desc3': 'Thiết kế mockup UI cho ứng dụng web & mobile bằng Figma',
    'experience.lcs.desc4': 'Phối hợp với khách hàng & đội phát triển để xác thực giải pháp',
    
    // Projects
    'projects.title': 'Dự án',
    'projects.viewDetails': 'Xem chi tiết',
    'projects.mockups.title': 'Mockup dự án',
    'projects.cms.title': 'Hệ thống quản lý hợp đồng (CMS)',
    'projects.cms.company': 'Central Retail Vietnam',
    'projects.cms.role': 'Trợ lý PM / BA',
    'projects.rms.title': 'RMS 2.0 – Hệ thống sửa chữa & bảo trì',
    'projects.rms.company': 'Suntory PepsiCo Vietnam',
    'projects.rms.summary': 'Nền tảng đa chức năng cho MEM xử lý yêu cầu sửa chữa/bảo trì, phụ tùng QR code, đồng bộ SAP',
    
    // Skills
    'skills.title': 'Kỹ năng',
    'skills.tools': 'Công cụ & Công nghệ',
    'skills.business': 'Phân tích nghiệp vụ',
    
    // Education
    'education.title': 'Học vấn',
    'education.university': 'HUTECH – Đại học Công nghệ TP.HCM',
    'education.degree': 'Hệ thống thông tin quản lý',
    'education.gpa': 'GPA 3.3/4.0',
    
    // Contact
    'contact.title': 'Liên hệ',
    'contact.subtitle': 'Hãy cùng hợp tác trong dự án tiếp theo của bạn',
    'contact.email': 'Email',
    'contact.phone': 'Điện thoại',
    'contact.linkedin': 'LinkedIn',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};