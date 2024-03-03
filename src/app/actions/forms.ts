"use server";

import { revalidatePath } from "next/cache";
import db from "../../../db";
import { forms } from "../../../db/schema/forms";
import { eq } from "drizzle-orm";
import { pages } from "../../../db/schema/pages";

export const createForm = async (
  userId: string,
  formName?: string,
  isInternal?: boolean,
) => {
  try {
    const [newForm] = await db
      .insert(forms)
      .values({
        name: formName ? formName : "Your new form",
        userId,
        isInternal: isInternal || false,
      })
      .returning();

    await db
      .insert(pages)
      .values({ formId: newForm.id, title: "First page", userId });
    revalidatePath("/dashboard");
  } catch (e) {
    console.error(e);
    throw new Error("Could not create new form, please try again");
  }
};

export const deleteForm = async (id: number) => {
  try {
    await db.delete(forms).where(eq(forms.id, id));
    revalidatePath("/dashboard");
  } catch (e) {
    console.error(e);
    throw new Error("Could not delete form");
  }
};

export const renameForm = async (id: number, name: string) => {
  try {
    await db.update(forms).set({ name }).where(eq(forms.id, id));
    revalidatePath("/dashboard");
  } catch (e) {
    console.error(e);
    throw new Error("Could not rename form");
  }
};

export const fetchFormByUuid = async (uuid: string) => {
  const form = await db.query.forms.findFirst({ where: eq(forms.uuid, uuid) });
  return form;
};
