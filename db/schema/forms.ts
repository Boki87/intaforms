import { relations } from "drizzle-orm";
import {
  boolean,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { generatePublicId } from "../../utils";
import { users } from "./users";
import { pages } from "./pages";
import { formSubmissions } from "./formSubmissions";

export const forms = pgTable("forms", {
  id: serial("id").primaryKey(),
  uuid: varchar("uuid", { length: 256 })
    .notNull()
    .$defaultFn(() => generatePublicId()),
  name: varchar("name", { length: 256 }).notNull(),
  userId: varchar("user_id", { length: 256 })
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  isInternal: boolean("is_internal").notNull().default(true),
  isPublished: boolean("is_published").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const formsRelations = relations(forms, ({ one, many }) => ({
  user: one(users, {
    fields: [forms.userId],
    references: [users.id],
  }),
  pages: many(pages),
  formSubmissions: many(formSubmissions),
}));

export type TForm = typeof forms.$inferSelect;
export type TFormInsert = typeof forms.$inferInsert;
export type TFormWithPages = typeof forms.$inferSelect & {
  pages: (typeof pages.$inferSelect)[];
};
export type TFormWithSubmissions = typeof forms.$inferSelect & {
  formSubmissions: (typeof pages.$inferSelect)[];
};
