import {
  type User,
  type Session,
  db,
  sessionsTable,
  usersTable,
} from "@/db/schema";
import { sha256 } from "@oslojs/crypto/sha2";
import {
  encodeBase32LowerCaseNoPadding,
  encodeHexLowerCase,
} from "@oslojs/encoding";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";

export function generateSessionToken(): string {
  const bytes = new Uint8Array(20);
  crypto.getRandomValues(bytes);

  const token = encodeBase32LowerCaseNoPadding(bytes);
  return token;
}

function generateSessionId(token: string) {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
  return sessionId;
}

export async function createSession(
  token: string,
  userId: number
): Promise<Session> {
  const sessionId = generateSessionId(token);

  const session: Session = {
    id: sessionId,
    userId,
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30), // 30 days
  };
  await db.insert(sessionsTable).values(session);
  return session;
}

export async function validateSessionToken(
  token: string
): Promise<SessionValidationResult> {
  const sessionId = generateSessionId(token);

  const result = await db
    .select({ user: usersTable, session: sessionsTable })
    .from(sessionsTable)
    .innerJoin(usersTable, eq(sessionsTable.userId, usersTable.id))
    .where(eq(sessionsTable.id, sessionId));

  if (result.length < 1) {
    return { session: null, user: null };
  }

  const { user, session } = result[0];

  if (Date.now() >= session.expiresAt.getTime()) {
    await db.delete(sessionsTable).where(eq(sessionsTable.id, session.id));
    return { session: null, user: null };
  }

  if (Date.now() >= session.expiresAt.getTime() - 1000 * 60 * 60 * 24 * 15) {
    session.expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);
    await db
      .update(sessionsTable)
      .set({
        expiresAt: session.expiresAt,
      })
      .where(eq(sessionsTable.id, session.id));
  }

  return { session, user };
}

export async function invalidateSession(sessionId: string): Promise<void> {
  await db.delete(sessionsTable).where(eq(sessionsTable.id, sessionId));
  await deleteSessionTokenCookie();
}

export type SessionValidationResult =
  | { session: Session; user: User }
  | { session: null; user: null };

export async function setSessionTokenCookie(
  token: string,
  expiresAt: Date
): Promise<void> {
  const cookieStore = await cookies();

  cookieStore.set("session", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    expires: expiresAt,
    path: "/",
  });
}

export async function deleteSessionTokenCookie(): Promise<void> {
  const cookieStore = await cookies();

  cookieStore.set("session", "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 0,
    path: "/",
  });
}

export const getCurrentSession = cache(
  async (): Promise<SessionValidationResult> => {
    const cookieStore = await cookies();
    const token = cookieStore.get("session")?.value ?? null;

    if (token === null) {
      return { session: null, user: null };
    }
    const result = await validateSessionToken(token);
    return result;
  }
);

export async function getCurrentSessionOrRedirect(to: string = "/login") {
  const session = await getCurrentSession();

  if (session.session === null) {
    return redirect(to);
  }

  return session;
}
