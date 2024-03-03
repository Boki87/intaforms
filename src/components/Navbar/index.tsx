"use client";

import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";
import { PropsWithChildren } from "react";

const Navbar: React.FC = () => {
  const pathname = usePathname();

  return (
    <nav className="w-full h-16 bg-white border-b border-gray-200">
      <div className="h-full container mx-auto flex items-center justify-between">
        <div className="flex gap-4 items-center h-full">
          <NavLink href="/" currPath={pathname}>
            Logo
          </NavLink>

          <NavLink href="/dashboard" currPath={pathname}>
            Dashboard
          </NavLink>
        </div>

        <div className="flex gap-4 items-center h-full">
          <Button>Get Pro</Button>
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

function NavLink({
  href,
  currPath,
  children,
}: PropsWithChildren<{
  href: string;
  currPath: string;
}>) {
  const isActive = href === currPath;

  const classNames = `h-full flex items-center block px-2 border-b-2 ${isActive ? "border-black" : "border-transparent"}`;

  return (
    <Link href={href} className={classNames}>
      {children}
    </Link>
  );
}
