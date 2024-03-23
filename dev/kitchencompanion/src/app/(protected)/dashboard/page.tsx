import { Button } from "@/components/ui/button";
import { ChevronsRight } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className='grid gap-5 sm:grid-cols-7 sm:grid-rows-10 '>
      <div className='flex flex-col gap-3 shadow-sm min-h-[100px] rounded-sm border-2 p-6 sm:col-span-4 row-span-2 '>
        <h1 className='text-xl font-semibold text-stone-700 tracking-tight sm:text-2xl'>
          Bienvenue sur votre portail !
        </h1>
        <h2 className='text-lg sm:text-xl italic'>Guide de démarrage</h2>
        <p className='text-sm sm:text-base'>
          Bon Service est un outil de gestion et de partage de recettes pour les
          chefs modernes. Vous pouvez rapidement créer, organiser et partager à
          votre équipes vos recettes et menus. Ajoutez facilements des
          ingrédients à votre marché et facilitez votre gestion de vos coûts.
          Passez plus de temps à cuisiner et moins de temps à faire de
          l'administration.
        </p>
        <Link
          className='self-center font-bold text-emerald-700 hover:text-emerald-500 mt-2 sm:self-end'
          href='/documentation'>
          <div className='flex items-center gap-3'>
            <p>En savoir plus</p>
            <ChevronsRight className='pt-[0.12rem] w-5 h-5' />
          </div>
        </Link>
      </div>

      <div className='flex flex-col gap-3 shadow-sm min-h-[100px] rounded-sm border-2 p-6 sm:col-span-3 row-span-5 '>
        <h1 className='text-xl font-semibold text-stone-700 tracking-tight sm:text-2xl'>
          Vos contacts favoris
        </h1>
      </div>

      <div className='flex flex-col gap-3 shadow-sm min-h-[100px] rounded-sm border-2 p-6 sm:col-span-2 row-span-2'>
        <h1 className='text-xl font-semibold text-stone-700 tracking-tight sm:text-2xl'>
          Nombre de cuisines
        </h1>
        <h2 className='text-lg sm:text-xl italic'>À ce jour vous avez créé</h2>
        <p className='self-end pr-10 text-7xl font-black'>5</p>
      </div>
      <div className='flex flex-col gap-3 shadow-sm min-h-[100px] rounded-sm border-2 p-6 sm:col-span-2 row-span-2'>
        <h1 className='text-xl font-semibold text-stone-700 tracking-tight sm:text-2xl'>
          Nombre de recettes
        </h1>
        <h2 className='text-lg sm:text-xl italic'>
          À ce jour vous avez ajouté
        </h2>
        <p className='self-end pr-10 text-7xl font-black'>120</p>
      </div>

      <div className='flex flex-col gap-3 shadow-sm min-h-[100px] rounded-sm border-2 p-6 sm:col-span-4 row-span-6 '>
        <h1 className='text-xl font-semibold text-stone-700 tracking-tight sm:text-2xl'>
          Vos menus de la semaine
        </h1>
      </div>

      <div className='flex flex-col gap-3 shadow-sm min-h-[100px] rounded-sm border-2 p-6 sm:col-span-3 row-span-5 '>
        <h1 className='text-xl font-semibold text-stone-700 tracking-tight sm:text-2xl'>
          Dernière entrée de température des réfrigérateurs
        </h1>
      </div>
    </div>
  );
}
