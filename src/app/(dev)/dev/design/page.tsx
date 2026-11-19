import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import {
  literata,
  atkinsonHyperlegibleNext,
  notoSerifDevanagari,
  notoSansDevanagari,
  notoNaskhArabic,
  jetbrainsMono,
} from '@/styles/fonts/reader';
import { DesignGallery } from './design-gallery';

export const metadata: Metadata = {
  title: 'Design System | Folio Dev',
  robots: {
    index: false,
    follow: false,
  },
};

export default function DesignPage() {
  if (process.env.NODE_ENV === 'production') {
    notFound();
  }

  const readerFontClasses = [
    literata.variable,
    atkinsonHyperlegibleNext.variable,
    notoSerifDevanagari.variable,
    notoSansDevanagari.variable,
    notoNaskhArabic.variable,
    jetbrainsMono.variable,
  ].join(' ');

  return (
    <div className={readerFontClasses}>
      <DesignGallery />
    </div>
  );
}
