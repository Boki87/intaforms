"use client";

import { FaArrowLeft, FaEye, FaSave } from "react-icons/fa";
import Link from "next/link";
import { Separator } from "../ui/separator";
import useForm from "@/hooks/useForm";
import { TitleEdit } from "../TitleEdit";
import { renameForm } from "@/app/actions/forms";
import { useParams, usePathname } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "../ui/button";

const FormEditNav: React.FC = () => {
  const params = useParams();
  const formId = params.formId;
  const pathname = usePathname();
  const finalPath = pathname.split("/").pop();
  const formDataProvider = useForm();

  return (
    <nav className="w-full min-h-16 bg-white border-b border-gray-200 flex items-center">
      <div className="h-8 w-full px-4 sm:px-6 flex items-center justify-between">
        <div className="flex flex-1 items-center justify-start h-full gap-4">
          <button className="text-blue-600 group hover">
            <Link href="/dashboard">
              <div className="group-hover:-translate-x-1 transition-transform duration-300">
                <FaArrowLeft size={20} />
              </div>
            </Link>
          </button>
          <Separator orientation="vertical" />
          <TitleEdit
            title={formDataProvider?.form?.name || ""}
            onRename={async (name: string) => {
              if (!formDataProvider.form?.id) return;
              try {
                await renameForm(formDataProvider.form?.id, name);
                formDataProvider.setFormData({
                  ...formDataProvider.form,
                  name,
                });
              } catch (e) {
                console.error(e);
              }
            }}
          />
        </div>
        <div className="flex-1 flex justify-center">
          <Tabs defaultValue="edit" value={finalPath} className="w-[400px]">
            <TabsList>
              <TabsTrigger asChild value="edit">
                <Link href={`/form/${formId}/edit`}>Edit</Link>
              </TabsTrigger>
              <TabsTrigger asChild value="design">
                <Link href={`/form/${formId}/design`}>Design</Link>
              </TabsTrigger>
              <TabsTrigger asChild value="pdf">
                <Link href={`/form/${formId}/pdf`}>PDF</Link>
              </TabsTrigger>
              <TabsTrigger asChild value="share">
                <Link href={`/form/${formId}/share`}>Share</Link>
              </TabsTrigger>
              <TabsTrigger asChild value="submissions">
                <Link href={`/form/${formId}/submissions`}>Sumbissions</Link>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <div className="flex-1 flex justify-end">
          <Button className="gap-2">
            <FaSave size={20} />
            Save
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default FormEditNav;
