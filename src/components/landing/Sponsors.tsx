import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Card, CardContent } from "@/components/ui/card";

const sponsors = [
  { id: "sponsor-logo-1" },
  { id: "sponsor-logo-2" },
  { id: "sponsor-logo-3" },
  { id: "sponsor-logo-4" },
  { id: "sponsor-logo-5" },
  { id: "sponsor-logo-6" },
];

export default function Sponsors() {
  return (
    <section id="sponsors" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm font-body">Наши партнеры</div>
            <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-5xl text-primary">
              Спонсоры турнира
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed font-body">
              Мы благодарны нашим спонсорам, которые делают этот турнир возможным.
            </p>
          </div>
        </div>
        <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 items-center">
          {sponsors.map((sponsor) => {
            const sponsorImage = PlaceHolderImages.find(p => p.id === sponsor.id);
            return (
              <Card key={sponsor.id} className="bg-transparent border-0 shadow-none flex justify-center">
                <CardContent className="p-0">
                  {sponsorImage && (
                    <Image
                      src={sponsorImage.imageUrl}
                      alt="Sponsor Logo"
                      width={200}
                      height={100}
                      className="aspect-[2/1] object-contain"
                      data-ai-hint={sponsorImage.imageHint}
                    />
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
