"use server";

import { eq } from "drizzle-orm";
import { db, usersTable } from "../db/schema";
import { z } from "zod";
import {
  createSession,
  generateSessionToken,
  setSessionTokenCookie,
} from "../lib/session";
import { redirect } from "next/navigation";
export const test = async (formData: FormData) => {};
const loginSchema = z.object({
  email: z.string({
    invalid_type_error: "Email no válido.",
  }),
  password: z.string({
    invalid_type_error: "Contraseña no válida.",
  }),
});

export type LoginActionState =
  | {
      success: true;
    }
  | {
      success: false;
      message: string;
      errors: Record<string, string[]>;
    };

export const loginAction = async (
  prevState: LoginActionState,
  formData: FormData
): Promise<LoginActionState> => {
  const rawData = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const validatedFields = loginSchema.safeParse(rawData);
  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors, rawData);
    return {
      success: false,
      message: "Error de validación",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const users = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, validatedFields.data.email))
    .limit(1);

  const user = users.at(0);

  if (!user) {
    return {
      success: false,
      message: "Error de validación",
      errors: { email: ["Credenciales Invalidas"] },
    };
  }

  const passwordMatches = user.password === "password";

  if (!passwordMatches) {
    return {
      success: false,
      message: "Error de validación",
      errors: { email: ["Credenciales Invalidas"] },
    };
  }

  const token = generateSessionToken();
  const session = await createSession(token, user.id);
  setSessionTokenCookie(token, session.expiresAt);

  redirect("/");

  return {
    success: true,
  };
};
