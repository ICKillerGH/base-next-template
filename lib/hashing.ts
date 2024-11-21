import bycryt from "bcrypt";

export function hash(plainText: string) {
  return bycryt.hash(plainText, 10);
}
