import ClientOnly from "@/components/ClientOnly";
import Navbar from "@/components/Navbar";
import ModalsProvider from "@/providers/ModalsProvider";
import { PropsWithChildren } from "react";

export default function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <>
      <ClientOnly>
        <ModalsProvider />
      </ClientOnly>
      <div className="h-screen w-full bg-gray-50">
        <Navbar />
        <main className="container pt-10">{children}</main>
      </div>
    </>
  );
}
