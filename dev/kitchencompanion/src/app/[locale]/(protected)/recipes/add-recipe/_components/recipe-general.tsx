"use client";

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
import { useNewRecipe } from "@/hooks/useNewRecipe";
import { useUnits } from "@/hooks/useUnits";
import { debounce } from "@/lib/utils";
import { RecipeState, Unit } from "@prisma/client";

export function RecipeGeneral() {
  const { units } = useUnits();
  const { ctx } = useNewRecipe();

  console.log(ctx.newRecipe);

  return (
    <div className="relative flex-col items-start gap-8 md:flex min-h-[80vh] min-w-[20vw]">
      <div className="grid w-full items-start gap-6">
        <fieldset className="grid gap-6 rounded-lg border p-4">
          <legend className="-ml-1 px-1 text-sm font-medium">
            Paramètres de la recette
          </legend>
          <div className="grid gap-3">
            <Label htmlFor="model">Nom</Label>
            <Input
              type="text"
              placeholder="Sauce tomate"
              onChange={debounce((e) => ctx.setName(e.target.value), 500)}
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="model">Type de recette</Label>
            <Select
              onValueChange={(value) => ctx.setRecipeType(value as RecipeState)}
            >
              <SelectTrigger className="items-start [&_[data-description]]:hidden">
                <SelectValue placeholder="Selectionner un type de recette" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="RECIPE">Recette de base</SelectItem>
                <SelectItem value="DISH">Plat</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-3">
              <Label htmlFor="prepTime">Temps de préparation</Label>
              <div className="flex gap-2">
                <Input
                  type="number"
                  placeholder="30"
                  onChange={(e) => ctx.setPrepTime(parseFloat(e.target.value))}
                />
                <Label
                  htmlFor="timeUnit"
                  className="font-semibold mx-2 content-center"
                >
                  Minutes
                </Label>
              </div>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="cookTime">Temps de cuisson</Label>
              <div className="flex gap-2">
                <Input
                  type="number"
                  placeholder="60"
                  onChange={(e) => ctx.setCookTime(parseFloat(e.target.value))}
                />
                <Label
                  htmlFor="timeUnit"
                  className="font-semibold mx-2 content-center"
                >
                  Minutes
                </Label>
              </div>
            </div>
          </div>
        </fieldset>
        <fieldset className="grid gap-6 rounded-lg border p-4">
          <legend className="-ml-1 px-1 text-sm font-medium">Rendement</legend>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-3">
              <Input
                type="number"
                placeholder="Quantité"
                onChange={(e) => ctx.setRecipeYield(parseFloat(e.target.value))}
              />
            </div>
            <div className="grid gap-3">
              <Select
                name="unit"
                onValueChange={(value) => ctx.setUnit(value as Unit)}
              >
                <SelectTrigger className="min-w-[200px]">
                  <SelectValue placeholder="Unité" />
                </SelectTrigger>
                <SelectContent className="w-[80px]">
                  {units.map((unit) => (
                    <SelectItem key={unit} value={unit}>
                      {unit}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid gap-3">
            <Label htmlFor="model">Coût de la recette</Label>
            <Label htmlFor="cost" className="font-semibold">
              10.00 $/ KG
            </Label>
          </div>
        </fieldset>
        <fieldset className="grid gap-6 rounded-lg border p-4">
          <legend className="-ml-1 px-1 text-sm font-medium">
            Informations
          </legend>
          <Label htmlFor="description">Description</Label>
          <Textarea
            placeholder="Une courte description de la recette..."
            className="min-h-[9.5rem]"
            onChange={debounce((e) => ctx.setDescription(e.target.value), 500)}
          />
          <div className="grid gap-3">
            <Label htmlFor="model">Catégorie</Label>
            <Select onValueChange={(value) => ctx.setCategory(value as string)}>
              <SelectTrigger
                id="category"
                className="items-start [&_[data-description]]:hidden"
              >
                <SelectValue placeholder="Selectionner une catégorie" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sauces">Sauces</SelectItem>
                <SelectItem value="soupes">Soupes</SelectItem>
                <SelectItem value="dessert">Déssert</SelectItem>
                <SelectItem value="meat">Viandes</SelectItem>
                <SelectItem value="vegetarien">Végétarien</SelectItem>
                <SelectItem value="...">...</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-3">
            <Label htmlFor="version">Version</Label>
            <Input
              type="text"
              defaultValue={"1.0.0"}
              onChange={debounce((e) => ctx.setVersion(e.target.value), 500)}
            />
          </div>
        </fieldset>
      </div>
    </div>
  );
}
