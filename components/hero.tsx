'use client';

import { useLocalData } from '@/hooks/use-local-data';
import { motion } from 'motion/react';
import Image from 'next/image';
import { useLanguage } from '@/contexts/language-context';

interface LocalizedString {
  en: string;
  th: string;
}

interface DoctorData {
  doctor: {
    name: LocalizedString;
    title: LocalizedString;
    credentials: LocalizedString;
    bio: LocalizedString;
  };
}

export function Hero() {
  const { data, loading } = useLocalData<DoctorData>('/data/doctor.json');
  const { t, language } = useLanguage();

  if (loading || !data) return <div className="h-screen animate-pulse bg-slate-100" />;

  const { doctor } = data;

  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden bg-white">
      {/* Abstract background elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-almond rounded-bl-[100px] -z-10" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-sand/30 rounded-tr-[100px] -z-10" />

      <div className="container mx-auto px-6 max-w-7xl flex flex-col md:flex-row items-center gap-16 lg:gap-32">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex-1 text-center md:text-left space-y-6"
        >
          <div className="inline-block px-4 py-1.5 rounded-full bg-sand/40 text-primary text-sm font-medium tracking-wide">
            {doctor.title[language]}
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-sans font-medium text-primary leading-tight">
            Precision &<br /> Compassion.
          </h1>
          <p className="text-lg md:text-xl text-slate-700 max-w-xl mx-auto md:mx-0 font-secondary font-light leading-relaxed">
            {doctor.name[language]}, {doctor.credentials[language]} specializes in restoring natural function and aesthetics to the eyes and face.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <a 
              href="#contact" 
              className="px-8 py-4 bg-primary text-white rounded-md font-medium hover:bg-rosewood transition-colors shadow-sm"
            >
              {t('hero.request_consultation')}
            </a>
            <a 
              href="#portfolio" 
              className="px-8 py-4 bg-white text-primary border border-slate-200 rounded-md font-medium hover:bg-slate-50 transition-colors shadow-sm"
            >
              {t('hero.view_cases')}
            </a>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex-1 relative w-full max-w-md mx-auto aspect-[4/5]"
        >
          <div className="absolute inset-0 bg-slate-200 rounded-2xl overflow-hidden shadow-xl">
             <Image 
                src="https://picsum.photos/seed/doctor1/800/1000" 
                alt={doctor.name[language] || doctor.name.en}
                fill
                className="object-cover object-center grayscale-[20%]"
                referrerPolicy="no-referrer"
             />
          </div>
          {/* Decorative frame */}
          <div className="absolute -inset-4 border border-slate-200 rounded-2xl -z-10 translate-x-2 translate-y-2 pointer-events-none" />
        </motion.div>
      </div>
    </section>
  );
}
