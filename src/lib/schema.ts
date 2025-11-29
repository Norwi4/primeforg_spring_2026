import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(1, { message: "Name is required." }),
  email: z.string().email({ message: "Invalid email address." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters long." }),
});

export type ContactFormState = {
  errors?: {
    name?: string[];
    email?: string[];
    message?: string[];
  };
  message: string;
  success: boolean;
};

export const registrationSchema = z.object({
  teamName: z.string().min(3, { message: "Название команды должно содержать не менее 3 символов." }),
  captainName: z.string().min(2, { message: "Имя капитана обязательно." }),
  email: z.string().email({ message: "Неверный формат email." }),
  game: z.enum(["dota2", "cs2"], { required_error: "Необходимо выбрать игру." }),
});

export type RegistrationFormState = {
  errors?: {
    teamName?: string[];
    captainName?: string[];
    email?: string[];
    game?: string[];
  };
  message: string;
  success: boolean;
};
