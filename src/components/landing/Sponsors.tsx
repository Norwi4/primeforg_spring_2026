import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const sponsors = [
  { 
    id: "sponsor-logo-1",
    name: "TechNova",
    description: "Передовые игровые технологии и оборудование."
  },
  { 
    id: "sponsor-logo-2",
    name: "CyberCore",
    description: "Высокопроизводительные компоненты для ПК."
  },
  { 
    id: "sponsor-logo-3",
    name: "G-Fuel",
    description: "Энергетические напитки для геймеров."
  },
  { 
    id: "sponsor-logo-4",
    name: "Quantum Leap",
    description: "Облачные игровые сервисы и хостинг."
  },
  { 
    id: "sponsor-logo-5",
    name: "Nexus Gaming",
    description: "Сеть игровых центров и арен."
  },
  { 
    id: "sponsor-logo-6",
    name: "PixelPerfect",
    description: "Профессиональные игровые мониторы."
  },
];

export default function Sponsors() {
  return (
    <section id="sponsors" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm">Наши партнеры</div>
            <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-5xl text-primary-foreground">
              Спонсоры турнира
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Мы благодарны нашим спонсорам, которые делают этот турнир возможным.
            </p>
          </div>
        </div>
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {sponsors.map((sponsor) => {
            const sponsorImage = PlaceHolderImages.find(p => p.id === sponsor.id);
            return (
              <Card key={sponsor.id} className="bg-background/40 border-border/60 hover:border-primary/80 transition-all duration-300 flex flex-col group text-center items-center">
                <CardHeader className="pb-4">
                  {sponsorImage && (
                    <div className="flex justify-center grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300 p-4 rounded-lg">
                      <Image
                        src={sponsorImage.imageUrl}
                        alt={`${sponsor.name} Logo`}
                        width={158}
                        height={79}
                        className="aspect-[2/1] object-contain"
                        data-ai-hint={sponsorImage.imageHint}
                      />
                    </div>
                  )}
                  <CardTitle className="font-headline text-xl font-bold text-primary-foreground group-hover:text-primary transition-colors">{sponsor.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{sponsor.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
