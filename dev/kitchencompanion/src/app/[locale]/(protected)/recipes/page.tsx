"use client";

import { useRedirectMembers } from "@/hooks/useRedirectMembers";
import { RecipeBookList } from "@/app/[locale]/(protected)/recipes/_components/recipebook-list";
import { RedirectButton } from "@/components/redirect-button";
import { Button } from "@/components/ui/button";
import { BadgePlus } from "lucide-react";
import { RecipeBooksProvider } from "@/providers/recipe-books";
import { AddDialogue } from "@/components/add-dialogue";
import { AddRecipeBookForm } from "@/app/[locale]/(protected)/recipes/_components/add-recipebook-form";

export default function RecipePage() {
  useRedirectMembers();
  return (
    <div className='container mx-auto space-y-10'>
      <RecipeBooksProvider>
        <div className='flex justify-end mt-6 gap-5'>
          <AddDialogue
            buttonText='Ajouter un livre de recettes'
            title='Ajouter un livre de recettes'>
            <AddRecipeBookForm />
          </AddDialogue>
          <RedirectButton href='/recipes/create'>
            <Button className='flex gap-2'>
              <BadgePlus className='w-4' />
              <span>Ajouter une recette</span>
            </Button>
          </RedirectButton>
        </div>
        <RecipeBookList />
      </RecipeBooksProvider>
    </div>
  );
}
