import type { Config } from "drizzle-kit";

import "dotenv/config";

if (!("DATABASE_URL" in process.env))
  throw new Error("DATABASE_URL not found on .env");

export default {
  dbCredentials: {
    connectionString: process.env.DATABASE_URL
  },
  driver: "pg",
  out: "./app/db/migrations",
  schema: "./app/db/schema.server.ts",
  strict: true
} satisfies Config;
