import { SignJWT, jwtVerify } from "jose";

const SESSION_SECRET = new TextEncoder().encode(
  process.env.SESSION_SECRET || "edc-buet-super-secret-jwt-key-2026-production"
);

export const COOKIE_NAME = "edc_admin_session";

export async function signAdminSession(): Promise<string> {
  return await new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(SESSION_SECRET);
}

export async function verifyAdminSession(token?: string | null): Promise<boolean> {
  if (!token) return false;
  try {
    const { payload } = await jwtVerify(token, SESSION_SECRET);
    return payload.role === "admin";
  } catch {
    return false;
  }
}

export function validateAdminPassword(password: string): boolean {
  const masterPassword = process.env.ADMIN_PASSWORD || "EdC@admin@2026";
  return password === masterPassword;
}
