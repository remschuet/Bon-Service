import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AddKitchenForm } from "@/app/[locale]/(protected)/kitchen/_components/add-kitchen-form";
import { BadgePlus } from "lucide-react";
import { useKitchens } from "@/hooks/useKitchens";

export function AddKitchen() {
  const { refetch } = useKitchens();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='flex gap-2'>
          <BadgePlus className='w-4' />
          Ajouter une cuisine
        </Button>
      </DialogTrigger>
      <DialogContent className='min-w-[300px]'>
        <DialogHeader className=' flex flex-col gap-2 m-auto'>
          <DialogTitle className='text-2xl text-center p-3'>
            Ajouter une nouvelle cuisine
          </DialogTitle>
          <AddKitchenForm />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
