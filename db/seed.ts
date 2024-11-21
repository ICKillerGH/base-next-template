import { hash } from "@/lib/hashing";
import { db, usersTable } from "./schema";

(async () => {
  await db
    .insert(usersTable)
    .values({
      email: "admin@gmail.com",
      password: await hash("password"),
    })
    .execute();

  process.exit(0);
})();
