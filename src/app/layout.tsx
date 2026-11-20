import type { Metadata } from 'next';
import { fraunces, inter } from '@/styles/fonts/ui';
import '@/styles/globals.css';
import { siteConfig } from '@/config/site';
import { ThemeProvider } from '@/lib/theme/theme-provider';
import { QueryProvider } from '@/lib/query-provider';
import { cn } from '@/lib/cn';

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={cn(fraunces.variable, inter.variable)} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('folio-theme');var d=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';var r=(t==='light'||t==='dark')?t:d;document.documentElement.setAttribute('data-theme',r);}catch(e){}})();`,
          }}
        />
      </head>
      <body className="bg-page text-text min-h-screen antialiased">
        <QueryProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
