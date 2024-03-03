"use server";

import { revalidatePath } from "next/cache";
import db from "../../../db";
import { and, asc, eq } from "drizzle-orm";
import { TFormFieldInsert, formFields } from "../../../db/schema";

export const fetchFields = async (pageId: number) => {};

export const deleteField = async (id: number) => {
  try {
    await db.delete(formFields).where(eq(formFields.id, id));
    revalidatePath(`/form`);
  } catch (e) {
    console.error(e);
    throw new Error("Could not delete field");
  }
};

export const addField = async (config: TFormFieldInsert) => {
  try {
    const newField = await db.insert(formFields).values(config).returning();
    console.log(newField);
    revalidatePath(`/form`);
  } catch (e) {
    console.error(e);
    throw new Error("Could not create new field, please try again");
  }
};
