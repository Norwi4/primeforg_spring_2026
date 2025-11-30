'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useUser, useFirestore, useStorage, useCollection, useMemoFirebase } from '@/firebase';
import { collection, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { sponsorSchema } from "@/lib/schema";
import { z } from "zod";
import { Loader2, PlusCircle, Edit, Trash2, Upload } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

type Sponsor = {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
};

type SponsorFormData = z.infer<typeof sponsorSchema>;

export default function AdminSponsorsPage() {
  const router = useRouter();
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();
  const storage = useStorage();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingSponsor, setEditingSponsor] = useState<Sponsor | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);


  const sponsorsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return collection(firestore, 'sponsors');
  }, [firestore]);

  const { data: sponsors, isLoading, error } = useCollection<Sponsor>(sponsorsQuery);

  const form = useForm<SponsorFormData>({
    resolver: zodResolver(sponsorSchema),
    defaultValues: {
      name: "",
      description: "",
      imageUrl: "",
    },
  });

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/login');
    }
  }, [user, isUserLoading, router]);
  
  useEffect(() => {
      if (!dialogOpen) {
          setEditingSponsor(null);
          setImageFile(null);
          setImagePreview(null);
          form.reset({ name: "", description: "", imageUrl: "" });
      }
  }, [dialogOpen, form]);

  useEffect(() => {
    if (editingSponsor) {
      form.reset(editingSponsor);
      setImagePreview(editingSponsor.imageUrl);
      setImageFile(null);
    } else {
      form.reset({ name: "", description: "", imageUrl: "" });
      setImagePreview(null);
      setImageFile(null);
    }
  }, [editingSponsor, form]);
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
          setImageFile(file);
          const reader = new FileReader();
          reader.onloadend = () => {
              setImagePreview(reader.result as string);
          };
          reader.readAsDataURL(file);
          form.setValue('imageUrl', 'file-uploaded'); // Satisfy zod schema for file uploads
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

  const uploadImage = async (): Promise<string | null> => {
      if (!imageFile || !storage) return null;
      const imageRef = storageRef(storage, `sponsors/${Date.now()}_${imageFile.name}`);
      try {
          const snapshot = await uploadBytes(imageRef, imageFile);
          const downloadURL = await getDownloadURL(snapshot.ref);
          return downloadURL;
      } catch (e) {
          console.error("Image upload failed:", e);
          toast({ variant: "destructive", title: "Ошибка загрузки изображения" });
          return null;
      }
  };

  const onSubmit = async (values: SponsorFormData) => {
    if (!firestore || !sponsorsQuery) return;
    setIsSubmitting(true);

    let finalImageUrl = editingSponsor?.imageUrl || "";

    if (imageFile) {
        const uploadedUrl = await uploadImage();
        if (uploadedUrl) {
            finalImageUrl = uploadedUrl;
        } else {
            // Halt submission if image upload fails
            setIsSubmitting(false);
            return;
        }
    }

    // Ensure imageUrl is not empty if it's a new sponsor with no image
    if (!finalImageUrl) {
        form.setError("imageUrl", { type: "manual", message: "Логотип обязателен" });
        setIsSubmitting(false);
        return;
    }

    const dataToSave = { ...values, imageUrl: finalImageUrl };

    try {
      if (editingSponsor) {
        const sponsorDoc = doc(firestore, "sponsors", editingSponsor.id);
        await updateDoc(sponsorDoc, dataToSave);
        toast({ title: "Спонсор обновлен" });
      } else {
        await addDoc(sponsorsQuery, dataToSave);
        toast({ title: "Спонсор добавлен" });
      }
      setDialogOpen(false);
    } catch (e) {
      console.error(e);
      toast({ variant: "destructive", title: "Произошла ошибка" });
    } finally {
      setIsSubmitting(false);
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
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField control={form.control} name="name" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Название</FormLabel>
                      <FormControl><Input placeholder="Название спонсора" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="description" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Описание</FormLabel>
                      <FormControl><Textarea placeholder="Краткое описание спонсора" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="imageUrl" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Логотип</FormLabel>
                        <FormControl>
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
                                <Input id="picture" type="file" className="flex-1" onChange={handleFileChange} accept="image/png, image/jpeg, image/gif, image/webp" />
                            </div>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                  )} />
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
              </Form>
            </DialogContent>

          </Dialog>
        </div>
      </main>
      <Footer />
    </div>
  );
}
