'use client';

import { useState, useMemo } from 'react';
import { useLocalData } from '@/hooks/use-local-data';
import { motion, AnimatePresence } from 'motion/react';
import { BeforeAfterSlider } from './before-after-slider';
import { Lightbox } from './lightbox';
import { useLanguage } from '@/contexts/language-context';

interface LocalizedString {
  en: string;
  th: string;
}

interface Case {
  id: string;
  title: LocalizedString;
  category: LocalizedString;
  description: LocalizedString;
  beforeImage: string;
  afterImage: string;
}

interface CasesData {
  cases: Case[];
}

export function InteractivePortfolio() {
  const { data, loading } = useLocalData<CasesData>('/data/cases.json');
  const { t, language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [lightboxCase, setLightboxCase] = useState<Case | null>(null);

  const categories = useMemo(() => {
    if (!data) return ['All'];
    const cats = new Set(data.cases.map(c => c.category.en)); // Used for internal ID
    return ['All', ...Array.from(cats)];
  }, [data]);

  const filteredCases = useMemo(() => {
    if (!data) return [];
    if (activeCategory === 'All') return data.cases;
    return data.cases.filter(c => c.category.en === activeCategory);
  }, [data, activeCategory]);

  if (loading || !data) return <div className="py-24 bg-slate-50 animate-pulse h-[600px]" />;

  return (
    <section className="py-24 bg-almond/20" id="portfolio">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-bold tracking-widest text-mocha uppercase mb-3">{t('portfolio.subtitle')}</h2>
          <h3 className="text-3xl md:text-4xl font-sans font-medium text-primary mb-6">{t('portfolio.title')}</h3>
          <p className="text-slate-700 leading-relaxed text-lg font-secondary font-light mb-10">
            {t('portfolio.desc')}
          </p>

          {/* Filter */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map(category => {
              // Find translation for category if possible
              const displayCategory = category === 'All' ? t('portfolio.all') : data?.cases.find(c => c.category.en === category)?.category[language] || category;
              return (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-5 py-2 rounded-full text-sm font-secondary font-light transition-all ${
                    activeCategory === category 
                      ? 'bg-primary text-white shadow-md' 
                      : 'bg-white text-mocha hover:bg-sand/30 border border-sand/50'
                  }`}
                >
                  {displayCategory}
                </button>
              );
            })}
          </div>
        </div>

        {/* Gallery Grid */}
        <motion.div 
          layout
          className="grid md:grid-cols-2 gap-8 lg:gap-12"
        >
          <AnimatePresence mode="popLayout">
            {filteredCases.map((c, index) => (
              <motion.div
                key={c.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="group relative bg-white rounded-2xl shadow-sm border border-sand/40 overflow-hidden"
              >
                {/* Slider Component */}
                <div className="aspect-[4/3] w-full bg-slate-100 relative">
                  <BeforeAfterSlider 
                    beforeImage={c.beforeImage}
                    afterImage={c.afterImage}
                    className="h-full"
                    onClick={() => setLightboxCase(c)}
                  />
                  {/* Hover Overlay indicating it's clickable */}
                  <div 
                    className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors pointer-events-none z-20 flex items-center justify-center opacity-0 group-hover:opacity-100"
                  >
                    <div className="bg-slate-900/80 text-white text-xs px-3 py-1.5 rounded-full backdrop-blur-sm pointer-events-auto cursor-pointer" onClick={() => setLightboxCase(c)}>
                      {t('portfolio.view_details')}
                    </div>
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-6">
                  <div className="text-xs font-semibold uppercase tracking-wider text-mocha mb-2">
                    {c.category[language] || c.category.en}
                  </div>
                  <h4 className="text-xl font-sans font-medium text-rosewood mb-2">{c.title[language] || c.title.en}</h4>
                  <p className="text-slate-600 font-secondary font-light text-sm line-clamp-2">
                    {c.description[language] || c.description.en}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      {lightboxCase && (
        <Lightbox 
          isOpen={true}
          onClose={() => setLightboxCase(null)}
          title={lightboxCase.title[language] || lightboxCase.title.en}
          description={lightboxCase.description[language] || lightboxCase.description.en}
          beforeImage={lightboxCase.beforeImage}
          afterImage={lightboxCase.afterImage}
        />
      )}
    </section>
  );
}
