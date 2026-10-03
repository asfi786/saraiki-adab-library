/** Admin session helpers (client-side only). */

const FLAG_KEY = "sal_admin";
const PW_KEY = "sal_admin_pw";

export function isAdminAuthed(): boolean {
  try {
    return sessionStorage.getItem(FLAG_KEY) === "1";
  } catch {
    return false;
  }
}

/** The admin password entered at login (also public via NEXT_PUBLIC_*). */
export function adminPassword(): string {
  try {
    return sessionStorage.getItem(PW_KEY) ?? "";
  } catch {
    return "";
  }
}

export function adminFetch(input: string, init: RequestInit = {}): Promise<Response> {
  const headers = new Headers(init.headers);
  headers.set("x-admin-password", adminPassword());
  return fetch(input, { ...init, headers });
}
