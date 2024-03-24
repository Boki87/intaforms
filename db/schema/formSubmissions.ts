import { relations } from "drizzle-orm";
import {
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { generatePublicId } from "../../utils";
import { forms } from "./forms";

export const formSubmissions = pgTable("formSubtmissions", {
  id: serial("id").primaryKey(),
  uuid: varchar("uuid", { length: 256 })
    .notNull()
    .$defaultFn(() => generatePublicId()),
  formId: integer("form_id")
    .references(() => forms.id, { onDelete: "cascade" })
    .notNull(),
  values: text("values").default("{}"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const formSubtmissionsRelations = relations(
  formSubmissions,
  ({ one }) => ({
    forms: one(forms, {
      fields: [formSubmissions.formId],
      references: [forms.id],
    }),
  }),
);

export type TFormSubtmissions = typeof formSubmissions.$inferSelect;
export type TFormSubtmissionsInsert = typeof formSubmissions.$inferInsert;
export type TFormSubtmissionsWithForms = typeof formSubmissions.$inferSelect & {
  forms: typeof forms.$inferSelect;
};
