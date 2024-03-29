"use client";

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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, Settings, Receipt } from "lucide-react";

import { useSession } from "@/hooks/useSession";
import logout from "@/app/[locale]/(protected)/_actions/logout";

export function UserMenu() {
  const { name, email } = useSession();
  const [open, setOpen] = useState(false);

  return (
    <div className='flex flex-col items-start justify-between px-4 py-3 sm:flex-row sm:items-center'>
      <DropdownMenu
        open={open}
        onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Avatar className='cursor-pointer'>
            <AvatarImage
              src={undefined}
              alt={name}
            />
            <AvatarFallback className='bg-brand text-stone-900 font-black'>
              {name[0]}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align='end'
          className='min-w-[200px] p-1'>
          <DropdownMenuLabel>{name}</DropdownMenuLabel>
          <DropdownMenuLabel className='text-xs font-normal mt-[-10px]'>
            {email}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              Paramètres
              <DropdownMenuShortcut>
                <Settings className='w-4 h-4' />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              Facturation
              <DropdownMenuShortcut>
                <Receipt className='w-4 h-4' />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className='font-semibold'>
              Bon Service Pro
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={async () => await logout()}
              className='text-destructive'>
              Déconnexion
              <DropdownMenuShortcut>
                <LogOut className='w-4 h-4' />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
