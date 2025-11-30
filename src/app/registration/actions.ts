
'use client';
import { z } from "zod";
import { registrationSchema, type RegistrationFormState } from "@/lib/schema";
import { addDoc, collection, Firestore } from "firebase/firestore";

const ADMIN_EMAIL = "admin@primeforg.gg";

export async function submitRegistration(
  db: Firestore,
  data: z.infer<typeof registrationSchema>
): Promise<RegistrationFormState> {
  const validatedFields = registrationSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Validation failed. Please check the form fields.",
      success: false,
    };
  }
  
  if (validatedFields.data.email === ADMIN_EMAIL) {
    return { 
      message: "Admin user detected. No team registered.",
      success: true,
    };
  }

  try {
    await addDoc(collection(db, "teams"), {
      ...validatedFields.data,
      registrationDate: new Date().toISOString(),
    });
    
    return { 
      message: `Команда "${validatedFields.data.teamName}" успешно зарегистрирована! Мы свяжемся с вами по email.`,
      success: true
    };
  } catch (e: any) {
    console.error("Failed to process registration form:", e);
    return { 
      message: "An unexpected error occurred. Please try again later.",
      success: false
    };
  }
}
