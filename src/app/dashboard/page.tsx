import { currentUser } from "@clerk/nextjs/server";
import db from "../../../db";
import { forms } from "../../../db/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import FormCard from "@/components/FormCard";
import NewFormButton from "@/components/NewFormButton";

export default async function Dashboard() {
  const user = await currentUser();
  if (!user) redirect("/");

  const formsResult = await db
    .select()
    .from(forms)
    .where(eq(forms.userId, user.id))
    .orderBy(forms.createdAt);

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Your Forms</h1>
        <NewFormButton userId={user.id} />
      </div>

      <div className="flex flex-col sm:flex-row sm:flex-wrap gap-6">
        {formsResult.map((form) => (
          <FormCard
            id={form.id}
            uuid={form.uuid || ""}
            name={form.name || ""}
            key={form.id}
          />
        ))}
      </div>
    </div>
  );
}
