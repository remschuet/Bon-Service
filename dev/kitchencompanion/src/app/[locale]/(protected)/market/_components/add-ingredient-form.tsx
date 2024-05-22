"use client";

import { addIngredient } from "@/app/[locale]/(protected)/market/_action/ingredient-action";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useSelectedUnit } from "@/hooks/useSelectedUnit";
import { useSession } from "@/hooks/useSession";
import { useRef, useState, useTransition } from "react";
import { PulseLoader } from "react-spinners";
import { useIngredients } from "@/hooks/useIngredients";

export function AddIngredientForm() {
  const { id } = useSession();
  const { isCS, setUnit } = useSelectedUnit();
  const ref = useRef<HTMLFormElement>(null);
  const [isPending, startTransition] = useTransition();

  const { refetch } = useIngredients();

  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<string | undefined>(undefined);

  const units = ["LB", "KG", "G", "L", "ML", "OZ", "UN", "CS"];

  function handleAddIngredient(formData: FormData) {
    startTransition(() => {
      addIngredient(formData).then((res) => {
        setError(res?.error);
        setSuccess(res?.success);
        ref.current?.reset();
      });

      refetch();
    });
  }

  return (
    <div className='grid place-content-center w-[600px]'>
      <form
        ref={ref}
        action={handleAddIngredient}
        className='flex flex-col space-y-7'>
        <div className='flex gap-2 flex-wrap w-full'>
          <Input
            disabled={isPending}
            type='text'
            name='name'
            placeholder="Nom de l'ingrédient"
          />
          <div className='flex gap-6 w-full'>
            <div className='flex gap-2 w-full'>
              <Input
                disabled={isPending}
                type='text'
                name='price'
                placeholder='12.99'
              />
              <Input
                disabled={isPending}
                type='text'
                name={!isCS ? "quantity" : ""}
                placeholder='20'
              />
              <Select
                disabled={isPending}
                name={!isCS ? "unit" : ""}
                onValueChange={(e) => setUnit(e as string)}>
                <SelectTrigger className='w-[100px]'>
                  <SelectValue placeholder='Unité' />
                </SelectTrigger>
                <SelectContent className='w-[80px]'>
                  {units.map((unit) => (
                    <SelectItem
                      key={unit}
                      value={unit}>
                      {unit}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {isCS && (
              <div className='flex gap-2'>
                <Input
                  disabled={isPending}
                  type='text'
                  name='amount-unit'
                  placeholder='6'
                />
                <p className='my-auto font-semibold'> x </p>
                <Input
                  disabled={isPending}
                  type='text'
                  name='quantity'
                  placeholder='20'
                />
                <Select
                  disabled={isPending}
                  name='unit'>
                  <SelectTrigger className='w-[200px]'>
                    <SelectValue placeholder='Unité' />
                  </SelectTrigger>
                  <SelectContent className='w-[80px]'>
                    {units.map((unit) => (
                      <SelectItem
                        key={unit}
                        value={unit}>
                        {unit}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
          <div className='flex gap-2 w-full'>
            <Input
              disabled={isPending}
              type='text'
              name='supplierName'
              placeholder='Nom du fournisseur'
            />
            <Select
              disabled={isPending}
              name='category'>
              <SelectTrigger className='w-[300px]'>
                <SelectValue placeholder='Catégorie' />
              </SelectTrigger>
              <SelectContent className='w-[170px]'>
                <SelectItem value='Fruit & Légume'>Fruit & Légume</SelectItem>
                <SelectItem value='Viande'>Viande</SelectItem>
                <SelectItem value='Poisson'>Poisson</SelectItem>
                <SelectItem value='Produit Laitier'>Produit Laitier</SelectItem>
                <SelectItem value='Pâtisserie'>Pâtisserie</SelectItem>
                <SelectItem value='Congeler'>Congeler</SelectItem>
                <SelectItem value='Sec'>Sec</SelectItem>
                <SelectItem value='Fines Herbes'>Fines Herbes</SelectItem>
                <SelectItem value='Charcuterie'>Charcuterie</SelectItem>
                <SelectItem value='Autre'>Autre</SelectItem>
              </SelectContent>
            </Select>
            <Input
              disabled={isPending}
              className='w-[100px]'
              type='text'
              name='origin'
              placeholder='QC, US...'
            />
            <Input
              disabled={isPending}
              type='hidden'
              name='userId'
              value={id}
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
