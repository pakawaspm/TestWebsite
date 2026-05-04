'use client';

import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import Image from 'next/image';

interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  beforeImage: string;
  afterImage: string;
}

export function Lightbox({ isOpen, onClose, title, description, beforeImage, afterImage }: LightboxProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-12">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-slate-900/90 backdrop-blur-sm"
          onClick={onClose}
        />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative max-w-6xl w-full bg-white rounded-xl shadow-2xl overflow-hidden z-10 flex flex-col md:flex-row h-full max-h-[85vh]"
          onClick={(e) => e.stopPropagation()}
        >
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-10 h-10 bg-black/10 hover:bg-black/20 text-slate-800 rounded-full flex items-center justify-center backdrop-blur transition-colors"
          >
            <X size={20} />
          </button>

          <div className="flex-1 flex flex-col md:flex-row bg-slate-100 overflow-y-auto md:overflow-hidden">
            {/* Before */}
            <div className="flex-1 relative min-h-[40vh] md:min-h-full">
               <Image 
                  src={beforeImage} 
                  alt="Before"
                  fill
                  className="object-contain"
                  referrerPolicy="no-referrer"
               />
               <div className="absolute top-4 left-4 bg-white/80 backdrop-blur px-3 py-1 rounded text-xs font-semibold tracking-wider uppercase shadow-sm">
                 Before
               </div>
            </div>
            {/* Divider */}
            <div className="w-px bg-slate-200 hidden md:block" />
            <div className="h-px bg-slate-200 block md:hidden" />
            {/* After */}
            <div className="flex-1 relative min-h-[40vh] md:min-h-full">
               <Image 
                  src={afterImage} 
                  alt="After"
                  fill
                  className="object-contain"
                  referrerPolicy="no-referrer"
               />
               <div className="absolute top-4 left-4 bg-white/80 backdrop-blur px-3 py-1 rounded text-xs font-semibold tracking-wider uppercase shadow-sm">
                 After
               </div>
            </div>
          </div>

          <div className="w-full md:w-80 bg-white p-6 md:p-8 flex flex-col justify-center border-l border-slate-100 overflow-y-auto">
            <h3 className="text-2xl font-serif text-slate-900 mb-4">{title}</h3>
            <p className="text-slate-600 font-light leading-relaxed mb-6 text-sm">
              {description}
            </p>
            <div className="mt-auto pt-6 text-xs text-slate-400 font-light text-center border-t border-slate-100">
              High-resolution clinical images. Results may vary by patient.
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
