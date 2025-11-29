"use client";

import Link from "next/link";
import { MountainIcon, Twitter, Linkedin, Facebook } from "lucide-react";
import { useState, useEffect } from "react";

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
            <MountainIcon className="h-6 w-6 text-accent" />
            <span className="font-headline text-lg font-bold">PrimeForage</span>
          </div>
          <p className="text-sm font-body text-center md:text-left">
            © {currentYear ? currentYear : new Date().getFullYear()} PrimeForage. All rights reserved.
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
          <p>Built with passion. Designed for success.</p>
        </div>
      </div>
    </footer>
  );
}
