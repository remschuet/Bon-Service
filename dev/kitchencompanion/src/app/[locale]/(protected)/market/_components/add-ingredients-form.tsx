"use client";

import { addIngredient } from "@/app/[locale]/(protected)/market/_action/ingredient-action";
import {
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
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

export function AddIngredientsForm() {
  const { id } = useSession();
  const { isCS, setUnit } = useSelectedUnit();

  return (
    <div className='grid place-content-center w-[600px]'>
      <form
        action={addIngredient}
        className='flex flex-col space-y-7'>
        <div className='flex gap-2 flex-wrap w-full'>
          <Input
            type='text'
            name='name'
            placeholder="Nom de l'ingrédient"
          />
          <div className='flex gap-6 w-full'>
            <div className='flex gap-2 w-full'>
              <Input
                type='text'
                name='price'
                placeholder='12.99'
              />
              <Input
                type='text'
                name={!isCS ? "quantity" : ""}
                placeholder='20'
              />
              <Select
                name={!isCS ? "unit" : ""}
                onValueChange={(e) => setUnit(e as string)}>
                <SelectTrigger className='w-[100px]'>
                  <SelectValue placeholder='Unité' />
                </SelectTrigger>
                <SelectContent className='w-[80px]'>
                  <SelectItem value='LB'>LB</SelectItem>
                  <SelectItem value='KG'>KG</SelectItem>
                  <SelectItem value='G'>G</SelectItem>
                  <SelectItem value='L'>L</SelectItem>
                  <SelectItem value='ML'>ML</SelectItem>
                  <SelectItem value='OZ'>OZ</SelectItem>
                  <SelectItem value='UN'>UN</SelectItem>
                  <SelectItem value='CS'>CS</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {isCS && (
              <div className='flex gap-2'>
                <Input
                  type='text'
                  name='amount-unit'
                  placeholder='6'
                />
                <p className='my-auto font-semibold'> x </p>
                <Input
                  type='text'
                  name='quantity'
                  placeholder='20'
                />
                <Select name='unit'>
                  <SelectTrigger className='w-[200px]'>
                    <SelectValue placeholder='Unité' />
                  </SelectTrigger>
                  <SelectContent className='w-[80px]'>
                    <SelectItem value='LB'>LB</SelectItem>
                    <SelectItem value='KG'>KG</SelectItem>
                    <SelectItem value='G'>G</SelectItem>
                    <SelectItem value='L'>L</SelectItem>
                    <SelectItem value='ML'>ML</SelectItem>
                    <SelectItem value='OZ'>OZ</SelectItem>
                    <SelectItem value='UN'>UN</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
          <div className='flex gap-2 w-full'>
            <Input
              type='text'
              name='supplierName'
              placeholder='Nom du fournisseur'
            />
            <Select name='category'>
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
              className='w-[100px]'
              type='text'
              name='origin'
              placeholder='QC, US...'
            />
            <Input
              type='hidden'
              name='userId'
              value={id}
            />
          </div>
        </div>
        <div className='flex gap-2 justify-end'>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction type='submit'>Ajouter</AlertDialogAction>
        </div>
      </form>
    </div>
  );
}
