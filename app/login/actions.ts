"use server";

import { regenerateSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { LoginSchema, loginSchema } from "./validation";
import { revalidatePath } from "next/cache";
import { login, PasswordDoesntMatch, UserNotFound } from "@/src/auth/use-cases";

export type LoginActionState = { fields: Partial<LoginSchema> } & (
  | {
      status: "initial";
    }
  | {
      status: "validation-error";
      errors: Record<string, string[]>;
    }
);

export const loginAction = async (
  _: LoginActionState,
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
      status: "validation-error",
      errors: validatedFields.error.flatten().fieldErrors,
      fields,
    };
  }

  const user = await login(validatedFields.data);

  if (user instanceof UserNotFound || user instanceof PasswordDoesntMatch) {
    return {
      status: "validation-error",
      errors: { email: ["Credenciales Invalidas"] },
      fields: validatedFields.data,
    };
  }

  regenerateSession(user.id);

  revalidatePath("/");
  redirect("/");
};
