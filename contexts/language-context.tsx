'use client';

import React, { createContext, useContext, useState } from 'react';

type Language = 'en' | 'th';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<string, Record<Language, string>> = {
  // Navbar
  'nav.education': { en: 'Oculoplastic 101', th: 'ความรู้พื้นฐาน' },
  'nav.services': { en: 'Services', th: 'บริการของเรา' },
  'nav.gallery': { en: 'Gallery', th: 'แกลเลอรี' },
  'nav.knowledge': { en: 'Knowledge', th: 'บทความ' },
  'nav.contact': { en: 'Contact', th: 'ติดต่อ' },
  'nav.consultation': { en: 'Consultation', th: 'ปรึกษาแพทย์' },
  
  // Hero
  'hero.request_consultation': { en: 'Request Consultation', th: 'นัดหมายปรึกษา' },
  'hero.view_cases': { en: 'View Cases', th: 'ดูเคสรีวิว' },
  
  // 101
  '101.subtitle': { en: 'Oculoplastic 101', th: 'ความรู้เกี่ยวกับศัลยกรรมตกแต่งรอบดวงตา' },
  '101.title': { en: 'Where Ophthalmology Meets Plastic Surgery', th: 'จุดบรรจบของจักษุวิทยาและศัลยกรรมพลาสติก' },
  '101.desc': { 
    en: 'Oculoplastic surgery is a highly specialized field. It requires the microsurgical precision of an ophthalmologist combined with the aesthetic understanding of a plastic surgeon to protect your vision while enhancing your features.', 
    th: 'ศัลยกรรมตกแต่งบริเวณรอบดวงตาเป็นสาขาที่ต้องการความเชี่ยวชาญเฉพาะทางสูง โดยอาศัยความแม่นยำระดับจุลศัลยกรรมของจักษุแพทย์ ผสมผสานกับความเข้าใจด้านความงามของศัลยแพทย์พลาสติก เพื่อปกป้องการมองเห็นพร้อมเสริมจุดเด่นของคุณ' 
  },
  '101.c1.title': { en: 'The Eyelids & Orbit', th: 'เปลือกตาและเบ้าตา' },
  '101.c1.desc': { en: 'Intricate structures requiring specialized knowledge. We treat drooping (ptosis), malposition (ectropion), and tumors.', th: 'โครงสร้างที่ซับซ้อนซึ่งต้องการความรู้เฉพาะทาง เรารักษาภาวะหนังตาตก เปลือกตาผิดรูป และเนื้องอก' },
  '101.c2.title': { en: 'Reconstructive Surgery', th: 'ศัลยกรรมเสริมสร้างใหม่' },
  '101.c2.desc': { en: 'Restoring delicate facial anatomy after trauma, cancer excision, or thyroid eye disease, focusing on both function and appearance.', th: 'ฟื้นฟูกายวิภาคบนใบหน้าที่ละเอียดอ่อนหลังอุบัติเหตุ การตัดมะเร็ง หรือโรคตาจากไทรอยด์ โดยเน้นทั้งการใช้งานและรูปลักษณ์' },
  '101.c3.title': { en: 'Aesthetic Rejuvenation', th: 'การฟื้นฟูความอ่อนเยาว์' },
  '101.c3.desc': { en: 'Subtle, natural-looking enhancements like blepharoplasty and brow lifts to refresh your appearance without looking artificial.', th: 'การปรับปรุงรูปลักษณ์อย่างเป็นธรรมชาติ เช่น การทำตาสองชั้นและการยกคิ้ว เพื่อให้คุณดูสดใสโดยไม่ดูเกินจริง' },

  // Services
  'services.subtitle': { en: 'Procedures & Services', th: 'หัตถการและบริการ' },
  'services.desc': { en: 'Comprehensive care for functional, reconstructive, and cosmetic concerns of the eyes and face.', th: 'การดูแลอย่างครบวงจรสำหรับปัญหาการใช้งาน การเสริมสร้างใหม่ และความงามของดวงตาและใบหน้า' },
  'services.recovery': { en: 'recovery', th: 'ระยะพักฟื้น' },

  // Portfolio
  'portfolio.subtitle': { en: 'Surgical Outcomes', th: 'ผลลัพธ์การผ่าตัด' },
  'portfolio.title': { en: 'Patient Case Gallery', th: 'แกลเลอรีเคสผู้ป่วย' },
  'portfolio.desc': { en: 'Slide to compare before and after results. Click on any case to view high-resolution clinical images and procedure details.', th: 'เลื่อนเพื่อเปรียบเทียบผลลัพธ์ก่อนและหลัง คลิกที่เคสเพื่อดูรูปภาพทางคลินิกความละเอียดสูงและรายละเอียด' },
  'portfolio.view_details': { en: 'View Details', th: 'ดูรายละเอียด' },
  'portfolio.before': { en: 'Before', th: 'ก่อน' },
  'portfolio.after': { en: 'After', th: 'หลัง' },
  'portfolio.disclaimer': { en: 'High-resolution clinical images. Results may vary by patient.', th: 'รูปภาพทางคลินิกความละเอียดสูง ผลลัพธ์อาจแตกต่างกันไปในแต่ละบุคคล' },
  'portfolio.all': { en: 'All', th: 'ทั้งหมด' },

  // Knowledge
  'knowledge.title': { en: 'Clinical Knowledge Insights', th: 'สาระความรู้ทางคลินิก' },
  'knowledge.desc': { en: 'Updates on surgical techniques, complex cases, and advancements in oculoplastic surgery.', th: 'อัปเดตเทคนิคการผ่าตัด เคสที่ซับซ้อน และความก้าวหน้าทางศัลยกรรมตกแต่งรอบดวงตา' },
  'knowledge.view_all': { en: 'View All Articles', th: 'ดูบทความทั้งหมด' },
  'knowledge.read': { en: 'Read Article', th: 'อ่านบทความ' },

  // Contact
  'contact.subtitle': { en: 'About The Surgeon', th: 'เกี่ยวกับแพทย์' },
  'contact.certifications': { en: 'Board Certifications', th: 'วุฒิบัตรและการรับรอง' },
  'contact.arrange': { en: 'Arrange a Consultation', th: 'ติดต่อนัดหมาย' },
  'contact.phone': { en: 'Phone', th: 'เบอร์โทรศัพท์' },
  'contact.inquiries': { en: 'Direct Inquiries', th: 'อีเมลติดต่อ' },
  'contact.location': { en: 'Clinic Location', th: 'ที่ตั้งคลินิก' },
  'contact.request': { en: 'Request Appointment Online', th: 'นัดหมายออนไลน์' },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window === 'undefined') return 'en';

    const saved = localStorage.getItem('language') as Language;
    if (saved && (saved === 'en' || saved === 'th')) return saved;

    return navigator.language.startsWith('th') ? 'th' : 'en';
  });

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', lang);
    }
  };

  const t = (key: string) => {
    if (!translations[key]) return key;
    return translations[key][language] || translations[key].en;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {/* 
        Add CSS variable or class to body depending on language to handle Thai fonts 
      */}
      <div className={`contents ${language === 'th' ? 'font-thai' : ''}`}>
        {children}
      </div>
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
