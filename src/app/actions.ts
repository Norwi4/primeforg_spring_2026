"use server";

import { z } from "zod";
import { registrationSchema, sponsorSchema, type RegistrationFormState, type SponsorFormState } from "@/lib/schema";
import { getFirestore } from 'firebase-admin/firestore';
import { getStorage } from 'firebase-admin/storage';
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

async function uploadImageToStorage(image: File): Promise<string> {
    const adminApp = getFirebaseAdminApp();
    const bucket = getStorage(adminApp).bucket();
    const filename = `sponsors/${Date.now()}_${image.name}`;
    const fileBuffer = Buffer.from(await image.arrayBuffer());

    const fileUpload = bucket.file(filename);

    await fileUpload.save(fileBuffer, {
        metadata: {
            contentType: image.type,
        },
    });

    return fileUpload.publicUrl();
}

export async function addSponsor(prevState: SponsorFormState, formData: FormData): Promise<SponsorFormState> {
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const image = formData.get('image') as File;

    const sponsorData = { name, description };
    const validatedFields = sponsorSchema.safeParse(sponsorData);

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.issues,
            message: "Validation failed.",
            success: false,
        };
    }
    
    if (!image || image.size === 0) {
        return {
            errors: [{ path: ['imageUrl'], message: 'Логотип обязателен.' }],
            message: "Validation failed.",
            success: false,
        };
    }

    try {
        const imageUrl = await uploadImageToStorage(image);
        
        const adminApp = getFirebaseAdminApp();
        const db = getFirestore(adminApp);
        await db.collection("sponsors").add({ ...validatedFields.data, imageUrl });

        revalidatePath('/');
        revalidatePath('/admin/sponsors');

        return { message: "Sponsor added successfully.", success: true };
    } catch (error) {
        console.error(error);
        return { message: "Failed to add sponsor.", success: false };
    }
}


export async function updateSponsor(prevState: SponsorFormState, formData: FormData): Promise<SponsorFormState> {
  const id = formData.get('id') as string;
  const name = formData.get('name') as string;
  const description = formData.get('description') as string;
  const image = formData.get('image') as File;
  const existingImageUrl = formData.get('existingImageUrl') as string;

  const sponsorData = { name, description };
  const validatedFields = sponsorSchema.safeParse(sponsorData);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.issues,
      message: "Validation failed.",
      success: false,
    };
  }
  
  let imageUrl = existingImageUrl;
  try {
    if (image && image.size > 0) {
      imageUrl = await uploadImageToStorage(image);
    }

    if (!imageUrl) {
       return {
            errors: [{ path: ['imageUrl'], message: 'Логотип обязателен.' }],
            message: "Validation failed.",
            success: false,
        };
    }

    const adminApp = getFirebaseAdminApp();
    const db = getFirestore(adminApp);
    await db.collection("sponsors").doc(id).update({ ...validatedFields.data, imageUrl });
    
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
