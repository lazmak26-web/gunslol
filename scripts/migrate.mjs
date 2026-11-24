// Creates/updates the database tables before the app starts.
// 1) Runs the Drizzle migrations in ./drizzle (tracked, each runs once).
// 2) Runs neon-update.txt (every statement uses IF NOT EXISTS, safe to re-run).
import { readFileSync } from "node:fs";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { migrate } from "drizzle-orm/neon-http/migrator";

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("[migrate] DATABASE_URL is not set");
  process.exit(1);
}

const sql = neon(url.replace(/[?&]channel_binding=require/, ""));

await migrate(drizzle(sql), { migrationsFolder: "./drizzle" });
console.log("[migrate] drizzle migrations applied");

const extra = readFileSync(new URL("../neon-update.txt", import.meta.url), "utf8")
  .split(";")
  .map((s) => s.trim())
  .filter(Boolean);
for (const stmt of extra) {
  await sql.query(stmt);
}
console.log(`[migrate] neon-update.txt applied (${extra.length} statements)`);
