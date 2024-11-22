import { check } from "@/lib/hashing";
import { getUserByEmail } from "@/src/users/data-access";

export class UserNotFound extends Error {}
export class PasswordDoesntMatch extends Error {}

export async function login(params: { email: string; password: string }) {
  const user = await getUserByEmail(params.email);

  if (!user) {
    return new UserNotFound();
  }

  const passwordMatches = await check(params.password, user.password);

  if (!passwordMatches) {
    return new PasswordDoesntMatch();
  }

  return user;
}
