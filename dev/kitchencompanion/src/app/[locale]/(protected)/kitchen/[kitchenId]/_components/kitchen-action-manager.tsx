import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { PulseLoader } from "react-spinners";
import { toast } from "@/components/ui/use-toast";
import { useSearchParams } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";

export function KitchenActionManager() {
  return (
    <ScrollArea className="relative flex-col items-start gap-2 md:flex max-h-[85vh] max-w-[30vw] rounded-lg">
      <div className="grid w-full items-start gap-6">
        <fieldset className="grid gap-6 rounded-lg border p-4">
          <legend className="-ml-1 px-1 text-sm font-medium">
            Gestion des membres
          </legend>
          <fieldset className="grid gap-4 rounded-lg border p-4">
            <legend className="-ml-1 px-1 text-sm font-medium">
              Ajouter un membre
            </legend>
            <div className="grid gap-3">
              <Label htmlFor="model">Courriel</Label>
              <p className="text-[0.75rem] text-muted italic">
                Inscrivez l'adresse courriel du membre à ajouter, s'il n'est pas
                déjà inscrit, un compte sera créé pour lui. Il recevra un
                courriel de d'activation afin de compléter son inscription.
              </p>
              <Input type="text" placeholder="membre@example.com" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="model">Role</Label>
              <Select>
                <SelectTrigger className="items-start [&_[data-description]]:hidden">
                  <SelectValue placeholder="Selectionner un role" />
                </SelectTrigger>
                <SelectContent></SelectContent>
              </Select>
            </div>
            <Button className="w-full">Ajouter</Button>
          </fieldset>
          <fieldset className="grid gap-4 rounded-lg border p-4">
            <legend className="-ml-1 px-1 text-sm font-medium">
              Supprimer un membre
            </legend>
            <Label>Membre</Label>
            <Select>
              <SelectTrigger className="items-start [&_[data-description]]:hidden">
                <SelectValue placeholder="Selectionner un membre à retirer de votre cuisine" />
              </SelectTrigger>
              <SelectContent></SelectContent>
            </Select>
            <Button className="w-full">Supprimer</Button>
          </fieldset>
        </fieldset>

        <fieldset className="grid gap-6 rounded-lg border p-4">
          <legend className="-ml-1 px-1 text-sm font-medium">
            Gestion des menus
          </legend>
          <fieldset className="grid gap-4 rounded-lg border p-4">
            <legend className="-ml-1 px-1 text-sm font-medium">
              Ajouter un menu
            </legend>
            <Label>Vos menus</Label>
            <Select>
              <SelectTrigger className="items-start [&_[data-description]]:hidden">
                <SelectValue placeholder="Selectionner un menu à partager" />
              </SelectTrigger>
              <SelectContent></SelectContent>
            </Select>
            <Button className="w-full">Ajouter</Button>
          </fieldset>
          <fieldset className="grid gap-4 rounded-lg border p-4">
            <legend className="-ml-1 px-1 text-sm font-medium">
              Supprimer un menu
            </legend>
            <Label>Menus partagés</Label>
            <Select>
              <SelectTrigger className="items-start [&_[data-description]]:hidden">
                <SelectValue placeholder="Selectionner un menu à retirer du partage" />
              </SelectTrigger>
              <SelectContent></SelectContent>
            </Select>
            <Button className="w-full">Supprimer</Button>
          </fieldset>
        </fieldset>

        <fieldset className="grid gap-6 rounded-lg border p-4">
          <legend className="-ml-1 px-1 text-sm font-medium">
            Gestion des contacts
          </legend>
          <fieldset className="grid gap-4 rounded-lg border p-4">
            <legend className="-ml-1 px-1 text-sm font-medium">
              Ajouter un contact
            </legend>
            <Label>Vos contacts</Label>
            <Select>
              <SelectTrigger className="items-start [&_[data-description]]:hidden">
                <SelectValue placeholder="Selectionner un menu à partager" />
              </SelectTrigger>
              <SelectContent></SelectContent>
            </Select>
            <Button className="w-full">Ajouter</Button>
          </fieldset>
          <fieldset className="grid gap-4 rounded-lg border p-4">
            <legend className="-ml-1 px-1 text-sm font-medium">
              Supprimer un contact
            </legend>
            <Label>Contacts partagés</Label>
            <Select>
              <SelectTrigger className="items-start [&_[data-description]]:hidden">
                <SelectValue placeholder="Selectionner un menu à retirer du partage" />
              </SelectTrigger>
              <SelectContent></SelectContent>
            </Select>
            <Button className="w-full">Supprimer</Button>
          </fieldset>
        </fieldset>
      </div>
    </ScrollArea>
  );
}
