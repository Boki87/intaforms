import { PropsWithChildren } from "react";
import { eq } from "drizzle-orm";
import db from "../../../../db";
import { forms } from "../../../../db/schema";
import { currentUser } from "@clerk/nextjs";
import { notFound, redirect } from "next/navigation";
import FormEditNav from "@/components/FormEditNav";
import FormDataProvider from "@/providers/FormDataProvider";

export default async function FormEditLayout({
  children,
  params,
}: PropsWithChildren<{ params: { formId: string } }>) {
  let user;
  try {
    user = await currentUser();
  } catch (e) {
    console.error(e);
    redirect("/");
  }
  if (!user) redirect("/");

  const formData = await db.query.forms.findFirst({
    where: eq(forms.uuid, params.formId),
  });

  if (!formData || formData.userId !== user.id) {
    notFound();
  }
  return (
    <div className="h-screen flex flex-col w-full bg-gray-49">
      <FormDataProvider formData={formData}>
        <FormEditNav />
        <main className="flex-grow overflow-hidden">{children}</main>
      </FormDataProvider>
    </div>
  );
}
