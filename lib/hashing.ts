import bycryt from "bcrypt";

export async function hash(plainText: string) {
  return await bycryt.hash(plainText, 10);
}

export async function check(plainText: string, hashedText: string) {
  return await bycryt.compare(plainText, hashedText);
}
