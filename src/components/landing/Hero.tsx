import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowDown } from "lucide-react";

export default function Hero() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-background');

  return (
    <section id="home" className="relative w-full h-[85vh] md:h-screen">
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
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-primary-foreground p-4">
        <div className="max-w-4xl">
          <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            PrimeForage: Cultivating Success
          </h1>
          <p className="mt-6 max-w-3xl mx-auto font-body text-lg md:text-xl">
            Our mission is to provide unparalleled service and innovative solutions, fostering growth and stability for our clients. We are rooted in integrity, driven by excellence, and committed to your prosperity.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
                <Link href="#services">Our Services</Link>
            </Button>
            <Button size="lg" variant="secondary" asChild>
                <Link href="#contact">Get In Touch</Link>
            </Button>
          </div>
        </div>
        <div className="absolute bottom-10 animate-bounce">
            <Link href="#services" aria-label="Scroll to next section">
                <ArrowDown className="h-8 w-8 text-white/70" />
            </Link>
        </div>
      </div>
    </section>
  );
}
