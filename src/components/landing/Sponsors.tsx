'use client';
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { useCollection, useFirestore, useMemoFirebase } from "@/firebase";
import { collection } from "firebase/firestore";
import { Loader2, Handshake } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { sponsorTiers } from "@/lib/schema";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type Sponsor = {
  id: string;
  imageUrl: string;
  tier: typeof sponsorTiers[number];
}

const tierOrder: Record<typeof sponsorTiers[number], number> = {
  "Титульный партнер": 1,
  "Генеральный партнер": 2,
  "Ведущий партнер": 3,
  "Партнер": 4,
};

export default function Sponsors() {
  const firestore = useFirestore();
  const sponsorsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return collection(firestore, 'sponsors');
  }, [firestore]);

  const { data: sponsors, isLoading, error } = useCollection<Sponsor>(sponsorsQuery);

  const sortedSponsors = useMemoFirebase(() => {
    if (!sponsors) return [];
    return [...sponsors].sort((a, b) => tierOrder[a.tier] - tierOrder[b.tier]);
  }, [sponsors]);

  return (
    <section id="sponsors" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm">Наши партнеры</div>
            <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-5xl text-primary-foreground">
              Партнеры турнира
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Мы благодарны нашим партнерам, которые делают этот турнир возможным.
            </p>
          </div>
        </div>
        <div className="mt-12">
          {isLoading && <div className="flex justify-center"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>}
          {error && <p className="text-destructive text-center">Не удалось загрузить спонсоров.</p>}
          {sortedSponsors && sortedSponsors.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {sortedSponsors.map((sponsor) => (
                <Card key={sponsor.id} className="aspect-square bg-background/40 border-border/60 hover:border-primary/80 transition-all duration-300 flex flex-col group text-center items-center overflow-hidden relative">
                   <Badge variant={sponsor.tier === "Титульный партнер" || sponsor.tier === "Генеральный партнер" ? "default" : "secondary"} className="absolute top-2 left-2 z-10">
                    {sponsor.tier}
                  </Badge>
                  <CardContent className="flex items-center justify-center p-6 w-full h-full">
                    <div className="relative h-full w-full grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300">
                      <Image
                        src={sponsor.imageUrl}
                        alt={`Логотип спонсора`}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
           {sponsors?.length === 0 && !isLoading && (
            <p className="text-muted-foreground text-center p-8">Спонсоры скоро будут объявлены.</p>
          )}
        </div>
         <div className="mt-12 flex justify-center">
            <Button size="lg" asChild>
              <Link href="/partner-registration">
                <Handshake className="mr-2 h-5 w-5" />
                Стать партнером
              </Link>
            </Button>
          </div>
      </div>
    </section>
  );
}
