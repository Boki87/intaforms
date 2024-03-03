import { addField } from "@/app/actions/fields";
import TooltipWrapper from "@/components/TooltipWrapper";
import { Button } from "@/components/ui/button";
import useEditForm from "@/hooks/useEditForm";
import { FaPlus } from "react-icons/fa";

const PageContent: React.FC = () => {
  const { activePage: activePageId, pages } = useEditForm();
  const activePage = pages.find((page) => page.id === activePageId);

  const onAddFieldHandler = async () => {
    console.log({
      pageId: activePageId,
      type: "input",
      label: "Input Label",
      placeholder: "Input Placeholder",
    });
    await addField({
      pageId: activePageId,
      type: "input",
      label: "Input Label",
      placeholder: "Input Placeholder",
    });
  };

  return (
    <div className="w-full h-full p-10 relative">
      <div className="border border-gray-400 border-dashed rounded-lg w-full max-w-3xl mx-auto min-h-full bg-white">
        {activePage?.title}
        {JSON.stringify(activePage?.fields)}
      </div>
      <TooltipWrapper message="Add a new filed">
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
