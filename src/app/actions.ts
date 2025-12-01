
"use server";
import { z } from "zod";
import { registrationSchema, type RegistrationFormState, contactSchema, type ContactFormState } from "@/lib/schema";

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
    
    // This part of the function will no longer be reached by regular users,
    // as their form submission is handled on the client side.
    // This remains as a fallback/example.
    return { 
      message: `Команда "${validatedFields.data.teamName}" успешно зарегистрирована! Мы свяжемся с вами по email.`,
      success: true
    };
}


export async function submitContactForm(
  data: z.infer<typeof contactSchema>
): Promise<ContactFormState> {
  const validatedFields = contactSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Validation failed. Please check the form fields.",
      success: false,
    };
  }
  
  // Here you would typically send an email, save to a database, etc.
  // For this example, we'll just log it to the console.
  console.log("New contact form submission:", validatedFields.data);

  return { 
    message: `Thanks for your message, ${validatedFields.data.name}! We'll get back to you soon.`,
    success: true
  };
}
