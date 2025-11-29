"use client";

import Link from "next/link";
import { MountainIcon, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import React from "react";

export default function Header() {
  const [isOpen, setIsOpen] = React.useState(false);
  const navLinks = [
    { href: "#services", label: "Services" },
    { href: "#team", label: "Team" },
    { href: "#testimonials", label: "Testimonials" },
    { href: "#blog", label: "Blog" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
        <Link href="#" className="flex items-center gap-2" prefetch={false} onClick={() => setIsOpen(false)}>
          <MountainIcon className="h-6 w-6 text-primary" />
          <span className="font-headline text-xl font-bold text-primary">PrimeForage</span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-foreground/80 transition-colors hover:text-foreground"
              prefetch={false}
            >
              {link.label}
            </Link>))}
        </nav>
        <div className="flex items-center gap-4">
          <Button asChild className="hidden rounded-full md:flex">
            <Link href="#contact">Contact Us</Link>
          </Button>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="grid gap-4 p-4">
                <Link href="#" className="flex items-center gap-2" prefetch={false} onClick={() => setIsOpen(false)}>
                  <MountainIcon className="h-6 w-6 text-primary" />
                  <span className="font-headline text-lg font-bold text-primary">PrimeForage</span>
                </Link>
                <nav className="grid gap-2 text-lg font-medium">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      onClick={() => setIsOpen(false)}
                      prefetch={false}
                    >
                      {link.label}
                    </Link>
                  ))}
                   <Link
                      href="#contact"
                      className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      onClick={() => setIsOpen(false)}
                      prefetch={false}
                    >
                      Contact Us
                    </Link>
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
