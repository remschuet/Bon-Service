"use client";

import {
  LayoutDashboard,
  Menu,
  UsersRound,
  NotebookPen,
  Store,
  Phone,
} from "lucide-react";

import { useNavigation } from "@/app/_providers/navigation-provider";

export function Nagivation() {
  const { isOpen, setIsOpen } = useNavigation();

  const toggleOpen = () => setIsOpen(!isOpen);

  const baseStyle = `${
    isOpen ? "flex gap-5 items-center" : ""
  } p-2 hover:bg-stone-300/30 rounded-md`;

  // Updated scaleText class to ensure transitions are smooth
  const scaleText = `origin-left transition-opacity duration-1000 opacity-0 ${
    isOpen ? "opacity-100" : "absolute"
  } transition-all duration-1000 ease ${isOpen ? "scale-x-100" : "scale-x-0"}`;

  return (
    <nav
      className={`flex fixed top-0 left-0 flex-col ${
        isOpen ? "min-w-[12rem]" : "min-w-[4rem]"
      } h-screen border-r-2 transition-all`}>
      <div
        className={`flex items-center px-5 h-16 border-b-2 w-full cursor-pointer`}
        onClick={toggleOpen}>
        <Menu />
      </div>
      <div className='flex flex-col px-3 py-4 space-y-2'>
        <a
          className={baseStyle}
          href='/kitchen'>
          <UsersRound />
          <span className={`${scaleText} whitespace-nowrap`}>Cuisines</span>
        </a>
        <a
          className={baseStyle}
          href='/recipes'>
          <NotebookPen />
          <span className={`${scaleText} whitespace-nowrap`}>Recettes</span>
        </a>
        <a
          className={baseStyle}
          href='/market'>
          <Store />
          <span className={`${scaleText} whitespace-nowrap`}>Marché</span>
        </a>
        <a
          className={baseStyle}
          href='/phonebook'>
          <Phone />
          <span className={`${scaleText} whitespace-nowrap`}>Contacts</span>
        </a>
      </div>
      <div className='flex flex-col border-t-2 px-3 py-4 space-y-2'>
        <a
          className={baseStyle}
          href='/dashboard'>
          <LayoutDashboard />
          <span className={`${scaleText} whitespace-nowrap`}>Portail</span>
        </a>
      </div>
    </nav>
  );
}
