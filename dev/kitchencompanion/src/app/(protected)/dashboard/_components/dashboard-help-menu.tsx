"use client";

import { BadgeHelp } from "lucide-react";
import { useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function DashboardHelpMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className='relative rounded-[100%] p-2 cursor-pointer hover:bg-stone-300/30'>
      <DropdownMenu
        open={open}
        onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <BadgeHelp className='w-5 h-5' />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align='end'
          className='min-w-[200px] p-1'>
          <DropdownMenuLabel>Aide</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              Tutoriel
              <DropdownMenuShortcut></DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              Documentation
              <DropdownMenuShortcut></DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className='font-semibold'>
              Support
              <DropdownMenuShortcut></DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
