"use client";

import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import React from "react";

const Dota2Icon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M41.7647 1.05882L0 32.7647V80L41.7647 62.1176V1.05882Z" fill="#A42A28"/>
        <path d="M128 48L86.2353 65.8824V127L128 95.2353V48Z" fill="#A42A28"/>
        <path d="M41.7647 62.1176L0 80V127L128 48V1.05882L41.7647 62.1176Z" fill="#E4423A"/>
    </svg>
);


export default function Header() {
  const [isOpen, setIsOpen] = React.useState(false);
  const navLinks = [
    { href: "#tournament", label: "Турнир" },
    { href: "#sponsors", label: "Спонсоры" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
        <Link href="#" className="flex items-center gap-3" prefetch={false} onClick={() => setIsOpen(false)}>
          <Dota2Icon className="h-8 w-8" />
          <span className="font-headline text-xl font-bold tracking-wider text-primary-foreground">Dota 2 Championship</span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-muted-foreground transition-colors hover:text-foreground"
              prefetch={false}
            >
              {link.label}
            </Link>))}
        </nav>
        <div className="flex items-center gap-4">
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
                  <Dota2Icon className="h-6 w-6" />
                  <span className="font-headline text-lg font-bold text-primary-foreground">Dota 2 Championship</span>
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
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
