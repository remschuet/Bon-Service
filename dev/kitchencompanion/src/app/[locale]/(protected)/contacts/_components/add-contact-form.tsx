"use client";

import { AlertDialogCancel } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useSession } from "@/hooks/useSession";
import { addContact } from "@/app/[locale]/(protected)/contacts/_action/contact-action";
import { Contact } from "@prisma/client";
import { useState, useTransition } from "react";
import { PulseLoader } from "react-spinners";
import { ContactSchema } from "@/lib/validation";
import { useKitchens } from "@/hooks/useKitchens";
import { MultipleKitchenSelect } from "@/app/[locale]/(protected)/contacts/_components/multiple-kitchen-select";

export function AddContactForm() {
  const { id } = useSession();
  const { kitchens } = useKitchens();
  const [selectedKitchenId, setSelectedKitchenId] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();

  function handleAddContact(formData: FormData) {
    const contact = {
      userId: id,
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      compteNumber: formData.get("compteNumber") as string,
      phoneNumber: formData.get("phoneNumber") as string,
    };

    const validatedContact = ContactSchema.safeParse(contact);

    if (!validatedContact.success) {
      return { error: "Les données saisies sont invalides.", status: 400 };
    }

    startTransition(() => {
      addContact(contact as Contact, selectedKitchenId);
    });
  }

  return (
    <div className='grid place-content-center w-[600px]'>
      <form
        action={handleAddContact}
        className='flex flex-col space-y-7'>
        <div className='flex gap-2 flex-wrap w-full'>
          <div className='flex gap-2 w-full'>
            <Input
              type='text'
              name='name'
              placeholder='Jean Tremblay'
            />
            <Input
              type='text'
              name='phoneNumber'
              placeholder='(514) 123-4567'
            />
          </div>
          <div className='flex gap-2 w-full'>
            <Input
              type='text'
              name='compteNumber'
              placeholder='Numéro de compte (si applicable)'
            />

            <MultipleKitchenSelect
              kitchens={kitchens}
              value={selectedKitchenId}
              onValueChange={setSelectedKitchenId}
            />
          </div>
          <Input
            type='text'
            name='description'
            placeholder='Description'
          />
        </div>
        <div className='flex gap-2 justify-end'>
          <AlertDialogCancel disabled={isPending}>Quitter</AlertDialogCancel>
          <Button
            type='submit'
            disabled={isPending}>
            {isPending ? <PulseLoader size={5} /> : "Ajouter"}
          </Button>
        </div>
      </form>
    </div>
  );
}
