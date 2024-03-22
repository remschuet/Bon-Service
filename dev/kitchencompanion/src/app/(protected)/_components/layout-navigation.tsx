"use client";

import {
  LayoutDashboard,
  Menu,
  UsersRound,
  NotebookPen,
  Store,
  Phone,
} from "lucide-react";

import { useOpen } from "@/app/_hooks/useOpen";

export function LayoutNavigation() {
  const [isOpen, setOpen] = useOpen();

  return (
    <nav className='flex fixed top-0 left-0 flex-col min-w-[4rem] h-screen border-r-2'>
      <div
        className='flex items-center justify-center h-16 border-b-2'
        onClick={setOpen}>
        <Menu />
      </div>
      <div className='flex flex-col p-4 space-y-6 '>
        <a
          className='hover:text-teal-800'
          href='/kitchen'>
          <UsersRound />
        </a>
        <a
          className='hover:text-teal-800'
          href='/recipes'>
          <NotebookPen />
        </a>
        <a
          className='hover:text-teal-800'
          href='/market'>
          <Store />
        </a>
        <a
          className='hover:text-teal-800'
          href='/phonebook'>
          <Phone />
        </a>
      </div>
      <div className='flex items-center justify-center border-t-2 w-full'>
        <a
          className='mt-6 hover:text-teal-800'
          href='/dashboard'>
          <LayoutDashboard />
        </a>
      </div>
    </nav>
  );
}
