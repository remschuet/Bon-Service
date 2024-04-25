"use client";

import sanitizeHtml from "sanitize-html";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useSession } from "@/hooks/useSession";
import { RecipeBook } from "@prisma/client";
import { useRef, useState, useTransition } from "react";
import { PulseLoader } from "react-spinners";
import { RecipeBookSchema } from "@/lib/validation";
import { Label } from "@/components/ui/label";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { Textarea } from "@/components/ui/textarea";
import { DialogClose } from "@radix-ui/react-dialog";
import { addRecipeBook } from "@/app/[locale]/(protected)/recipes/_actions/recipes-action";

export function AddRecipeBookForm() {
  const { id } = useSession();
  const ref = useRef<HTMLFormElement>(null);
  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<string | undefined>(undefined);
  const [isPending, startTransition] = useTransition();

  function handleAddRecipeBook(formData: FormData) {
    const description = formData.get("description") as string;

    const recipeBook = {
      userId: id,
      name: formData.get("name") as string,
      description: sanitizeHtml(description),
    };

    const validatedRecipeBook = RecipeBookSchema.safeParse(recipeBook);

    if (!validatedRecipeBook.success) {
      setError("Les données saisies sont invalides.");
      ref.current?.reset();
      return;
    }

    startTransition(async () => {
      addRecipeBook(validatedRecipeBook.data as RecipeBook).then((res) => {
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
        action={handleAddRecipeBook}
        className='flex flex-col space-y-7'>
        <div className='flex gap-4 flex-wrap'>
          <div className='flex flex-col gap-2 w-full'>
            <Label className='text-md font-semibold'>
              Nom du livre de recette *
            </Label>
            <Input
              type='text'
              name='name'
              disabled={isPending}
              placeholder='Recettes de base'
            />
          </div>
          <div className='flex flex-col gap-2 w-full'>
            <Label className='text-md font-semibold'>Description * </Label>
            <Textarea
              name='description'
              placeholder='Recettes servant de base pour plusieurs autres recettes.'
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
