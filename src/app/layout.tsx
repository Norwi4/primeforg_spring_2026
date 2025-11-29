import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { cn } from '@/lib/utils';
import { Inter as FontSans } from "next/font/google"
import { Orbitron } from 'next/font/google';

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

const fontHeadline = Orbitron({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-headline',
});


export const metadata: Metadata = {
  title: 'Dota 2 Tournament - Spring 2026',
  description: 'The ultimate Dota 2 tournament is coming in Spring 2026. Get ready for epic battles and legendary plays.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark !scroll-smooth">
      <body className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
          fontHeadline.variable
        )}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
