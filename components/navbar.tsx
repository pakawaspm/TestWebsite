'use client';

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '@/contexts/language-context';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const { t, language, setLanguage } = useLanguage();

  const links = [
    { name: t('nav.education'), href: '#education' },
    { name: t('nav.services'), href: '#services' },
    { name: t('nav.gallery'), href: '#portfolio' },
    { name: t('nav.knowledge'), href: '#knowledge' },
    { name: t('nav.contact'), href: '#contact' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-4 tracking-tight' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 max-w-7xl flex items-center justify-between">
        <a href="#" className="font-sans text-2xl font-medium tracking-tight text-primary hover:opacity-80 transition-opacity">
          Dr. <span className="text-mocha font-light">Unn</span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className="text-sm font-medium text-slate-600 hover:text-primary transition-colors"
            >
              {link.name}
            </a>
          ))}
          <div className="flex items-center gap-2 border-l border-slate-200 pl-4">
            <button 
              onClick={() => setLanguage('en')}
              className={`text-xs font-semibold ${language === 'en' ? 'text-primary' : 'text-slate-400 hover:text-slate-600'}`}
            >
              EN
            </button>
            <span className="text-slate-300 text-xs">|</span>
            <button 
              onClick={() => setLanguage('th')}
              className={`text-xs font-semibold ${language === 'th' ? 'text-primary' : 'text-slate-400 hover:text-slate-600'}`}
            >
              TH
            </button>
          </div>
          <a 
            href="#contact"
            className="px-5 py-2.5 bg-primary text-white rounded-full text-sm font-medium hover:bg-rosewood transition-colors"
          >
            {t('nav.consultation')}
          </a>
        </nav>

        {/* Mobile Nav Toggle and Language Stack */}
        <div className="md:hidden flex items-center gap-4">
          <div className="flex items-center gap-2">
            <button onClick={() => setLanguage('en')} className={`text-xs font-semibold ${language === 'en' ? 'text-primary' : 'text-slate-400'}`}>EN</button>
            <span className="text-slate-300 text-xs">|</span>
            <button onClick={() => setLanguage('th')} className={`text-xs font-semibold ${language === 'th' ? 'text-primary' : 'text-slate-400'}`}>TH</button>
          </div>
          <button 
            className="p-2 text-slate-700" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="md:hidden bg-white border-t border-slate-100 overflow-hidden"
        >
          <nav className="flex flex-col container mx-auto px-6 py-6 gap-4">
            {links.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-medium text-slate-700 hover:text-primary py-2 border-b border-slate-50"
              >
                {link.name}
              </a>
            ))}
          </nav>
        </motion.div>
      )}
    </header>
  );
}
