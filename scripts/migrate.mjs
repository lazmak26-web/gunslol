// Creates/updates the database tables before the app starts.
//
// The original ./drizzle migration chain can't run on a fresh database
// (it converts text ids to "serial", which Postgres rejects), so the schema
// is built from a single migration generated from lib/schema.ts (./db/init).
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { migrate } from "drizzle-orm/neon-http/migrator";

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("[migrate] DATABASE_URL is not set");
  process.exit(1);
}

const sql = neon(url.replace(/[?&]channel_binding=require/, ""));

const TABLES = [
  "aliases", "badges", "links", "page_views", "premium_subscriptions",
  "profile_feedback", "profile_widgets", "profiles", "social_links",
  "template_favorites", "template_uses", "templates", "user_badges", "users",
];

// Clean up a half-applied run of the old migration chain (users.id is text
// there). Only done while the users table is still empty, so no data is lost.
const [idCol] = await sql`
  SELECT data_type FROM information_schema.columns
  WHERE table_schema = 'public' AND table_name = 'users' AND column_name = 'id'`;
if (idCol && idCol.data_type === "text") {
  const [{ n }] = await sql.query(`SELECT count(*)::int AS n FROM users`);
  if (n > 0) {
    console.error("[migrate] legacy users table has rows, refusing to reset it");
    process.exit(1);
  }
  console.log("[migrate] removing half-created legacy tables");
  await sql.query(`DROP TABLE IF EXISTS ${TABLES.map((t) => `"${t}"`).join(", ")} CASCADE`);
  await sql.query(`DROP TABLE IF EXISTS drizzle.__drizzle_migrations`);
}

await migrate(drizzle(sql), {
  migrationsFolder: "./db/init",
  migrationsTable: "__init_migrations",
});
console.log("[migrate] schema ready");

// Extra index from the old chain, and the default badges (both idempotent).
await sql.query(
  `CREATE INDEX IF NOT EXISTS page_views_user_ip_created_idx ON page_views (user_id, ip, created_at)`
);
const badges = [
  ["Premium", "fa-gem", "#fbbf24"],
  ["Owner", "fa-crown", "#ef4444"],
  ["Developer", "fa-code", "#a855f7"],
  ["Staff", "fa-shield", "#3b82f6"],
  ["Verified", "fa-circle-check", "#22d3ee"],
  ["Early Supporter", "fa-star", "#f97316"],
  ["Contributor", "fa-heart", "#ec4899"],
  ["Special", "fa-wand-magic-sparkles", "#a3e635"],
];
for (const [name, icon, color] of badges) {
  await sql.query(
    `INSERT INTO badges (id, name, icon_prefix, icon_name, color)
     SELECT gen_random_uuid()::text, $1, 'solid', $2, $3
     WHERE NOT EXISTS (SELECT 1 FROM badges WHERE name = $1)`,
    [name, icon, color]
  );
}
console.log("[migrate] default badges ready");
