import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AddIngredientForm } from "@/app/[locale]/(protected)/market/_components/add-ingredient-form";
import { BadgePlus } from "lucide-react";

export function AddIngredient() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='flex gap-2'>
          <BadgePlus className='w-4' />
          Ajouter un ingrédient
        </Button>
      </DialogTrigger>
      <DialogContent className='min-w-[700px]'>
        <DialogHeader className='m-auto'>
          <DialogTitle className='text-2xl text-center p-3'>
            Ajouter un ingrédient à votre marché.
          </DialogTitle>
          <AddIngredientForm />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
