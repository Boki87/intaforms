import { WebhookEvent } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { Webhook } from "svix";
import db from "../../../../db";
import { forms, pages, users } from "../../../../db/schema";
import { createForm } from "@/app/actions/forms";

const webhookSecret = process.env.CLERK_WEBHOOK_SECRET || ``;

async function validateRequest(request: Request) {
  const payloadString = await request.text();
  const headerPayload = headers();

  const svixHeaders = {
    "svix-id": headerPayload.get("svix-id")!,
    "svix-timestamp": headerPayload.get("svix-timestamp")!,
    "svix-signature": headerPayload.get("svix-signature")!,
  };
  const wh = new Webhook(webhookSecret);
  const payload = wh.verify(payloadString, svixHeaders) as WebhookEvent;
  return payload;
}

export async function POST(request: Request) {
  try {
    const result = await validateRequest(request);

    if (result.type === "user.created") {
      // insert new user with the id from clerk
      const [newUser] = await db
        .insert(users)
        .values({
          id: result.data.id,
          email: result.data.email_addresses[0]?.email_address,
        })
        .returning();

      await createForm(newUser.id, "Your first form");

      // // insert new starter form for the new user
      // const [newForm] = await db
      //   .insert(forms)
      //   .values({ name: "Your first form", userId: newUser.id })
      //   .returning();

      // // create new page for starter form
      // await db
      //   .insert(pages)
      //   .values({ title: "First page", formId: newForm.id });
    }

    return Response.json({ success: true });
  } catch (e) {
    return Response.error();
  }
}

export async function GET() {
  return Response.json({ message: "Hello there" });
}
