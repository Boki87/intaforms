import { relations } from "drizzle-orm";
import {
  boolean,
  integer,
  pgTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { TPage, pages } from "./pages";

export const formFields = pgTable("form_fields", {
  id: serial("id").primaryKey(),
  label: varchar("name", { length: 256 }).notNull(),
  placeholder: varchar("placeholder", { length: 256 }),
  description: varchar("description", { length: 256 }),
  type: varchar("type", { length: 256 }).notNull(),
  isRequired: boolean("is_required").default(false).notNull(),
  orderIndex: integer("order_index").default(0).notNull(),
  pageId: integer("page_id")
    .references(() => pages.id, {
      onDelete: "cascade",
    })
    .notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const formFieldsRelations = relations(formFields, ({ one }) => ({
  page: one(pages, {
    fields: [formFields.pageId],
    references: [pages.id],
  }),
}));

export type TFormField = typeof formFields.$inferSelect;
export type TFormFieldInsert = typeof formFields.$inferInsert;
export type TFormFieldWithPage = TFormField & {
  page: TPage;
};
