
"use server";
import { z } from "zod";
import { registrationSchema, sponsorSchema, type RegistrationFormState, type SponsorFormState, type SponsorPayload } from "@/lib/schema";
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

async function uploadImageToStorage(base64: string, contentType: string, filename: string): Promise<string> {
    const adminApp = getFirebaseAdminApp();
    const bucket = getStorage(adminApp).bucket();
    const fileBuffer = Buffer.from(base64.split(',')[1], 'base64');
    
    const filePath = `sponsors/${Date.now()}_${filename}`;
    const fileUpload = bucket.file(filePath);

    await fileUpload.save(fileBuffer, {
        metadata: {
            contentType: contentType,
        },
    });

    // Make the file public to get a public URL
    await fileUpload.makePublic();

    return fileUpload.publicUrl();
}

export async function addSponsor(prevState: SponsorFormState, payload: SponsorPayload): Promise<SponsorFormState> {
    const { name, description, image } = payload;
    
    const validatedFields = sponsorSchema.safeParse({ name, description });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.issues,
            message: "Validation failed.",
            success: false,
        };
    }
    
    if (!image) {
        return {
            errors: [{ path: ['imageUrl'], message: 'Логотип обязателен.' }],
            message: "Validation failed.",
            success: false,
        };
    }

    try {
        const imageUrl = await uploadImageToStorage(image.base64, image.type, name);
        
        const adminApp = getFirebaseAdminApp();
        const db = getFirestore(adminApp);
        await db.collection("sponsors").add({ ...validatedFields.data, imageUrl });

        revalidatePath('/');
        revalidatePath('/admin/sponsors');

        return { message: "Sponsor added successfully.", success: true };
    } catch (error: any) {
        console.error("Error adding sponsor:", error);
        return { message: `Failed to add sponsor: ${error.message}`, success: false };
    }
}


export async function updateSponsor(prevState: SponsorFormState, payload: SponsorPayload): Promise<SponsorFormState> {
  const { id, name, description, image, existingImageUrl } = payload;

  const validatedFields = sponsorSchema.safeParse({ name, description });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.issues,
      message: "Validation failed.",
      success: false,
    };
  }
  
  let imageUrl = existingImageUrl;
  try {
    if (image) {
      imageUrl = await uploadImageToStorage(image.base64, image.type, name);
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
    if (!id) throw new Error("Sponsor ID is missing for update.");
    await db.collection("sponsors").doc(id).update({ ...validatedFields.data, imageUrl });
    
    revalidatePath('/');
    revalidatePath('/admin/sponsors');

    return { message: "Sponsor updated successfully.", success: true };
  } catch (error: any) {
    console.error("Error updating sponsor:", error);
    return { message: `Failed to update sponsor: ${error.message}`, success: false };
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
  } catch (error: any) {
    console.error("Error deleting sponsor:", error);
    return { success: false, message: `Failed to delete sponsor: ${error.message}` };
  }
}

    