"use client";

import Link from "next/link";
import { Twitter, Linkedin, Facebook } from "lucide-react";
import { useState, useEffect } from "react";

const Dota2Icon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M41.7647 1.05882L0 32.7647V80L41.7647 62.1176V1.05882Z" fill="#A42A28"/>
        <path d="M128 48L86.2353 65.8824V127L128 95.2353V48Z" fill="#A42A28"/>
        <path d="M41.7647 62.1176L0 80V127L128 48V1.05882L41.7647 62.1176Z" fill="#E4423A"/>
    </svg>
);

export default function Footer() {
  const [currentYear, setCurrentYear] = useState<number | null>(null);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-primary/90 text-primary-foreground/80">
      <div className="container mx-auto max-w-7xl px-4 py-8 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Dota2Icon className="h-6 w-6 text-accent" />
            <span className="font-headline text-lg font-bold">Dota 2 Championship</span>
          </div>
          <p className="text-sm font-body text-center md:text-left">
            © {currentYear ? currentYear : new Date().getFullYear()} Dota 2 Championship. Все права защищены.
          </p>
          <div className="flex items-center gap-4">
            <Link href="#" aria-label="Twitter" prefetch={false}>
              <Twitter className="h-5 w-5 transition-colors hover:text-primary-foreground" />
            </Link>
            <Link href="#" aria-label="LinkedIn" prefetch={false}>
              <Linkedin className="h-5 w-5 transition-colors hover:text-primary-foreground" />
            </Link>
            <Link href="#" aria-label="Facebook" prefetch={false}>
              <Facebook className="h-5 w-5 transition-colors hover:text-primary-foreground" />
            </Link>
          </div>
        </div>
        <div className="mt-6 border-t border-primary-foreground/20 pt-6 text-center text-xs">
          <p>Сражайтесь за славу.</p>
        </div>
      </div>
    </footer>
  );
}
