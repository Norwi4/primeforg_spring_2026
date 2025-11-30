
'use client';
import { z } from "zod";
import { registrationSchema, type RegistrationFormState } from "@/lib/schema";
import { addDoc, collection, Firestore } from "firebase/firestore";
import { errorEmitter } from "@/firebase/error-emitter";
import { FirestorePermissionError } from "@/firebase/errors";

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

  const teamsCollection = collection(db, "teams");
  const registrationData = {
      ...validatedFields.data,
      registrationDate: new Date().toISOString(),
  };

  // Using .catch() for non-blocking error handling and emitting a contextual error.
  addDoc(teamsCollection, registrationData).catch(err => {
      errorEmitter.emit('permission-error', new FirestorePermissionError({
          path: teamsCollection.path,
          operation: 'create',
          requestResourceData: registrationData,
      }));
  });

  // Optimistically return success. The error will be handled globally.
  return { 
      message: `Команда "${validatedFields.data.teamName}" успешно зарегистрирована! Мы свяжемся с вами по email.`,
      success: true
  };
}
