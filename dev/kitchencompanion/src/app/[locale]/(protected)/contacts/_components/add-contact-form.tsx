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
import { useContacts } from "@/hooks/useContacts";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Textarea } from "@/components/ui/textarea";

export function AddContactForm() {
  const { id } = useSession();
  const { kitchens } = useKitchens();
  const ref = useRef<HTMLFormElement>(null);
  const [selectedKitchenId, setSelectedKitchenId] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();

  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<string | undefined>(undefined);
  const { refetch } = useContacts();

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

      refetch();
    });
  }

  return (
    <div className='grid place-content-center p-4'>
      <form
        ref={ref}
        action={handleAddContact}
        className='flex flex-col space-y-7'>
        <div className='flex gap-2 flex-wrap w-full space-y-3'>
          <div className='flex flex-col gap-2 w-full'>
            <Label className='text-md font-semibold'>Nom du contact *</Label>
            <Input
              type='text'
              name='name'
              placeholder='Jean Tremblay'
              disabled={isPending}
            />
          </div>
          <div className='flex flex-col gap-2 w-full'>
            <Label className='text-md font-semibold'>
              Numéro de téléphone *
            </Label>
            <Input
              type='text'
              name='phoneNumber'
              placeholder='(514) 123-4567'
              disabled={isPending}
            />
          </div>
          <div className='flex flex-col gap-2 w-full'>
            <Label className='text-md font-semibold'>
              Numéro de compte (si applicable)
            </Label>
            <p className='text-muted text-sm'>
              Certaines entreprise ont des numéros de compte pour leurs clients.
              Si c'est le cas, vous pouvez le spécifier ici.
            </p>
            <Input
              type='text'
              name='compteNumber'
              placeholder='NMT1203'
              disabled={isPending}
            />
          </div>
          <div className='flex flex-col gap-2 w-full'>
            <Label className='text-md font-semibold'>
              Cuisine(s) associée(s) (si applicable)
            </Label>
            <div>
              <MultipleKitchenSelect
                kitchens={kitchens}
                value={selectedKitchenId}
                onValueChange={setSelectedKitchenId}
              />
            </div>
          </div>
          <div className='flex flex-col gap-2 w-full'>
            <Label className='text-md font-semibold'>Description</Label>
            <Textarea
              name='description'
              placeholder='Courte description de la cuisine et de son objectif.'
              maxLength={128}
              disabled={isPending}
              className='h-24'
            />
          </div>
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
