import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string({
      invalid_type_error: "Email invalido.",
    })
    .trim()
    .email({ message: "Email invalido." }),
  password: z
    .string({
      invalid_type_error: "Contraseña invalida.",
    })
    .trim()
    .min(1, { message: "Contraseña invalida." }),
});

export type LoginSchema = z.infer<typeof loginSchema>;
