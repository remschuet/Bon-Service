import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { AddKitchenForm } from "@/app/[locale]/(protected)/kitchen/_components/add-kitchen-form";
import { BadgePlus } from "lucide-react";

export function AddKitchen() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className='flex gap-2'>
          <BadgePlus className='w-4' />
          Ajouter une cuisine
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className='min-w-[300px]'>
        <AlertDialogHeader className=' flex flex-col gap-2 m-auto'>
          <AlertDialogTitle className='text-2xl text-center p-3'>
            Ajouter une nouvelle cuisine
          </AlertDialogTitle>
          <AddKitchenForm />
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
}
