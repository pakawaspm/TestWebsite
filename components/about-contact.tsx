'use client';

import { useLocalData } from '@/hooks/use-local-data';
import { Mail, Phone, MapPin } from 'lucide-react';
import Image from 'next/image';
import { useLanguage } from '@/contexts/language-context';

interface LocalizedString {
  en: string;
  th: string;
}

interface LocalizedArray {
  en: string;
  th: string;
}

interface DoctorData {
  doctor: {
    name: LocalizedString;
    title: LocalizedString;
    bio: LocalizedString;
    certifications: LocalizedArray[];
    contact: {
      phone: LocalizedString;
      email: LocalizedString;
      address: LocalizedString;
    };
  };
}

export function AboutContact() {
  const { data, loading } = useLocalData<DoctorData>('/data/doctor.json');
  const { t, language } = useLanguage();

  if (loading || !data) return null;

  const { doctor } = data;

  return (
    <section className="py-24 bg-primary text-white border-t border-rosewood" id="contact">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Bio Section */}
          <div className="space-y-8">
            <div>
              <h2 className="text-sm font-bold tracking-widest text-dusty uppercase mb-3">{t('contact.subtitle')}</h2>
              <h3 className="text-3xl md:text-5xl font-sans font-medium mb-6">{doctor.name[language] || doctor.name.en}</h3>
              <p className="text-white font-secondary font-light text-lg leading-relaxed mb-8 text-balance">
                {doctor.bio[language] || doctor.bio.en}
              </p>
            </div>

            <div>
              <h4 className="font-sans font-medium text-lg mb-4 text-white border-b border-rosewood pb-2">{t('contact.certifications')}</h4>
              <ul className="space-y-3">
                {doctor.certifications.map((cert, i) => (
                  <li key={i} className="flex items-start gap-3 text-white font-secondary font-light">
                    <span className="text-dusty mt-1">✓</span>
                    {cert[language] || cert.en}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact Card */}
          <div className="bg-rosewood/40 border border-dusty/30 p-8 md:p-12 rounded-2xl backdrop-blur-sm self-stretch flex flex-col justify-between">
             <div>
                <h3 className="text-2xl font-sans font-medium mb-8 text-white">{t('contact.arrange')}</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/50 flex items-center justify-center flex-shrink-0 text-dusty">
                      <Phone size={18} />
                    </div>
                    <div>
                      <p className="text-sm text-sand font-secondary font-light mb-1">{t('contact.phone')}</p>
                      <a href={`tel:${(doctor.contact.phone[language] || doctor.contact.phone.en).replace(/[^0-9+]/g, '')}`} className="text-lg text-white hover:text-dusty transition-colors">{doctor.contact.phone[language] || doctor.contact.phone.en}</a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/50 flex items-center justify-center flex-shrink-0 text-dusty">
                      <Mail size={18} />
                    </div>
                    <div>
                      <p className="text-sm text-sand font-secondary font-light mb-1">{t('contact.inquiries')}</p>
                      <a href={`mailto:${doctor.contact.email[language] || doctor.contact.email.en}`} className="text-lg text-white hover:text-dusty transition-colors break-all">{doctor.contact.email[language] || doctor.contact.email.en}</a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/50 flex items-center justify-center flex-shrink-0 text-dusty">
                      <MapPin size={18} />
                    </div>
                    <div>
                      <p className="text-sm text-sand font-secondary font-light mb-1">{t('contact.location')}</p>
                      <address className="not-italic text-lg text-white font-light leading-relaxed">
                        {doctor.contact.address[language] || doctor.contact.address.en}
                      </address>
                    </div>
                  </div>
                </div>
             </div>

             <div className="mt-12 pt-8 border-t border-dusty/30">
               <button className="w-full py-4 bg-sand hover:bg-almond text-primary font-sans font-medium rounded-lg transition-colors shadow-lg shadow-black/10">
                 {t('contact.request')}
               </button>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
}
