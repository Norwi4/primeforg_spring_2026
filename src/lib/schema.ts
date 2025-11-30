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

export const sponsorSchema = z.object({
  name: z.string().min(2, { message: "Название спонсора обязательно." }),
  description: z.string().min(10, { message: "Описание должно содержать не менее 10 символов." }),
  imageUrl: z.string().url({ message: "Неверный формат URL изображения." }),
});

export type SponsorFormState = {
  errors?: {
    name?: string[];
    description?: string[];
    imageUrl?: string[];
  };
  message: string;
  success: boolean;
};
