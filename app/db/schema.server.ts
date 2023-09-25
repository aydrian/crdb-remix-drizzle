import { relations, sql } from "drizzle-orm";
import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const lists = pgTable("lists", {
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  id: uuid("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  name: text("name"),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow()
});

export const listsRelations = relations(lists, ({ many }) => ({
  countDowns: many(countDowns)
}));

export const countDowns = pgTable("count_downs", {
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  date: timestamp("date", { withTimezone: true }).notNull(),
  id: uuid("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  listId: uuid("list_id").references(() => lists.id),
  name: text("name"),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow()
});

export const countDownsRelations = relations(countDowns, ({ one }) => ({
  list: one(lists, { fields: [countDowns.listId], references: [lists.id] })
}));
