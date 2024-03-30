import { Button } from "@/components/ui/button";
import { useSession } from "@/hooks/useSession";
import { BadgePlus } from "lucide-react";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { AddReceiptForm } from "@/app/[locale]/(protected)/market/_components/add-receipt-form";

export function UploadReceipt() {
  const { isPremium } = useSession();

  return (
    <div>
      {isPremium && (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button className='flex gap-2'>
              <BadgePlus className='w-4' />
              Ajouter un reçu
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className='min-w-[700px]'>
            <AlertDialogHeader className='m-auto'>
              <AlertDialogTitle className='text-2xl text-center p-3'>
                Ajouter un reçu à votre marché.
              </AlertDialogTitle>
              <p className='self-center w-[80%] text-sm text-muted'>
                Vous pouvez importer des reçus pour ajouter des ingrédients à
                votre marché. Cela vous permet de gagner du temps et de ne pas
                avoir à entrer manuellement chaque ingrédient.{" "}
                <span className='font-semibold italic'>
                  Le traitement de votre reçu peut prendre du temps. Il n'est
                  donc pas nécéssaire de rester sur cette page.
                </span>
              </p>
            </AlertDialogHeader>
            <AddReceiptForm />
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
}
