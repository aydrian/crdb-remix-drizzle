import { sql } from "drizzle-orm";
import { text, timestamp, pgTable, uuid } from "drizzle-orm/pg-core";

export const user = pgTable("users", {
  id: uuid("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  name: text("name"),
  email: text("email").notNull(),
  password: text("password").notNull(),
  role: text("role").$type<"admin" | "customer">(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow()
});
