import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

let client: ReturnType<typeof drizzle> | null = null;

export function isDbConfigured(): boolean {
  return Boolean(process.env.DATABASE_URL);
}

/**
 * Returns a configured Drizzle client, or null if DATABASE_URL is not set.
 * Callers must handle the null case so the app keeps working in environments
 * where the database hasn't been provisioned yet (Phase 1/2 previews).
 */
export function getDb() {
  if (!process.env.DATABASE_URL) return null;
  if (!client) {
    const sql = neon(process.env.DATABASE_URL);
    client = drizzle(sql, { schema });
  }
  return client;
}

export { schema };
