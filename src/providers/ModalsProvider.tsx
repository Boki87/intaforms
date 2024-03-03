import NewFieldModal from "@/components/NewFieldModal";
import FormRenameModal from "@/components/modals/FormRenameModal";
import NewFormModal from "@/components/modals/NewFormModal";

const ModalsProvider = () => {
  return (
    <>
      <FormRenameModal />
      <NewFormModal />
      <NewFieldModal />
    </>
  );
};

export default ModalsProvider;
