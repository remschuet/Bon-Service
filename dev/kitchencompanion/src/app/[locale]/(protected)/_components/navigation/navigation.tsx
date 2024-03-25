"use client";

import {
  LayoutDashboard,
  Menu,
  UsersRound,
  NotebookPen,
  Store,
  Phone,
  BookOpen,
} from "lucide-react";

import { useNavigation } from "@/hooks/useNavigation";
import Link from "next/link";

export function Nagivation() {
  const { isOpen, setIsOpen, isActive, setIsActive } = useNavigation();
  const toggleOpen = () => setIsOpen(!isOpen);

  const linkStyle = (path: string) =>
    `${isOpen && "flex gap-5 items-center"} p-2 rounded-md  ${
      path === isActive
        ? "bg-brand text-brand-foreground"
        : "hover:bg-brand-hover hover:text-brand-foreground"
    }`;

  const textTransition = `origin-left transition-opacity duration-1000 opacity-0 whitespace-nowrap ${
    isOpen ? "opacity-100" : "absolute"
  } transition-all duration-1000 ease ${isOpen ? "scale-x-100" : "scale-x-0"}`;

  const links = [
    { path: "/kitchen", icon: <UsersRound />, text: "Cuisines" },
    { path: "/menus", icon: <NotebookPen />, text: "Menus" },
    { path: "/recipes", icon: <BookOpen />, text: "Recettes" },
    { path: "/market", icon: <Store />, text: "Marché" },
    { path: "/contacts", icon: <Phone />, text: "Contacts" },
  ];

  return (
    <nav
      className={`flex fixed top-0 left-0 z-20 flex-col ${
        isOpen ? "min-w-[12rem]" : "min-w-[4rem]"
      } h-screen border-r-2 transition-all`}
    >
      <div
        className={`flex items-center px-5 h-16 border-b-2 w-full cursor-pointer`}
        onClick={toggleOpen}
      >
        <Menu />
      </div>
      <div className="flex flex-col px-3 py-4 space-y-2">
        {links.map(({ path, icon, text }) => (
          <Link
            key={path}
            className={linkStyle(path)}
            onClick={() => setIsActive(path)}
            href={path}
          >
            {icon}
            <span className={textTransition}>{text}</span>
          </Link>
        ))}
      </div>
      <div className="flex flex-col border-t-2 px-3 py-4 space-y-2">
        <Link
          className={linkStyle("/dashboard")}
          onClick={() => setIsActive("/dashboard")}
          href="/dashboard"
        >
          <LayoutDashboard />
          <span className={textTransition}>Portail</span>
        </Link>
      </div>
    </nav>
  );
}
