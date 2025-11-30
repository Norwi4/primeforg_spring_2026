"use server";

import { z } from "zod";
import { registrationSchema, sponsorSchema, type RegistrationFormState, type SponsorFormState } from "@/lib/schema";
import { getFirestore } from 'firebase-admin/firestore';
import { getFirebaseAdminApp } from '@/firebase/admin';
import { revalidatePath } from "next/cache";

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

export async function addSponsor(data: z.infer<typeof sponsorSchema>): Promise<SponsorFormState> {
  const validatedFields = sponsorSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Validation failed.",
      success: false,
    };
  }

  try {
    const adminApp = getFirebaseAdminApp();
    const db = getFirestore(adminApp);
    await db.collection("sponsors").add(validatedFields.data);

    revalidatePath('/'); // Revalidate the home page to show the new sponsor
    revalidatePath('/admin/sponsors'); // Revalidate the sponsors admin page

    return { message: "Sponsor added successfully.", success: true };
  } catch (error) {
    console.error(error);
    return { message: "Failed to add sponsor.", success: false };
  }
}

export async function updateSponsor(id: string, data: z.infer<typeof sponsorSchema>): Promise<SponsorFormState> {
  const validatedFields = sponsorSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Validation failed.",
      success: false,
    };
  }

  try {
    const adminApp = getFirebaseAdminApp();
    const db = getFirestore(adminApp);
    await db.collection("sponsors").doc(id).update(validatedFields.data);
    
    revalidatePath('/');
    revalidatePath('/admin/sponsors');

    return { message: "Sponsor updated successfully.", success: true };
  } catch (error) {
    console.error(error);
    return { message: "Failed to update sponsor.", success: false };
  }
}

export async function deleteSponsor(id: string): Promise<{ success: boolean, message: string }> {
  try {
    const adminApp = getFirebaseAdminApp();
    const db = getFirestore(adminApp);
    await db.collection("sponsors").doc(id).delete();

    revalidatePath('/');
    revalidatePath('/admin/sponsors');

    return { success: true, message: "Sponsor deleted." };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Failed to delete sponsor." };
  }
}