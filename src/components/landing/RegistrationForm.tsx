"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { submitRegistration } from "@/app/registration/actions";
import { registrationSchema, type RegistrationFormState } from "@/lib/schema";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useFirestore } from "@/firebase";

export default function RegistrationForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const firestore = useFirestore();

  const form = useForm<z.infer<typeof registrationSchema>>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      teamName: "",
      captainName: "",
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof registrationSchema>) {
    setIsSubmitting(true);
    const result: RegistrationFormState = await submitRegistration(firestore, values);
    setIsSubmitting(false);

    if (result.success) {
      toast({
        title: "Регистрация прошла успешно!",
        description: result.message,
      });
      form.reset();
    } else {
      if (result.errors) {
        Object.entries(result.errors).forEach(([field, messages]) => {
          if (messages) {
            form.setError(field as keyof z.infer<typeof registrationSchema>, {
              type: "server",
              message: messages.join(", "),
            });
          }
        });
      }
      toast({
        variant: "destructive",
        title: "Ошибка регистрации.",
        description: result.message,
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 text-left">
        <FormField
          control={form.control}
          name="teamName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Название команды</FormLabel>
              <FormControl>
                <Input placeholder="Например, The Champions" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="captainName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Имя и фамилия капитана</FormLabel>
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
                <Input placeholder="captain@email.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="game"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Выберите дисциплину</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="dota2" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Dota 2
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="cs2" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      CS2
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
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
            "Зарегистрировать команду"
          )}
        </Button>
      </form>
    </Form>
  );
}
