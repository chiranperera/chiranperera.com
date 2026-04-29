/**
 * Cloudflare Turnstile server-side verification.
 *
 * Phase 3 ships verification logic; we'll add the visual widget to forms
 * once the user provides their Turnstile site keys. Until then, the
 * verifier passes when no secret is configured (so previews still work).
 */
const VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

export function isTurnstileConfigured(): boolean {
  return Boolean(process.env.TURNSTILE_SECRET_KEY);
}

export async function verifyTurnstile(token: string | null | undefined, ip?: string | null): Promise<{ ok: true } | { ok: false; reason: string }> {
  if (!process.env.TURNSTILE_SECRET_KEY) return { ok: true };
  if (!token) return { ok: false, reason: "Missing Turnstile token" };

  const body = new URLSearchParams();
  body.set("secret", process.env.TURNSTILE_SECRET_KEY);
  body.set("response", token);
  if (ip) body.set("remoteip", ip);

  try {
    const res = await fetch(VERIFY_URL, { method: "POST", body });
    const json = (await res.json()) as { success?: boolean; "error-codes"?: string[] };
    if (json.success) return { ok: true };
    return {
      ok: false,
      reason: (json["error-codes"] || []).join(",") || "Turnstile rejected",
    };
  } catch (err) {
    console.error("[turnstile] verification error", err);
    return { ok: false, reason: "Turnstile check failed" };
  }
}
