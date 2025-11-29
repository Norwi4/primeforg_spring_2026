import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowDown, Gamepad2, Shield } from "lucide-react";

export default function Hero() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-background');

  return (
    <section id="home" className="relative w-full h-screen">
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          fill
          className="object-cover"
          priority
          data-ai-hint={heroImage.imageHint}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-primary-foreground p-4">
        <div className="max-w-4xl">
          <h1 className="font-headline text-5xl font-bold uppercase tracking-widest sm:text-6xl md:text-7xl lg:text-8xl">
            PrimeForg
          </h1>
          <p className="mt-4 font-headline text-2xl md:text-3xl text-primary tracking-wide">
            Dota 2 & CS2 - Spring 2026
          </p>
          <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground">
            Величайший киберспортивный турнир по Dota 2 и CS2 приближается. Приготовьтесь к эпическим сражениям и легендарным моментам.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/registration">
                <Shield className="mr-2 h-5 w-5" />
                Зарегистрировать команду
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
                <Link href="#tournament">
                  <Gamepad2 className="mr-2 h-5 w-5" />
                  Подробнее о турнире
                </Link>
            </Button>
          </div>
        </div>
        <div className="absolute bottom-10 animate-bounce">
            <Link href="#tournament" aria-label="Scroll to next section">
                <ArrowDown className="h-8 w-8 text-white/70" />
            </Link>
        </div>
      </div>
    </section>
  );
}
