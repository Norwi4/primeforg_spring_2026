"use server";

import { z } from "zod";
import { contactSchema, registrationSchema, type ContactFormState, type RegistrationFormState } from "@/lib/schema";


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

  try {
    // In a real application, you would integrate with an email sending service here.
    // For example, using Resend, Nodemailer, or SendGrid.
    console.log("New contact form submission:", validatedFields.data);
    
    // Simulate network delay for demonstration purposes
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return { 
      message: "Thank you for your message! We'll get back to you shortly.",
      success: true
    };
  } catch (e) {
    console.error("Failed to process contact form:", e);
    return { 
      message: "An unexpected error occurred on the server. Please try again later.",
      success: false
    };
  }
}

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
