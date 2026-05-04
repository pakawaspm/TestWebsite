'use client';

import { useLocalData } from '@/hooks/use-local-data';
import { motion } from 'motion/react';
import { ArrowRight, Calendar } from 'lucide-react';

import { useLanguage } from '@/contexts/language-context';

interface LocalizedString {
  en: string;
  th: string;
}

interface Article {
  id: string;
  date: string;
  title: LocalizedString;
  summary: LocalizedString;
  link: string;
}

interface KnowledgeData {
  articles: Article[];
}

export function KnowledgeSharing() {
  const { data, loading } = useLocalData<KnowledgeData>('/data/knowledge.json');
  const { t, language } = useLanguage();

  if (loading || !data) return null;

  return (
    <section className="py-24 bg-white" id="knowledge">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-sans font-medium text-primary mb-4">{t('knowledge.title')}</h2>
            <p className="text-slate-700 font-secondary font-light text-lg">
              {t('knowledge.desc')}
            </p>
          </div>
          <a href="#" className="flex items-center gap-2 text-rosewood font-medium hover:text-primary transition-colors">
            {t('knowledge.view_all')} <ArrowRight size={16} />
          </a>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.articles.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="flex flex-col h-full bg-almond/20 border border-sand/40 p-8 rounded-xl"
            >
              <div className="flex items-center gap-2 text-mocha text-xs font-medium uppercase tracking-wider mb-4">
                <Calendar size={14} />
                <time>{article.date}</time>
              </div>
              <h3 className="text-xl font-sans font-medium text-rosewood mb-3">{article.title[language] || article.title.en}</h3>
              <p className="text-slate-700 font-secondary font-light mb-6 flex-grow leading-relaxed">
                {article.summary[language] || article.summary.en}
              </p>
              <a href={article.link} className="inline-flex items-center gap-2 text-sm font-semibold text-dusty group">
                {t('knowledge.read')}
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
