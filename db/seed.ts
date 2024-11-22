import { hash } from "@/lib/hashing";
import { db, usersTable } from "./schema";

(async () => {
  await db.insert(usersTable).values({
    email: "admin@admin.com",
    password: await hash("password"),
  });

  process.exit(0);
})();
