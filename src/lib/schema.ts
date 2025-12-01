import { z } from "zod";

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

export const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long." }),
});

export type LoginFormState = {
  errors?: {
    email?: string[];
    password?: string[];
    firebase?: string[];
  };
  message: string;
  success: boolean;
};

export const sponsorTiers = ["Титульный партнер", "Генеральный партнер", "Ведущий партнер", "Партнер"] as const;

export const sponsorSchema = z.object({
  imageUrl: z.string().url({ message: "Требуется действительный URL-адрес для логотипа." }),
  tier: z.enum(sponsorTiers, { required_error: "Необходимо выбрать тип партнерства." }),
});

export type SponsorFormState = {
  errors?: z.ZodIssue[];
  message: string;
  success: boolean;
};

export type SponsorPayload = z.infer<typeof sponsorSchema>;