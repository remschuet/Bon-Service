import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronsRight } from "lucide-react";
import Link from "next/link";

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

export function FavouriteContacts() {
  return (
    <div className='flex flex-col shadow-md min-h-[100px] rounded-sm border-2 p-6 sm:col-span-4 sm:row-span-2 md:col-span-3 md:row-span-5 '>
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
          <TableRow className='hover:bg-background'>
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
          <TableRow className='hover:bg-muted-foreground'>
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
  );
}
