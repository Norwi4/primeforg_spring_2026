"use server";

import { z } from "zod";
import { registrationSchema, type RegistrationFormState } from "@/lib/schema";


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

  try {
    // In a real application, you would save this to a database.
    console.log("New team registration:", validatedFields.data);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return { 
      message: `Команда "${validatedFields.data.teamName}" успешно зарегистрирована! Мы свяжемся с вами по email.`,
      success: true
    };
  } catch (e) {
    console.error("Failed to process registration form:", e);
    return { 
      message: "An unexpected error occurred on the server. Please try again later.",
      success: false
    };
  }
}
