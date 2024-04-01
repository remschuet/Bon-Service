"use client";

import sanitizeHtml from "sanitize-html";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useSession } from "@/hooks/useSession";
import { Kitchen } from "@prisma/client";
import { useRef, useState, useTransition } from "react";
import { PulseLoader } from "react-spinners";
import { KitchenSchema } from "@/lib/validation";
import { addKitchen } from "@/app/[locale]/(protected)/kitchen//_action/kitchen-action";
import { Label } from "@/components/ui/label";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { Textarea } from "@/components/ui/textarea";
import { DialogClose } from "@radix-ui/react-dialog";

export function AddKitchenForm() {
  const { id } = useSession();
  const ref = useRef<HTMLFormElement>(null);
  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<string | undefined>(undefined);
  const [isPending, startTransition] = useTransition();

  function handleAddKitchen(formData: FormData) {
    const costObjective = formData.get("costObjective") as string;
    const description = formData.get("description") as string;

    let parsedCostObjective: number;

    if (costObjective === "") {
      parsedCostObjective = 20;
    } else {
      parsedCostObjective = parseInt(costObjective.replace("%", ""));
    }

    const kitchen = {
      userId: id,
      name: formData.get("name") as string,
      costObjective: parsedCostObjective,
      description: sanitizeHtml(description),
    };

    const validatedKitchen = KitchenSchema.safeParse(kitchen);

    if (!validatedKitchen.success) {
      setError("Les données saisies sont invalides.");
      ref.current?.reset();
      return;
    }

    startTransition(async () => {
      addKitchen(validatedKitchen.data as Kitchen).then((res) => {
        setError(res?.error);
        setSuccess(res?.success);
        ref.current?.reset();
      });
    });
  }

  return (
    <div className='grid place-content-center p-4'>
      <form
        ref={ref}
        action={handleAddKitchen}
        className='flex flex-col space-y-7'>
        <div className='flex gap-4 flex-wrap'>
          <div className='flex flex-col gap-2 w-full'>
            <Label className='text-md font-semibold'>Nom de la cuisine *</Label>
            <Input
              type='text'
              name='name'
              disabled={isPending}
              placeholder='Mon entreprise de traiteur'
            />
          </div>
          <div className='flex flex-col gap-2 w-full'>
            <Label className='text-md font-semibold'>Description * </Label>
            <Textarea
              name='description'
              placeholder='Courte description de la cuisine et de son objectif.'
              maxLength={128}
              disabled={isPending}
              className='h-24'
            />
          </div>
          <div className='flex flex-col gap-2 w-full'>
            <Label className='text-md font-semibold'>Objectif de coût</Label>
            <p className='text-xs text-muted'>
              Afin de vous aider à gérer vos coûts, veuillez indiquer un
              objectif de coût pour cette cuisine. Cet objectif sera utilisé
              pour faire des comparaisons avec les coûts réels de vos recettes.{" "}
              <span className='italic font-semibold'>
                Le chiffre représente le pourcentage du coût de vos ingrédients
                par rapport au prix de vente de vos recettes.
              </span>{" "}
              <span className='underline font-semibold'>
                Par défaut, l'objectif est de 20%.
              </span>
            </p>
            <Input
              type='text'
              name='costObjective'
              disabled={isPending}
              placeholder='20%'
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
