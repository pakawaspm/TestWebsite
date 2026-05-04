import type { Metadata } from 'next';
import './globals.css';
import { LanguageProvider } from '@/contexts/language-context';

export const metadata: Metadata = {
  title: 'Dr. Unn | Oculoplastic Surgeon',
  description: 'Professional Oculoplastic Surgeon portfolio website',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html
      lang="en"
      className="scroll-smooth"
      style={
        {
          '--font-sans': '"Albert Sans", "Helvetica Neue", Arial, sans-serif',
          '--font-secondary': '"Outfit", "Helvetica Neue", Arial, sans-serif',
          '--font-thai': '"Prompt", "Noto Sans Thai", sans-serif',
        } as React.CSSProperties
      }
    >
      <body className="font-sans antialiased bg-almond/20 text-slate-800" suppressHydrationWarning>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
