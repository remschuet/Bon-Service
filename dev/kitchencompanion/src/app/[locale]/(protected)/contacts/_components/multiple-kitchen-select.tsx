import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Kitchen } from "@prisma/client";
import { ChevronDown } from "lucide-react";

interface MultipleKitchenSelectProps {
  kitchens: Kitchen[];
  value: string[];
  onValueChange: (value: string[]) => void;
}
export function MultipleKitchenSelect({
  kitchens,
  value,
  onValueChange,
}: MultipleKitchenSelectProps) {
  function handleSelectedKitchen(kitchens: Kitchen) {
    const newValue = value.includes(kitchens.id)
      ? value.filter((value) => value !== kitchens.id)
      : [...value, kitchens.id];

    onValueChange(newValue);
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='outline'
          className='flex gap-2'>
          <p>Cuisines (si applicable)</p>
          <ChevronDown className='h-4 w-4 opacity-50' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {kitchens.map((kitchens) => {
          return (
            <DropdownMenuCheckboxItem
              key={kitchens.id}
              checked={value.includes(kitchens.id)}
              onCheckedChange={() => handleSelectedKitchen(kitchens)}
              onSelect={(e) => e.preventDefault()}
              className='w-[180px]'>
              {kitchens.name}
            </DropdownMenuCheckboxItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
