import { supabase } from "./client";

/**
 * Thin wrapper around Supabase Edge Function invocation to satisfy Global Rule 1.
 * All service-layer calls should import this helper.
 *
 * Usage:
 *   const profile = await callFn<Profile>("profile_get");
 */
export async function callFn<T = unknown>(
  name: string,
  payload?: unknown,
): Promise<T> {
  const { data, error } = await supabase.functions.invoke<T>(name, {
    body: payload ?? {},
  });

  if (error) {
    // Surface Supabase function errors early.
    throw new Error(`Supabase function '${name}' failed: ${error.message}`);
  }
  return data as T;
}
