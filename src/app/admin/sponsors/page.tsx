'use client';
import { useEffect, useState, useMemo, useActionState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useUser, useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, deleteDoc, doc } from 'firebase/firestore';
import { addSponsor, updateSponsor } from '@/app/actions';
import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from '@/components/ui/label';
import { Loader2, PlusCircle, Edit, Trash2, Upload, AlertCircle } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useFormStatus } from 'react-dom';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

type Sponsor = {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
};

const initialState = { message: '', success: false, errors: [] };

function SubmitButton({ isEditing }: { isEditing: boolean }) {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" disabled={pending}>
            {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isEditing ? 'Сохранить изменения' : 'Добавить'}
        </Button>
    );
}

export default function AdminSponsorsPage() {
  const router = useRouter();
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();
  const { toast } = useToast();
  
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingSponsor, setEditingSponsor] = useState<Sponsor | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [addState, addFormAction] = useActionState(addSponsor, initialState);
  const [updateState, updateFormAction] = useActionState(updateSponsor, initialState);

  const formRef = useRef<HTMLFormElement>(null);

  const sponsorsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return collection(firestore, 'sponsors');
  }, [firestore]);

  const { data: sponsors, isLoading, error } = useCollection<Sponsor>(sponsorsQuery);

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/login');
    }
  }, [user, isUserLoading, router]);

  useEffect(() => {
    if (addState.success || updateState.success) {
      toast({ title: addState.success ? "Спонсор добавлен" : "Спонсор обновлен" });
      setDialogOpen(false);
    }
  }, [addState, updateState, toast]);

  useEffect(() => {
    if (!dialogOpen) {
      setEditingSponsor(null);
      setImagePreview(null);
      formRef.current?.reset();
    }
  }, [dialogOpen]);

  useEffect(() => {
    if (editingSponsor) {
        setImagePreview(editingSponsor.imageUrl);
    } else {
        setImagePreview(null);
    }
  }, [editingSponsor]);
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      // If file is cleared, revert to original image if editing
      setImagePreview(editingSponsor?.imageUrl || null);
    }
  };

  const handleEdit = (sponsor: Sponsor) => {
    setEditingSponsor(sponsor);
    setDialogOpen(true);
  };

  const handleAddNew = () => {
    setEditingSponsor(null);
    setDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!firestore) return;
    try {
      await deleteDoc(doc(firestore, "sponsors", id));
      toast({ title: "Спонсор удален" });
    } catch (e) {
      console.error(e);
      toast({ variant: "destructive", title: "Ошибка при удалении спонсора" });
    }
  };
  
  const currentFormState = editingSponsor ? updateState : addState;

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
                {error && <p className="text-destructive text-center">Ошибка при загрузке: {error.message}</p>}
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
                <form ref={formRef} action={editingSponsor ? updateFormAction : addFormAction} className="space-y-4">
                     {editingSponsor && <input type="hidden" name="id" value={editingSponsor.id} />}
                     {editingSponsor && <input type="hidden" name="existingImageUrl" value={editingSponsor.imageUrl} />}

                    {currentFormState.message && !currentFormState.success && (
                        <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Ошибка</AlertTitle>
                            <AlertDescription>{currentFormState.message}</AlertDescription>
                        </Alert>
                    )}

                    <div className="space-y-2">
                        <Label htmlFor="name">Название</Label>
                        <Input id="name" name="name" placeholder="Название спонсора" defaultValue={editingSponsor?.name} required />
                        {currentFormState.errors?.find(e => e.path[0] === 'name') && <p className="text-sm font-medium text-destructive">{currentFormState.errors.find(e => e.path[0] === 'name')?.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Описание</Label>
                        <Textarea id="description" name="description" placeholder="Краткое описание спонсора" defaultValue={editingSponsor?.description} required />
                         {currentFormState.errors?.find(e => e.path[0] === 'description') && <p className="text-sm font-medium text-destructive">{currentFormState.errors.find(e => e.path[0] === 'description')?.message}</p>}
                    </div>
                    
                    <div className="space-y-2">
                        <Label>Логотип</Label>
                        <div className="flex items-center gap-4">
                            <div className="w-24 h-24 rounded-md border border-dashed flex items-center justify-center bg-muted/50">
                            {imagePreview ? (
                                <Image src={imagePreview} alt="Предпросмотр" width={96} height={96} className="object-contain rounded-md"/>
                            ) : (
                                <div className="text-center text-muted-foreground">
                                    <Upload className="mx-auto h-6 w-6"/>
                                    <span className="text-xs">Загрузите</span>
                                </div>
                            )}
                            </div>
                            <Input id="image" name="image" type="file" className="flex-1" onChange={handleFileChange} accept="image/png, image/jpeg, image/gif, image/webp" />
                        </div>
                        {currentFormState.errors?.find(e => e.path[0] === 'imageUrl') && <p className="text-sm font-medium text-destructive">{currentFormState.errors.find(e => e.path[0] === 'imageUrl')?.message}</p>}
                    </div>

                  <DialogFooter>
                    <DialogClose asChild>
                      <Button type="button" variant="secondary">Отмена</Button>
                    </DialogClose>
                    <SubmitButton isEditing={!!editingSponsor} />
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
