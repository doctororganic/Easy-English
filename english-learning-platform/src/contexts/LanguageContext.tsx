/**
 * Language Context for managing English/Arabic toggle
 * Provides language switching functionality throughout the application
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  isRTL: boolean;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    // Check for saved language preference or default to English
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage === 'en' || savedLanguage === 'ar') {
      setLanguage(savedLanguage);
    }
    
    // Set document direction based on language
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'ar' : 'en';
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
    
    // Update document direction
    document.documentElement.dir = newLanguage === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = newLanguage;
  };

  const isRTL = language === 'ar';

  const value = {
    language,
    setLanguage,
    isRTL,
    toggleLanguage,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

/**
 * Translation utility functions
 */
export function getLocalizedText(
  englishText: string,
  arabicText: string,
  language: Language
): string {
  return language === 'ar' ? arabicText : englishText;
}

export function getLocalizedContent<T extends { en: string; ar: string }>(
  content: T,
  language: Language
): string {
  return language === 'ar' ? content.ar : content.en;
}

/**
 * Language-specific navigation labels
 */
export const navigationLabels = {
  en: {
    home: 'Home',
    vocabulary: 'Vocabulary',
    setbook: 'Setbook',
    grammar: 'Grammar',
    writing: 'Writing',
    functional: 'Functional',
    listenLearn: 'Listen & Learn',
    switchToArabic: 'Switch to Arabic',
    switchToEnglish: 'Switch to English',
  },
  ar: {
    home: 'الرئيسية',
    vocabulary: 'المفردات',
    setbook: 'الكتب المدرسية',
    grammar: 'القواعد',
    writing: 'الكتابة',
    functional: 'اللغة الوظيفية',
    listenLearn: 'الاستماع والتعلم',
    switchToArabic: 'التبديل إلى العربية',
    switchToEnglish: 'التبديل إلى الإنجليزية',
  }
};