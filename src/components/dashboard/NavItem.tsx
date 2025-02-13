import { TNavItemProps } from "@/types/props.type";
import Link from "next/link";
import React from "react";

const NavItem = ({ href, icon: Icon, label }: TNavItemProps) => {
  return (
    <Link
      href={href}
      className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-200 cursor-pointer w-full text-left"
    >
      <Icon className="h-5 w-5" />
      <span className="md:block hidden font-medium">{label}</span>
    </Link>
  );
};

export default NavItem;
