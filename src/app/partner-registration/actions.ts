"use server";
import { z } from "zod";
import { partnerRegistrationSchema, type PartnerRegistrationFormState } from "@/lib/schema";

export async function submitPartnerRegistrationForm(
  data: z.infer<typeof partnerRegistrationSchema>
): Promise<PartnerRegistrationFormState> {
  const validatedFields = partnerRegistrationSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Проверка не удалась. Пожалуйста, проверьте поля формы.",
      success: false,
    };
  }
  
  // Here you would typically send an email, save to a database, etc.
  // For this MVP, we'll just simulate a successful submission.
  console.log("New partner inquiry:", validatedFields.data);

  return { 
    message: `Ваша заявка от имени "${validatedFields.data.companyName}" успешно отправлена! Мы скоро с вами свяжемся.`,
    success: true
  };
}
