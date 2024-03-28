import { ChevronsRight } from "lucide-react";
import Link from "next/link";

export function WelcomeMessage() {
  return (
    <div className='bg-brand-hover flex flex-col gap-3 shadow-md min-h-[100px] rounded-sm border-2 border-border-brand p-6 sm:col-span-4 sm:row-span-1 md:row-span-2 '>
      <h1 className='text-xl font-semibold text-brand-foreground tracking-tight sm:text-2xl'>
        Bienvenue sur votre portail !
      </h1>
      <h2 className='text-lg text-brand-foreground sm:text-xl italic'>
        Guide de démarrage
      </h2>
      <p className='text-sm text-brand-foreground sm:text-base'>
        Bon Service est un outil de gestion et de partage de recettes pour les
        chefs modernes. Vous pouvez rapidement créer, organiser et partager à
        votre équipes vos recettes et menus. Ajoutez facilements des ingrédients
        à votre marché et facilitez votre gestion de vos coûts. Passez plus de
        temps à cuisiner et moins de temps à faire de l'administration.
      </p>
      <Link
        className='self-center font-bold text-brand-foreground hover:text-brand-link mt-2 sm:self-end'
        href='/documentation'>
        <div className='flex items-center gap-3'>
          <p>En savoir plus</p>
          <ChevronsRight className='pt-[0.12rem] w-5 h-5' />
        </div>
      </Link>
    </div>
  );
}
