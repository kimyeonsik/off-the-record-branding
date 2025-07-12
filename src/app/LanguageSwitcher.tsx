'use client';

import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const router = useRouter();

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
    router.refresh();
  };

  return (
    <div className="flex space-x-4">
      <button 
        onClick={() => handleLanguageChange('ko')}
        className={`hover:text-primary transition-colors ${i18n.language === 'ko' ? 'text-primary font-semibold' : 'text-neutral-500'}`}
      >
        한국어
      </button>
      <button 
        onClick={() => handleLanguageChange('en')}
        className={`hover:text-primary transition-colors ${i18n.language === 'en' ? 'text-primary font-semibold' : 'text-neutral-500'}`}
      >
        English
      </button>
      <button 
        onClick={() => handleLanguageChange('ja')}
        className={`hover:text-primary transition-colors ${i18n.language === 'ja' ? 'text-primary font-semibold' : 'text-neutral-500'}`}
      >
        日本語
      </button>
    </div>
  );
}
