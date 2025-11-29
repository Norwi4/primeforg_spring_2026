'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser, useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection } from 'firebase/firestore';
import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from 'lucide-react';
import { format } from 'date-fns';

type Team = {
    id: string;
    teamName: string;
    captainName: string;
    email: string;
    game: string;
    registrationDate: string;
}

export default function AdminPage() {
  const router = useRouter();
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();

  const teamsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return collection(firestore, 'teams');
  }, [firestore]);

  const { data: teams, isLoading, error } = useCollection<Team>(teamsQuery);
  
  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/login');
    }
  }, [user, isUserLoading, router]);

  if (isUserLoading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex min-h-[100dvh] flex-col bg-secondary">
      <Header />
      <main className="flex-1 py-12 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-3xl font-bold tracking-tighter text-primary">
                Зарегистрированные команды ({teams?.length ?? 0})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading && <div className="flex justify-center p-8"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>}
              {error && <p className="text-destructive text-center">Ошибка при загрузке команд: {error.message}</p>}
              {teams && !isLoading && (
                <div className="overflow-x-auto rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Название команды</TableHead>
                        <TableHead>Капитан</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Дисциплина</TableHead>
                        <TableHead>Дата регистрации</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {teams.map((team) => (
                        <TableRow key={team.id}>
                          <TableCell>{team.teamName}</TableCell>
                          <TableCell>{team.captainName}</TableCell>
                          <TableCell>{team.email}</TableCell>
                          <TableCell>{team.game === 'dota2' ? 'Dota 2' : 'CS2'}</TableCell>
                          <TableCell>{format(new Date(team.registrationDate), 'dd.MM.yyyy HH:mm')}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
               {teams?.length === 0 && !isLoading && (
                <p className="text-muted-foreground text-center p-8">Пока не зарегистрировано ни одной команды.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
