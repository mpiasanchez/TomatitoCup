import type {
  AuthError,
  Session,
  SupabaseClient,
  User,
} from "@supabase/supabase-js";
import { RESET_PASSWORD_PATH } from "./routes";
import { supabase } from "./supabase";

const MIN_PASSWORD_LENGTH = 8;

export type AuthResult = {
  session: Session | null;
  user: User | null;
  error: AuthError | null;
};

function requireSupabase(client: SupabaseClient | null = supabase): SupabaseClient {
  if (!client) {
    throw new Error("Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.");
  }

  return client;
}

export function normalizeAuthEmail(email: string): string {
  return email.trim().toLowerCase();
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizeAuthEmail(email));
}

export function validatePassword(password: string): boolean {
  return password.length >= MIN_PASSWORD_LENGTH;
}

export function getResetPasswordRedirectUrl(origin: string = window.location.origin): string {
  return new URL(RESET_PASSWORD_PATH, origin).toString();
}

export async function getCurrentSession(
  client: SupabaseClient | null = supabase,
): Promise<AuthResult> {
  const currentClient = requireSupabase(client);
  const { data, error } = await currentClient.auth.getSession();

  return {
    session: data.session,
    user: data.session?.user ?? null,
    error,
  };
}

export async function signUpWithPassword(
  email: string,
  password: string,
  client: SupabaseClient | null = supabase,
): Promise<AuthResult> {
  const currentClient = requireSupabase(client);

  const { data, error } = await currentClient.auth.signUp({
    email: normalizeAuthEmail(email),
    password,
    options: {
      emailRedirectTo: window.location.origin,
    },
  });

  return {
    session: data.session,
    user: data.user,
    error,
  };
}

export async function signInWithPassword(
  email: string,
  password: string,
  client: SupabaseClient | null = supabase,
): Promise<AuthResult> {
  const currentClient = requireSupabase(client);

  const { data, error } = await currentClient.auth.signInWithPassword({
    email: normalizeAuthEmail(email),
    password,
  });

  return {
    session: data.session,
    user: data.user,
    error,
  };
}

export async function sendPasswordReset(
  email: string,
  client: SupabaseClient | null = supabase,
): Promise<AuthError | null> {
  const currentClient = requireSupabase(client);
  const { error } = await currentClient.auth.resetPasswordForEmail(
    normalizeAuthEmail(email),
    {
      redirectTo: getResetPasswordRedirectUrl(),
    },
  );

  return error;
}

export async function updatePassword(
  password: string,
  client: SupabaseClient | null = supabase,
): Promise<AuthError | null> {
  const currentClient = requireSupabase(client);
  const { error } = await currentClient.auth.updateUser({ password });

  return error;
}

export async function signOut(
  client: SupabaseClient | null = supabase,
): Promise<AuthError | null> {
  const currentClient = requireSupabase(client);
  const { error } = await currentClient.auth.signOut();
  return error;
}
