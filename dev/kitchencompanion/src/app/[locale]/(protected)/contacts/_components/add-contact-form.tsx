"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useSession } from "@/hooks/useSession";
import { addContact } from "@/app/[locale]/(protected)/contacts/_action/contact-action";
import { Contact } from "@prisma/client";
import { useRef, useState, useTransition } from "react";
import { PulseLoader } from "react-spinners";
import { ContactSchema } from "@/lib/validation";
import { useKitchens } from "@/hooks/useKitchens";
import { MultipleKitchenSelect } from "@/app/[locale]/(protected)/contacts/_components/multiple-kitchen-select";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { DialogClose } from "@/components/ui/dialog";

export function AddContactForm() {
  const { id } = useSession();
  const { kitchens } = useKitchens();
  const ref = useRef<HTMLFormElement>(null);
  const [selectedKitchenId, setSelectedKitchenId] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();

  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<string | undefined>(undefined);

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
      setError("Les données saisies sont invalides.");
      return;
    }

    startTransition(() => {
      addContact(validatedContact.data as Contact, selectedKitchenId).then(
        (res) => {
          setError(res?.error);
          setSuccess(res?.success);
          ref.current?.reset();
        }
      );
    });
  }

  return (
    <div className='grid place-content-center w-[600px]'>
      <form
        ref={ref}
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
        <div>
          {error !== undefined && <FormError error={error} />}
          {success !== undefined && <FormSuccess success={success} />}
        </div>
        <div className='flex gap-2 justify-end'>
          <DialogClose asChild>
            <Button
              type='button'
              variant='outline'
              disabled={isPending}>
              Quitter
            </Button>
          </DialogClose>
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
