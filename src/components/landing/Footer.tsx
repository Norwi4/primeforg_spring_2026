"use client";

import Link from "next/link";
import { Twitter, Linkedin, Facebook, Gamepad2 } from "lucide-react";
import { useState, useEffect } from "react";

const TournamentIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <Gamepad2 {...props} />
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
            <Link href="#" aria-label="Twitter" className="text-muted-foreground transition-colors hover:text-foreground" prefetch={false}>
              <Twitter className="h-5 w-5" />
            </Link>
            <Link href="#" aria-label="LinkedIn" className="text-muted-foreground transition-colors hover:text-foreground" prefetch={false}>
              <Linkedin className="h-5 w-5" />
            </Link>
            <Link href="#" aria-label="Facebook" className="text-muted-foreground transition-colors hover:text-foreground" prefetch={false}>
              <Facebook className="h-5 w-5" />
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
