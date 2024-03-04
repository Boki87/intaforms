import { addField } from "@/app/actions/fields";
import NewFieldModal from "@/components/NewFieldModal";
import TooltipWrapper from "@/components/TooltipWrapper";
import { Button } from "@/components/ui/button";
import useEditForm from "@/hooks/useEditForm";
import useNewFieldModal from "@/hooks/useNewFieldModal";
import { FaPlus } from "react-icons/fa";
import FormField from "@/components/FormFields/FormField";

const PageContent: React.FC = () => {
  const newFieldModal = useNewFieldModal();
  const { activePage: activePageId, pages, setActiveField } = useEditForm();
  const activePage = pages.find((page) => page.id === activePageId);

  const onAddFieldHandler = async () => {
    // console.log(11111);
    // newFieldModal.onOpen();
    // console.log({
    //   pageId: activePageId,
    //   type: "input",
    //   label: "Input Label",
    //   placeholder: "Input Placeholder",
    // });
    await addField({
      pageId: activePageId,
      type: "input",
      label: "Input Label",
      placeholder: "Input Placeholder",
      description: "Description",
    });
  };

  return (
    <div className="w-full h-full p-10 relative">
      <div className="border border-gray-400 border-dashed rounded-lg w-full max-w-3xl mx-auto min-h-full bg-white p-10">
        {activePage?.fields?.map((field) => {
          const Field = FormField[field.type as keyof typeof FormField];
          return Field ? (
            <Field
              onClick={() => setActiveField(field.id)}
              key={field.id}
              mode="edit"
              {...field}
            />
          ) : null;
        })}
      </div>
      <TooltipWrapper message="Add a new field">
        <Button
          onClick={onAddFieldHandler}
          className="rounded-full absolute bottom-5 right-5 w-14 h-14"
          size="icon"
        >
          <FaPlus />
        </Button>
      </TooltipWrapper>
    </div>
  );
};

export default PageContent;
