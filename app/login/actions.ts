"use server";

import { eq } from "drizzle-orm";
import { db, usersTable } from "../db/schema";
import {
  createSession,
  generateSessionToken,
  setSessionTokenCookie,
} from "../lib/session";
import { redirect } from "next/navigation";
import { LoginSchema, loginSchema } from "./validation";

export type LoginActionState = { fields: Partial<LoginSchema> } & (
  | {
      state: "initial";
    }
  | {
      state: "validation-error";
      errors: Record<string, string[]>;
    }
  | {
      state: "unkown-error";
      message: string;
    }
);

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
    const fields = Object.entries(rawData).reduce(
      (final, [key, value]) =>
        Object.assign(final, { [key]: value?.toString() }),
      {}
    );

    return {
      state: "validation-error",
      errors: validatedFields.error.flatten().fieldErrors,
      fields,
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
      state: "validation-error",
      errors: { email: ["Credenciales Invalidas"] },
      fields: validatedFields.data,
    };
  }

  const passwordMatches = user.password === "password";

  if (!passwordMatches) {
    return {
      state: "validation-error",
      errors: { email: ["Credenciales Invalidas"] },
      fields: validatedFields.data,
    };
  }

  const token = generateSessionToken();
  const session = await createSession(token, user.id);
  setSessionTokenCookie(token, session.expiresAt);

  redirect("/");
};
