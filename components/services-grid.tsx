'use client';

import { useLocalData } from '@/hooks/use-local-data';
import { motion } from 'motion/react';
import { Clock, Activity } from 'lucide-react';
import { useLanguage } from '@/contexts/language-context';

interface LocalizedString {
  en: string;
  th: string;
}

interface Service {
  id: string;
  title: LocalizedString;
  category: LocalizedString;
  description: LocalizedString;
  duration: string;
  recovery: string;
}

interface ServicesData {
  services: Service[];
}

export function ServicesGrid() {
  const { data, loading } = useLocalData<ServicesData>('/data/services.json');
  const { t, language } = useLanguage();

  if (loading || !data) return <div className="py-24 bg-white animate-pulse h-96" />;

  return (
    <section className="py-24 bg-white border-t border-sand/40" id="services">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-sans font-medium text-primary mb-4">{t('services.subtitle')}</h2>
            <p className="text-slate-700 font-secondary font-light text-lg">
              {t('services.desc')}
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {data.services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="group p-8 rounded-xl bg-almond/20 hover:bg-almond/50 transition-colors border border-transparent hover:border-sand/60"
            >
              <div className="text-xs font-semibold uppercase tracking-wider text-mocha mb-3">
                {service.category[language] || service.category.en || ''}
              </div>
              <h3 className="text-2xl font-sans font-medium text-rosewood mb-3">{service.title[language] || service.title.en || ''}</h3>
              <p className="text-slate-700 font-secondary font-light mb-6 text-sm leading-relaxed line-clamp-3">
                {service.description[language] || service.description.en || ''}
              </p>
              
              <div className="flex items-center gap-6 pt-4 border-t border-sand/40 text-sm text-mocha font-light">
                <div className="flex items-center gap-2">
                  <Clock size={14} className="text-dusty" />
                  <span>{service.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Activity size={14} className="text-dusty" />
                  <span>{service.recovery} {t('services.recovery')}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
