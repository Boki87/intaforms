import Navbar from "@/components/Navbar";
import { PropsWithChildren } from "react";

export default function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <>
      <div className="h-screen w-full bg-gray-50">
        <Navbar />
        <main className="container pt-10">{children}</main>
      </div>
    </>
  );
}
