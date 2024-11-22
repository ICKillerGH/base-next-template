import { db, User, usersTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export interface UserDto {
  id: number;
  email: string;
  password: string;
}

function toDtoMapper(user: User): UserDto {
  return {
    id: user.id,
    email: user.email,
    password: user.password,
  };
}

export async function getUserByEmail(email: string): Promise<UserDto | null> {
  const users = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email))
    .limit(1);

  const user = users.at(0);

  return user ? toDtoMapper(user) : null;
}
