'use client';

import { motion } from 'motion/react';
import { Eye, Shield, Sparkles } from 'lucide-react';
import { useLanguage } from '@/contexts/language-context';

export function Oculoplastic101() {
  const { t } = useLanguage();

  return (
    <section className="py-24 bg-almond/30" id="education">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-bold tracking-widest text-mocha uppercase mb-3">{t('101.subtitle')}</h2>
          <h3 className="text-3xl md:text-4xl font-sans font-medium text-primary mb-6">{t('101.title')}</h3>
          <p className="text-slate-700 leading-relaxed text-lg font-secondary font-light">
            {t('101.desc')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {[
            { id: 'c1', icon: Eye },
            { id: 'c2', icon: Shield },
            { id: 'c3', icon: Sparkles }
          ].map((concept, index) => {
            const Icon = concept.icon;
            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-8 rounded-xl shadow-sm border border-sand/40"
              >
                <div className="w-12 h-12 bg-sand/30 rounded-lg flex items-center justify-center text-primary mb-6">
                  <Icon size={24} strokeWidth={1.5} />
                </div>
                <h4 className="text-xl font-sans font-medium text-rosewood mb-3">{t(`101.${concept.id}.title`)}</h4>
                <p className="text-slate-700 font-secondary font-light leading-relaxed">
                  {t(`101.${concept.id}.desc`)}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
