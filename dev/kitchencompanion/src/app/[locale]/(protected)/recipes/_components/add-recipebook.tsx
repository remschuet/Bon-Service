"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AddRecipeBookForm } from "@/app/[locale]/(protected)/recipes/_components/add-recipebook-form";
import { BadgePlus } from "lucide-react";

export function AddRecipeBook() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='flex gap-2'>
          <BadgePlus className='w-4' />
          Ajouter un livre de recettes
        </Button>
      </DialogTrigger>
      <DialogContent className='min-w-[300px]'>
        <DialogHeader className=' flex flex-col gap-2 m-auto'>
          <DialogTitle className='text-2xl text-center p-3'>
            Ajouter un livre de recettes
          </DialogTitle>
          <AddRecipeBookForm />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
