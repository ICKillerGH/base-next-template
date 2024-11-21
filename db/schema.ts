import mysql from "mysql2/promise";
import { mysqlTable, int, varchar, datetime } from "drizzle-orm/mysql-core";
import { drizzle } from "drizzle-orm/mysql2";

import type { InferSelectModel } from "drizzle-orm";

const poolConnection = mysql.createPool({
  host: process.env.DB_HOST!,
  user: process.env.DB_USER!,
  password: process.env.DB_PASS!,
  database: process.env.DB_NAME!,
});

export const db = drizzle(poolConnection);

export const usersTable = mysqlTable("users", {
  id: int("id", { unsigned: true }).primaryKey().autoincrement(),
  email: varchar("email", { length: 100 }).notNull(),
  password: varchar("password", { length: 255 }).notNull(),
});

export const sessionsTable = mysqlTable("sessions", {
  id: varchar("id", {
    length: 255,
  }).primaryKey(),
  userId: int("user_id", { unsigned: true })
    .notNull()
    .references(() => usersTable.id),
  expiresAt: datetime("expires_at").notNull(),
});

export type User = InferSelectModel<typeof usersTable>;
export type Session = InferSelectModel<typeof sessionsTable>;
