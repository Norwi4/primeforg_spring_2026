"use client";

import Link from "next/link";
import { Gamepad2 } from "lucide-react";
import { useState, useEffect } from "react";

const TournamentIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <Gamepad2 {...props} />
);

const TelegramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M22 2L11 13" />
    <path d="M22 2L15 22L11 13L2 9L22 2Z" />
  </svg>
);


export default function Footer() {
  const [currentYear, setCurrentYear] = useState<number | null>(null);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-secondary/50">
      <div className="container mx-auto max-w-7xl px-4 py-8 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <TournamentIcon className="h-8 w-8 text-accent" />
            <span className="font-headline text-lg font-bold">PrimeForg</span>
          </div>
          <p className="text-sm text-center md:text-left text-muted-foreground">
            © {currentYear ? currentYear : new Date().getFullYear()} PrimeForg. Все права защищены.
          </p>
          <div className="flex items-center gap-4">
            <Link href="https://t.me/primeforg" aria-label="Telegram" target="_blank" rel="noopener noreferrer" className="text-muted-foreground transition-colors hover:text-foreground" prefetch={false}>
              <TelegramIcon className="h-5 w-5" />
            </Link>
          </div>
        </div>
        <div className="mt-6 border-t border-border pt-6 text-center text-xs text-muted-foreground">
          <p>Сражайтесь за славу.</p>
        </div>
      </div>
    </footer>
  );
}
