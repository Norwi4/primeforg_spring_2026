
"use server";
import { z } from "zod";
import { registrationSchema, type RegistrationFormState } from "@/lib/schema";
import { getFirestore } from 'firebase-admin/firestore';
import { getFirebaseAdminApp } from '@/firebase/admin';

// This is a simplified approach for the MVP. In a real-world scenario,
// you would have a more robust role-based access control system.
const ADMIN_EMAIL = "admin@primeforg.gg";


export async function submitRegistrationForm(
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
  
  // Simplified admin check for MVP
  if (validatedFields.data.email === ADMIN_EMAIL) {
    return { 
      message: "Admin user detected. No team registered.",
      success: true, // Return success to not show an error on the form
    };
  }

  try {
    const adminApp = getFirebaseAdminApp();
    const db = getFirestore(adminApp);
    
    await db.collection("teams").add({
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
      message: "An unexpected error occurred on the server. Please try again later.",
      success: false
    };
  }
}
