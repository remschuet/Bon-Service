import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export function RecipeGeneral() {
  return (
    <div className='relative flex-col items-start gap-8 md:flex min-h-[80vh] min-w-[20vw]'>
      <form className='grid w-full items-start gap-6'>
        <fieldset className='grid gap-6 rounded-lg border p-4'>
          <legend className='-ml-1 px-1 text-sm font-medium'>
            Paramètres de la recette
          </legend>
          <div className='grid gap-3'>
            <Label htmlFor='model'>Nom</Label>
            <Input
              id='name'
              type='text'
              placeholder='Sauce tomate'
            />
          </div>
          <div className='grid gap-3'>
            <Label htmlFor='model'>Type de recette</Label>
            <Select>
              <SelectTrigger
                id='recipeType'
                className='items-start [&_[data-description]]:hidden'>
                <SelectValue placeholder='Selectionner un type de recette' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='RECIPE'>Recette de base</SelectItem>
                <SelectItem value='DISH'>Plat</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className='grid grid-cols-2 gap-4'>
            <div className='grid gap-3'>
              <Label htmlFor='prepTime'>Temps de préparation</Label>
              <div className='flex gap-2'>
                <Input
                  id='prepTime'
                  type='number'
                  placeholder='30'
                />
                <Select name='prepTimeUnit'>
                  <SelectTrigger>
                    <SelectValue placeholder='Unité' />
                  </SelectTrigger>
                  <SelectContent className='w-[80px]'>
                    <SelectItem value='minutes'>Minutes</SelectItem>
                    <SelectItem value='hours'>Hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className='grid gap-3'>
              <Label htmlFor='cookTime'>Temps de cuisson</Label>
              <div className='flex gap-2'>
                <Input
                  id='cookTime'
                  type='number'
                  placeholder='60'
                />
                <Select name='prepTimeUnit'>
                  <SelectTrigger>
                    <SelectValue placeholder='Unité' />
                  </SelectTrigger>
                  <SelectContent className='w-[80px]'>
                    <SelectItem value='minutes'>Minutes</SelectItem>
                    <SelectItem value='hours'>Heures</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </fieldset>
        <fieldset className='grid gap-6 rounded-lg border p-4'>
          <legend className='-ml-1 px-1 text-sm font-medium'>Rendement</legend>
          <div className='grid grid-cols-2 gap-4'>
            <div className='grid gap-3'>
              <Input
                id='yield'
                type='number'
                placeholder='Quantité'
              />
            </div>
            <div className='grid gap-3'>
              <Select name='unit'>
                <SelectTrigger className='min-w-[200px]'>
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
          </div>
          <div className='grid gap-3'>
            <Label htmlFor='model'>Coût de la recette</Label>
            <Input
              id='name'
              type='text'
              placeholder='Sauce tomate'
            />
          </div>
        </fieldset>
        <fieldset className='grid gap-6 rounded-lg border p-4'>
          <legend className='-ml-1 px-1 text-sm font-medium'>
            Informations
          </legend>
          <Label htmlFor='description'>Description</Label>
          <Textarea
            id='content'
            placeholder='Une courte description de la recette...'
            className='min-h-[9.5rem]'
          />
          <div className='grid gap-3'>
            <Label htmlFor='model'>Catégorie</Label>
            <Select>
              <SelectTrigger
                id='category'
                className='items-start [&_[data-description]]:hidden'>
                <SelectValue placeholder='Selectionner une catégorie' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='sauces'>Sauces</SelectItem>
                <SelectItem value='soupes'>Soupes</SelectItem>
                <SelectItem value='dessert'>Déssert</SelectItem>
                <SelectItem value='meat'>Viandes</SelectItem>
                <SelectItem value='vegetarien'>Végétarien</SelectItem>
                <SelectItem value='...'>...</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className='grid gap-3'>
            <Label htmlFor='version'>Version</Label>
            <Input
              id='name'
              type='text'
              defaultValue={"v.1.0.0"}
            />
          </div>
        </fieldset>
      </form>
    </div>
  );
}
