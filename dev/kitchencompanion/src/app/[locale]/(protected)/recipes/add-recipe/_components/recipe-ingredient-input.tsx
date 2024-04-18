"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUnits } from "@/hooks/useUnits";

export function RecipeIngredientInput() {
  const { units } = useUnits();

  return (
    <div className="relative flex min-h-[30vh] flex-col rounded-xl bg-stone-200 p-4 lg:col-span-2 min-w-[45vw]">
      <Badge variant={"secondary"} className="absolute right-3 top-3">
        Ingrédients
      </Badge>
      <div className="flex-1 space-y-[0.05rem] m-2"></div>
      <div className="flex gap-2 rounded-lg bg-background p-3 border">
        <Label htmlFor="ingredients" className="sr-only">
          Ingrédients
        </Label>
        <Input placeholder="Rechercher un ingrédient..." className="border-0" />
        <div className="grid gap-3">
          <Input
            type="number"
            placeholder="Quantité"
            className="min-w-[100px]"
          />
        </div>
        <div className="grid gap-3">
          <Select name="unit">
            <SelectTrigger>
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
        <Button className="gap-2">Ajouter</Button>
      </div>
    </div>
  );
}
