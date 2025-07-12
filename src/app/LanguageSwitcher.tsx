'use client';

import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLang = e.target.value;
    i18n.changeLanguage(newLang);
    // You might want to refresh the page or update the URL to reflect the language change
    // For App Router, you might need to use router.refresh() or navigate to a new path
    router.refresh(); // This will re-render the current route
  };

  return (
    <select 
      value={i18n.language} 
      onChange={handleChange}
      className="bg-transparent text-neutral-500 border border-neutral-300 rounded-md p-1 text-sm"
    >
      <option value="en">English</option>
      <option value="ko">한국어</option>
    </select>
  );
}
