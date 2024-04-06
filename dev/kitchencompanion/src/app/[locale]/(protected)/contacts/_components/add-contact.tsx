import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AddContactForm } from "@/app/[locale]/(protected)/contacts/_components/add-contact-form";
import { BadgePlus } from "lucide-react";

export function AddContact() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='flex gap-2'>
          <BadgePlus className='w-4' />
          Ajouter un contact
        </Button>
      </DialogTrigger>
      <DialogContent className='min-w-[700px]'>
        <DialogHeader className=' flex flex-col gap-2 m-auto'>
          <DialogTitle className='text-xl text-center p-3'>
            Ajouter un nouveau contact
          </DialogTitle>
          <p className='self-center w-[80%] text-sm text-muted'>
            Vous pouvez le lier avec l'une ou plusieurs de vos cuisines
            existante directement si vous le souhaitez.
          </p>
          <AddContactForm />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
