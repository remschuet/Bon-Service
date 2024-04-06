import { Button } from "@/components/ui/button";
import { BadgePlus } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { AddReceiptForm } from "@/app/[locale]/(protected)/market/_components/add-receipt-form";

export function UploadReceipt() {
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className='flex gap-2'>
            <BadgePlus className='w-4' />
            Ajouter un reçu
          </Button>
        </DialogTrigger>
        <DialogContent className='min-w-[700px]'>
          <DialogHeader className='m-auto'>
            <DialogTitle className='text-2xl text-center p-3'>
              Ajouter un reçu à votre marché.
            </DialogTitle>
            <p className='self-center w-[80%] text-sm text-muted pb-4'>
              Vous pouvez importer des reçus pour ajouter des ingrédients à
              votre marché. Cela vous permet de gagner du temps et de ne pas
              avoir à entrer manuellement chaque ingrédient.{" "}
              <span className='font-semibold italic'>
                Le traitement de votre reçu peut prendre du temps. Il n'est donc
                pas nécéssaire de rester sur cette page.
              </span>
            </p>
          </DialogHeader>
          <AddReceiptForm />
        </DialogContent>
      </Dialog>
    </div>
  );
}
