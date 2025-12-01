"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from 'next/navigation';

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { submitPartnerRegistrationForm } from "@/app/partner-registration/actions";
import { partnerRegistrationSchema, type PartnerRegistrationFormState } from "@/lib/schema";
import { Loader2 } from "lucide-react";
import { useState } from "react";

export default function PartnerRegistrationForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof partnerRegistrationSchema>>({
    resolver: zodResolver(partnerRegistrationSchema),
    defaultValues: {
      companyName: "",
      contactPerson: "",
      email: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof partnerRegistrationSchema>) {
    setIsSubmitting(true);
    const result: PartnerRegistrationFormState = await submitPartnerRegistrationForm(values);
    setIsSubmitting(false);

    if (result.success) {
      toast({
        title: "Заявка отправлена!",
        description: result.message,
      });
      form.reset();
      router.push('/');
    } else {
      if (result.errors) {
        Object.entries(result.errors).forEach(([field, messages]) => {
          if (messages) {
            form.setError(field as keyof z.infer<typeof partnerRegistrationSchema>, {
              type: "server",
              message: messages.join(", "),
            });
          }
        });
      }
      toast({
        variant: "destructive",
        title: "Ошибка отправки.",
        description: result.message,
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 text-left">
        <FormField
          control={form.control}
          name="companyName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Название компании</FormLabel>
              <FormControl>
                <Input placeholder="Например, CyberCorp" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="contactPerson"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Контактное лицо</FormLabel>
              <FormControl>
                <Input placeholder="Иван Иванов" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Контактный Email</FormLabel>
              <FormControl>
                <Input placeholder="partner@email.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Сообщение (необязательно)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Расскажите нам о вашей компании и предложениях..."
                  className="min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Отправка...
            </>
          ) : (
            "Отправить заявку"
          )}
        </Button>
      </form>
    </Form>
  );
}
