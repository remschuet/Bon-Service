import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { AddIngredientsForm } from "@/app/[locale]/(protected)/market/_components/add-ingredients-form";
import { BadgePlus } from "lucide-react";

export function AddIngredient() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className='flex gap-2'>
          <BadgePlus className='w-4' />
          Ajouter un ingrédient
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className='min-w-[700px]'>
        <AlertDialogHeader className='m-auto'>
          <AlertDialogTitle className='text-2xl text-center p-3'>
            Ajouter un ingrédient à votre marché.
          </AlertDialogTitle>
          <AddIngredientsForm />
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
}
