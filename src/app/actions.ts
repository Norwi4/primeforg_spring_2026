"use server";

import { z } from "zod";
import { contactSchema, type ContactFormState } from "@/lib/schema";


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
