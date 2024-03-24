import { fetchFormByUuid } from "@/app/actions/forms";
import { notFound } from "next/navigation";
import SubtmiForm from "./_components/SubmitForm";

export default async function Page({ params }: { params: { formId: string } }) {
  // fetch form data for formId and render form for first page
  let form;
  try {
    form = await fetchFormByUuid(params.formId);
    console.log(form);
    if (form?.isInternal) {
      throw new Error("Form not found");
    }
    console.log(form);
  } catch (e) {
    console.error(e);
    return notFound();
  }

  const pages = form ? form.pages : [];

  return (
    <div>
      <SubtmiForm formName={form?.name || ""} pages={pages} />
    </div>
  );
}
