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
import { ChevronsRight } from "lucide-react";
import Link from "next/link";

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

export function WeeklyMenus() {
  return (
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
          <TableRow className='hover:bg-background'>
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
          <TableRow className='hover:bg-muted-foreground'>
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
  );
}
