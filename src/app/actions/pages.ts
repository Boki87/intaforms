"use server";

import { revalidatePath } from "next/cache";
import db from "../../../db";
import { and, asc, eq } from "drizzle-orm";
import { TPageInsert, pages } from "../../../db/schema/pages";

export const fetchPages = async (userId: string, formId: number) => {
  try {
    const pagesData = await db.query.pages.findMany({
      where: and(eq(pages.userId, userId), eq(pages.formId, formId)),
      orderBy: [asc(pages.createdAt), asc(pages.orderIndex)],
    });
    return pagesData;
  } catch (e) {
    console.error(e);
    throw new Error("Could not fetch pages, please try again");
  }
};

export const addPage = async (userId: string, formId: number) => {
  try {
    await db
      .insert(pages)
      .values({ formId, title: "New page", userId })
      .returning();
    revalidatePath(`/form`);
  } catch (e) {
    console.error(e);
    throw new Error("Could not create new page, please try again");
  }
};

export const deletePage = async (id: number) => {
  try {
    await db.delete(pages).where(eq(pages.id, id));
    revalidatePath(`/form`);
  } catch (e) {
    console.error(e);
    throw new Error("Could not delete page");
  }
};

export const updatePage = async (
  id: number,
  props: Partial<TPageInsert>,
  revalidate?: boolean,
) => {
  try {
    await db.update(pages).set(props).where(eq(pages.id, id));
    revalidate && revalidatePath(`/form`);
  } catch (e) {
    console.error(e);
    throw new Error("Could not update page");
  }
};
