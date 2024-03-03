import { relations } from "drizzle-orm";
import {
  boolean,
  integer,
  pgTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { generatePublicId } from "../../utils";
import { users } from "./users";
import { pages } from "./pages";

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
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const formsRelations = relations(forms, ({ one, many }) => ({
  user: one(users, {
    fields: [forms.userId],
    references: [users.id],
  }),
  pages: many(pages),
}));

export type TForm = typeof forms.$inferSelect;
export type TFormInsert = typeof forms.$inferInsert;
export type TFormWithPages = typeof forms.$inferSelect & {
  pages: (typeof pages.$inferSelect)[];
};
