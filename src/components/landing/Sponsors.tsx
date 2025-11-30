'use client';
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCollection, useFirestore, useMemoFirebase } from "@/firebase";
import { collection } from "firebase/firestore";
import { Loader2 } from "lucide-react";

type Sponsor = {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
}

export default function Sponsors() {
  const firestore = useFirestore();
  const sponsorsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return collection(firestore, 'sponsors');
  }, [firestore]);

  const { data: sponsors, isLoading, error } = useCollection<Sponsor>(sponsorsQuery);

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
        <div className="mt-12">
          {isLoading && <div className="flex justify-center"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>}
          {error && <p className="text-destructive text-center">Не удалось загрузить спонсоров.</p>}
          {sponsors && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {sponsors.map((sponsor) => (
                <Card key={sponsor.id} className="bg-background/40 border-border/60 hover:border-primary/80 transition-all duration-300 flex flex-col group text-center items-center">
                  <CardHeader className="pb-4">
                    <div className="flex justify-center grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300 p-4 rounded-lg">
                      <Image
                        src={sponsor.imageUrl}
                        alt={`${sponsor.name} Logo`}
                        width={158}
                        height={79}
                        className="aspect-[2/1] object-contain"
                      />
                    </div>
                    <CardTitle className="font-headline text-xl font-bold text-primary-foreground group-hover:text-primary transition-colors">{sponsor.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{sponsor.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
           {sponsors?.length === 0 && !isLoading && (
            <p className="text-muted-foreground text-center p-8">Спонсоры скоро будут объявлены.</p>
          )}
        </div>
      </div>
    </section>
  );
}
