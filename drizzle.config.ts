import type { Config } from "drizzle-kit";

export default {
  out: "./app/db/migrations",
  schema: "./app/db/schema.server.ts"
} satisfies Config;
