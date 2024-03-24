import { ChevronsRight } from "lucide-react";
import Link from "next/link";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function DashboardPage() {
  const today = new Date().toLocaleDateString("fr-FR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const menus = [
    {
      type: "Diner",
      name: "Table d'hôte 3 services",
      kitchen: "Restaurant Le Bon Service",
      note: "Menu du lunch disponible à partir de 11h30",
      prix: "28$",
      date: "25-03-2024",
    },
    {
      type: "Souper",
      name: "Menu à la carte",
      kitchen: "Restaurant Le Bon Service",
      note: "Menu printemps disponible à partir de 17h30",
      prix: "",
      date: "25-03-2024",
    },
    {
      type: "Souper",
      name: "Menu dégustation 6 services",
      kitchen: "Restaurant Le Bon Service",
      note: "Dégustation disponible à partir de 17h30, réservation requise",
      prix: "125$",
      date: "25-03-2024",
    },
    {
      type: "Brunch",
      name: "Menu à la carte",
      kitchen: "Restaurant Le Bon Service",
      note: "Menu brunch disponible à partir de 10h30 le dimanche",
      prix: "",
      date: "24-03-2024",
    },
    {
      type: "Traiteur",
      name: "Événnement corporatif: cocktail dînatoire",
      kitchen: "Équipe Traiteur Privé",
      note: "Cocktail dînatoire pour 50 personnes, service de 17h30 à 19h30 chez Stingray",
      prix: "3200$",
      date: "27-03-2024",
    },
    {
      type: "Traiteur",
      name: "Événement privé: mariage",
      kitchen: "Équipe Traiteur Privé",
      note: "Mariage de Marie et Christian, 150 personnes. Contact: Marie 514-555-5555",
      prix: "12000$",
      date: "29-03-2024",
    },
  ];

  const contacts = [
    {
      role: "Sous-Chef",
      name: "Marie-Ève Lachance",
      business: "Restaurant Le Bon Service",
      note: "En vacances du 25 au 30 mars",
      phone: "514-555-5555",
    },
    {
      role: "Chef",
      name: "Ricardo Larrivée",
      business: "Équipe Traiteur Privé",
      note: "",
      phone: "514-555-5555",
    },
    {
      role: "Représentant",
      name: "Daniel Vézina",
      business: "Hector Larivée",
      note: "Code client: MTL-1234",
      phone: "514-555-5555",
    },
    {
      role: "Représentant",
      name: "Antonin Mousseau-Rivard",
      business: "Au Terroire",
      note: "Fromage et charcuterie locale, livraison gratuite sur commande de 100$ et plus",
      phone: "514-555-5555",
    },
    {
      role: "Réparateur",
      name: "Charles-Antoine Crête",
      business: "Frigo Réparation Inc.",
      note: "Coûte 150$ par visite, 24h de délai pour rendez-vous",
      phone: "514-555-5555",
    },
  ];

  return (
    <div className='grid gap-5 sm:grid-cols-7 sm:grid-rows-10 '>
      <div className='bg-brand-light flex flex-col gap-3 shadow-md min-h-[100px] rounded-sm border-2 border-border-brand p-6 sm:col-span-4 row-span-2 '>
        <h1 className='text-xl font-semibold text-foreground tracking-tight sm:text-2xl'>
          Bienvenue sur votre portail !
        </h1>
        <h2 className='text-lg text-foreground sm:text-xl italic'>
          Guide de démarrage
        </h2>
        <p className='text-sm sm:text-base'>
          Bon Service est un outil de gestion et de partage de recettes pour les
          chefs modernes. Vous pouvez rapidement créer, organiser et partager à
          votre équipes vos recettes et menus. Ajoutez facilements des
          ingrédients à votre marché et facilitez votre gestion de vos coûts.
          Passez plus de temps à cuisiner et moins de temps à faire de
          l'administration.
        </p>
        <Link
          className='self-center font-bold text-stone-900 hover:text-brand-link mt-2 sm:self-end'
          href='/documentation'>
          <div className='flex items-center gap-3'>
            <p>En savoir plus</p>
            <ChevronsRight className='pt-[0.12rem] w-5 h-5' />
          </div>
        </Link>
      </div>

      <div className='flex flex-col shadow-md min-h-[100px] rounded-sm border-2 p-6 sm:col-span-3 row-span-5 '>
        <div className='flex flex-col gap-5'>
          <h1 className='text-xl font-semibold text-brand-dark tracking-tight sm:text-2xl'>
            Vos contacts favoris
          </h1>
          <h2 className='text-lg sm:text-xl italic'>
            Une liste de vos contacts les plus fréquents
          </h2>
        </div>
        <Table className='mt-10'>
          <TableHeader>
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>Entreprise</TableHead>
              <TableHead>Notes</TableHead>
              <TableHead className='w-[120px]'>Role</TableHead>
              <TableHead className='text-right w-[140px]'>
                Numéro de téléphone
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {contacts.map((contact, key) => (
              <TableRow key={key}>
                <TableCell>{contact.name}</TableCell>
                <TableCell>{contact.business}</TableCell>
                <TableCell>{contact.note}</TableCell>
                <TableCell>{contact.role}</TableCell>
                <TableCell className='text-right'>{contact.phone}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={6}>
                <Link
                  href='/contacts'
                  className='grid place-content-end'>
                  <div className='flex items-center gap-3 font-semibold text-brand-dark hover:text-brand-link'>
                    <p>Voir tous les contacts</p>
                    <ChevronsRight className='pt-[0.12rem] w-4 h-4' />
                  </div>
                </Link>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>

      <div className='flex flex-col shadow-md min-h-[100px] rounded-sm border-2 p-6 sm:col-span-1 row-span-2'>
        <h1 className='m-auto text-xl font-semibold text-brand-dark tracking-tight sm:text-2xl'>
          Cuisines
        </h1>

        <p className='m-auto text-7xl font-black'>5</p>
      </div>
      <div className='flex flex-col shadow-md min-h-[100px] rounded-sm border-2 p-6 sm:col-span-1 row-span-2'>
        <h1 className='m-auto text-xl font-semibold text-brand-dark tracking-tight sm:text-2xl'>
          Recettes
        </h1>

        <p className='m-auto text-7xl font-black'>120</p>
      </div>
      <div className='flex flex-col shadow-md min-h-[100px] rounded-sm border-2 p-6 sm:col-span-1 row-span-2'>
        <h1 className='m-auto text-xl font-semibold text-brand-dark tracking-tight sm:text-2xl'>
          Menus
        </h1>
        <p className='m-auto text-7xl font-black'>13</p>
      </div>
      <div className='flex flex-col shadow-md min-h-[100px] rounded-sm border-2 p-6 sm:col-span-1 row-span-2'>
        <h1 className='m-auto text-xl font-semibold text-brand-dark tracking-tight sm:text-2xl'>
          Employés
        </h1>
        <p className='m-auto text-7xl font-black'>24</p>
      </div>

      <div className='flex flex-col shadow-md min-h-[100px] space-y-12 rounded-sm border-2 p-6 sm:col-span-4 row-span-6 '>
        <div className='flex flex-col gap-5'>
          <h1 className='text-xl font-semibold text-brand-dark tracking-tight sm:text-2xl'>
            Au menu cette semaine
          </h1>
          <h2 className='text-lg sm:text-xl italic'>
            {today[0].toUpperCase() + today.slice(1)}
          </h2>
          <p className='text-sm sm:text-base'>
            Vous avez planifié {menus.length} menus pour cette semaine. Vous
            pouvez les consulter et les modifier à tout moment.
          </p>
        </div>
        <Table>
          <TableCaption>Liste de vos menus partagé</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className='w-[100px]'>Type</TableHead>
              <TableHead>Nom</TableHead>
              <TableHead>Cuisine</TableHead>
              <TableHead>Notes</TableHead>
              <TableHead>Prix</TableHead>
              <TableHead className='text-right w-[110px]'>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {menus.map((menu, key) => (
              <TableRow key={key}>
                <TableCell className='font-medium'>{menu.type}</TableCell>
                <TableCell>{menu.name}</TableCell>
                <TableCell>{menu.kitchen}</TableCell>
                <TableCell>{menu.note}</TableCell>
                <TableCell>{menu.prix}</TableCell>
                <TableCell className='text-right'>{menu.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={6}>
                <Link
                  href='/menus'
                  className='grid place-content-end'>
                  <div className='flex items-center gap-3 font-semibold text-brand-dark hover:text-brand-link'>
                    <p>Voir tous les menus</p>
                    <ChevronsRight className='pt-[0.12rem] w-4 h-4' />
                  </div>
                </Link>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>

      <div className='flex flex-col gap-3 shadow-md min-h-[100px] rounded-sm border-2 p-6 sm:col-span-3 row-span-5 '>
        <h1 className='text-xl font-semibold text-brand-dark tracking-tight sm:text-2xl'>
          Dernière entrée de température des réfrigérateurs
        </h1>
      </div>
    </div>
  );
}
