"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RecipeBook } from "@prisma/client";
import Link from "next/link";

export function RecipeBookCard(recipeBook: RecipeBook) {
  return (
    <Link
      href={`/recipes/books/${recipeBook.name}/?recipeBookId=${recipeBook.id}`}>
      <Card className='min-h-[200px]'>
        <CardHeader className='bg-brand-light rounded-t-lg mb-6 min-h-[125px] space-y-4'>
          <CardTitle>{recipeBook.name}</CardTitle>
          <CardDescription>{recipeBook.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <h2>12 recettes</h2>
        </CardContent>
      </Card>
    </Link>
  );
}
