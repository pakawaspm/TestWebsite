import type { Metadata } from 'next';
import { Albert_Sans, Outfit, Prompt } from 'next/font/google';
import './globals.css';
import { LanguageProvider } from '@/contexts/language-context';

const albert = Albert_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['400', '500'],
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-secondary',
  weight: ['300'],
});

const prompt = Prompt({
  subsets: ['thai'],
  variable: '--font-thai',
  weight: ['300', '400', '500'],
});

export const metadata: Metadata = {
  title: 'Dr. Unn | Oculoplastic Surgeon',
  description: 'Professional Oculoplastic Surgeon portfolio website',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${albert.variable} ${outfit.variable} ${prompt.variable} scroll-smooth`}>
      <body className="font-sans antialiased bg-almond/20 text-slate-800" suppressHydrationWarning>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
