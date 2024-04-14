import { useRecipeBooks } from "@/hooks/useRecipeBooks";
import { RecipeBookCard } from "@/app/[locale]/(protected)/recipes/_components/recipebook-card";

export function RecipeBookList() {
  const { recipeBooks } = useRecipeBooks();
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
      {recipeBooks.map((recipeBook) => (
        <RecipeBookCard
          {...recipeBook}
          key={recipeBook.id}
        />
      ))}
    </div>
  );
}
