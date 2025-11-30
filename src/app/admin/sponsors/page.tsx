'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useUser, useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from '@/components/ui/label';
import { Loader2, PlusCircle, Edit, Trash2, AlertCircle } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { sponsorSchema, SponsorPayload } from '@/lib/schema';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

type Sponsor = {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
};

export default function AdminSponsorsPage() {
  const router = useRouter();
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();
  const { toast } = useToast();
  
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingSponsor, setEditingSponsor] = useState<Sponsor | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  const sponsorsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return collection(firestore, 'sponsors');
  }, [firestore]);

  const { data: sponsors, isLoading, error: collectionError } = useCollection<Sponsor>(sponsorsQuery);

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/login');
    }
  }, [user, isUserLoading, router]);

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!firestore) return;
    
    setIsSubmitting(true);
    setFormError(null);

    const formData = new FormData(event.currentTarget);
    const payload: SponsorPayload = {
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      imageUrl: formData.get('imageUrl') as string,
    };
    
    const validatedFields = sponsorSchema.safeParse(payload);

    if (!validatedFields.success) {
      const firstError = validatedFields.error.errors[0]?.message || "Validation failed.";
      setFormError(firstError);
      setIsSubmitting(false);
      return;
    }
    
    try {
        if (editingSponsor) {
            const sponsorDocRef = doc(firestore, 'sponsors', editingSponsor.id);
            await updateDoc(sponsorDocRef, validatedFields.data)
            toast({ title: "Sponsor updated successfully!" });
        } else {
            const sponsorsCollection = collection(firestore, 'sponsors');
            await addDoc(sponsorsCollection, validatedFields.data)
            toast({ title: "Sponsor added successfully!" });
        }
    } catch (err: any) {
        const operation = editingSponsor ? 'update' : 'create';
        const docRef = editingSponsor ? doc(firestore, 'sponsors', editingSponsor.id) : collection(firestore, 'sponsors');
        
        errorEmitter.emit('permission-error', new FirestorePermissionError({
            path: docRef.path,
            operation: operation,
            requestResourceData: validatedFields.data,
        }));
    }


    setIsSubmitting(false);
    setDialogOpen(false);
  };

  const handleEdit = (sponsor: Sponsor) => {
    setEditingSponsor(sponsor);
    setDialogOpen(true);
    setFormError(null);
  };

  const handleAddNew = () => {
    setEditingSponsor(null);
    setDialogOpen(true);
    setFormError(null);
  };

  const handleDelete = async (id: string) => {
    if (!firestore) return;
    const sponsorDocRef = doc(firestore, "sponsors", id);
    try {
        await deleteDoc(sponsorDocRef);
        toast({ title: "Спонсор удален" });
    } catch(err) {
        errorEmitter.emit('permission-error', new FirestorePermissionError({
            path: sponsorDocRef.path,
            operation: 'delete',
        }));
    }
  };
  
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
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="font-headline text-3xl font-bold tracking-tighter text-primary">
                    Управление спонсорами
                  </CardTitle>
                  <CardDescription>Добавляйте, редактируйте и удаляйте спонсоров турнира.</CardDescription>
                </div>
                <Button onClick={handleAddNew}>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Добавить спонсора
                </Button>
              </CardHeader>
              <CardContent>
                {isLoading && <div className="flex justify-center p-8"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>}
                {collectionError && <p className="text-destructive text-center">Ошибка при загрузке: {collectionError.message}</p>}
                {sponsors && !isLoading && (
                  <div className="overflow-x-auto rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Логотип</TableHead>
                          <TableHead>Название</TableHead>
                          <TableHead>Описание</TableHead>
                          <TableHead className="text-right">Действия</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {sponsors.map((sponsor) => (
                          <TableRow key={sponsor.id}>
                            <TableCell>
                              <Image src={sponsor.imageUrl} alt={sponsor.name} width={100} height={50} className="object-contain rounded-md bg-muted p-1" />
                            </TableCell>
                            <TableCell className="font-medium">{sponsor.name}</TableCell>
                            <TableCell>{sponsor.description}</TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="icon" onClick={() => handleEdit(sponsor)}>
                                <Edit className="h-4 w-4" />
                              </Button>
                               <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                                      <Trash2 className="h-4 w-4" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                    <AlertDialogTitle>Вы уверены?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        Это действие нельзя отменить. Спонсор будет удален навсегда.
                                    </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                    <AlertDialogCancel>Отмена</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => handleDelete(sponsor.id)}>Удалить</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                               </AlertDialog>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
                {sponsors?.length === 0 && !isLoading && (
                  <p className="text-muted-foreground text-center p-8">Спонсоры еще не добавлены.</p>
                )}
              </CardContent>
            </Card>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingSponsor ? 'Редактировать спонсора' : 'Добавить спонсора'}</DialogTitle>
              </DialogHeader>
                <form onSubmit={handleFormSubmit} className="space-y-4">
                    {formError && (
                        <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Ошибка</AlertTitle>
                            <AlertDescription>{formError}</AlertDescription>
                        </Alert>
                    )}

                    <div className="space-y-2">
                        <Label htmlFor="name">Название</Label>
                        <Input id="name" name="name" placeholder="Название спонсора" defaultValue={editingSponsor?.name} required />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Описание</Label>
                        <Textarea id="description" name="description" placeholder="Краткое описание спонсора" defaultValue={editingSponsor?.description} required />
                    </div>
                    
                    <div className="space-y-2">
                        <Label htmlFor="imageUrl">URL Логотипа</Label>
                        <Input id="imageUrl" name="imageUrl" type="url" placeholder="https://example.com/logo.png" defaultValue={editingSponsor?.imageUrl} required />
                         {editingSponsor?.imageUrl && (
                            <Image src={editingSponsor.imageUrl} alt="предпросмотр" width={100} height={50} className="mt-2 object-contain rounded-md bg-muted p-1"/>
                         )}
                    </div>

                  <DialogFooter>
                    <DialogClose asChild>
                      <Button type="button" variant="secondary">Отмена</Button>
                    </DialogClose>
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      {editingSponsor ? 'Сохранить изменения' : 'Добавить'}
                    </Button>
                  </DialogFooter>
                </form>
            </DialogContent>
          </Dialog>
        </div>
      </main>
      <Footer />
    </div>
  );
}
