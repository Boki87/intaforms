import { relations } from "drizzle-orm";
import {
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { forms } from "./forms";

export const pages = pgTable("pages", {
  id: serial("id").primaryKey(),
  orderIndex: integer("order_index").default(0).notNull(),
  title: varchar("title", { length: 256 }),
  userId: varchar("user_id", { length: 256 }).notNull(),
  formId: integer("form_id")
    .references(() => forms.id, {
      onDelete: "cascade",
    })
    .notNull(),
  fields: text("fields").default("[]"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const pagesRelations = relations(pages, ({ one }) => ({
  form: one(forms, {
    fields: [pages.formId],
    references: [forms.id],
  }),
}));

export type TPage = typeof pages.$inferSelect;
export type TPageInsert = typeof pages.$inferInsert;
export type TPageWithForm = typeof pages.$inferSelect & {
  form: typeof forms.$inferSelect;
};
