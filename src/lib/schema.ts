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
