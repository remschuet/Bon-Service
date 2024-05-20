"use client";

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
import { useRef, useState, useTransition } from "react";
import { toast } from "@/components/ui/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import { debounce, formatTitle } from "@/lib/utils";
import {
  addMemberToKitchen,
  getAllEmail,
  removeMemberToKitchen,
} from "../_action/kitchenid-action";
import { RoleName } from "@prisma/client";
import { useKitchenData } from "@/hooks/useKitchenData";

export function KitchenActionManager({ kitchenId }: { kitchenId: string }) {
  const { members, roles, refetch } = useKitchenData();

  const [addMemberIsPending, startAddMemberTransition] = useTransition();
  const [removeMemberIsPending, startRemoveMemberTransition] = useTransition();

  const emailRef = useRef<HTMLInputElement>(null);
  const [emails, setEmails] = useState<string[]>([]);
  const [selectedRole, setSelectedRole] = useState<string>();
  const [selectedMember, setSelectedMember] = useState<string>();

  async function onChangeGetEmail() {
    const response = await getAllEmail(emailRef.current?.value as string);

    if (Array.isArray(response)) {
      setEmails(response);
    } else {
      console.error(response.error);
    }
  }

  function selectMemberEmail(email: string) {
    emailRef.current!.value = email;
    setEmails([]);
  }

  function handleAddMember() {
    startAddMemberTransition(async () => {
      const email = emailRef.current?.value as string;
      await addMemberToKitchen(email, kitchenId, selectedRole as RoleName);

      refetch();

      toast({
        variant: "success",
        title: "Membre ajouté",
        description: `Un courriel a été envoyé à ${email} pour confirmer son inscription.`,
      });
    });
  }

  function handleRemoveMember(email: string) {
    startRemoveMemberTransition(async () => {
      await removeMemberToKitchen(email, kitchenId);

      refetch();

      toast({
        variant: "success",
        title: "Membre retiré",
        description: `Le membre a été retiré de votre cuisine.`,
      });
    });
  }

  return (
    <ScrollArea className='relative flex-col items-start gap-2 md:flex max-h-[85vh] max-w-[30vw] rounded-lg'>
      <div className='grid w-full items-start gap-6'>
        <fieldset className='grid gap-6 rounded-lg border p-4'>
          <legend className='-ml-1 px-1 text-sm font-medium'>
            Gestion des membres
          </legend>
          <fieldset className='grid gap-4 rounded-lg border p-4'>
            <legend className='-ml-1 px-1 text-sm font-medium'>
              Ajouter un membre
            </legend>
            <div className='grid gap-3 relative'>
              <Label htmlFor='model'>Courriel</Label>
              <p className='text-[0.75rem] text-muted italic'>
                Inscrivez l'adresse courriel du membre à ajouter, s'il n'est pas
                déjà inscrit, un compte sera créé pour lui. Il recevra un
                courriel de d'activation afin de compléter son inscription.
              </p>
              <Input
                ref={emailRef}
                type='text'
                onChange={debounce(onChangeGetEmail, 500)}
                placeholder='membre@example.com'
              />
              <div
                className={`absolute w-full bg-background z-10 top-[118px] rounded-lg border ${
                  emails.length === 0 ? "hidden" : " "
                }`}>
                {emails.map(
                  (email, key) => (
                    console.log(email),
                    (
                      <div
                        key={key}
                        className='hover:bg-stone-300/50 cursor-pointer p-2 rounded-md text-sm m-2'
                        onClick={() => selectMemberEmail(email)}>
                        {email}
                      </div>
                    )
                  )
                )}
              </div>
            </div>
            <div className='grid gap-3'>
              <Label htmlFor='model'>Role</Label>
              <Select onValueChange={(value) => setSelectedRole(value)}>
                <SelectTrigger className='items-start [&_[data-description]]:hidden'>
                  <SelectValue placeholder='Selectionner un role' />
                </SelectTrigger>
                <SelectContent>
                  {roles.map((role, key) => {
                    if (role === "Chef") return;
                    return (
                      <SelectItem
                        key={key}
                        value={role}>
                        {formatTitle(role)}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>

            <Button
              disabled={addMemberIsPending}
              className='w-full'
              onClick={handleAddMember}>
              {addMemberIsPending ? <PulseLoader size={5} /> : "Ajouter"}
            </Button>
          </fieldset>
          <fieldset className='grid gap-4 rounded-lg border p-4'>
            <legend className='-ml-1 px-1 text-sm font-medium'>
              Supprimer un membre
            </legend>
            <Label>Membre</Label>
            <Select onValueChange={(value) => setSelectedMember(value)}>
              <SelectTrigger className='items-start [&_[data-description]]:hidden'>
                <SelectValue placeholder='Selectionner un membre à retirer de votre cuisine' />
              </SelectTrigger>
              <SelectContent>
                {members.map((member, key) => {
                  console.log(member);
                  return (
                    <SelectItem
                      key={key}
                      value={member[1]}>
                      {member[0]}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
            <Button
              disabled={removeMemberIsPending}
              className='w-full'
              onClick={() => handleRemoveMember(selectedMember as string)}>
              {removeMemberIsPending ? <PulseLoader size={5} /> : "Supprimer"}
            </Button>
          </fieldset>
        </fieldset>

        <fieldset className='grid gap-6 rounded-lg border p-4'>
          <legend className='-ml-1 px-1 text-sm font-medium'>
            Gestion des menus
          </legend>
          <fieldset className='grid gap-4 rounded-lg border p-4'>
            <legend className='-ml-1 px-1 text-sm font-medium'>
              Ajouter un menu
            </legend>
            <Label>Vos menus</Label>
            <Select>
              <SelectTrigger className='items-start [&_[data-description]]:hidden'>
                <SelectValue placeholder='Selectionner un menu à partager' />
              </SelectTrigger>
              <SelectContent></SelectContent>
            </Select>
            <Button className='w-full'>Ajouter</Button>
          </fieldset>
          <fieldset className='grid gap-4 rounded-lg border p-4'>
            <legend className='-ml-1 px-1 text-sm font-medium'>
              Supprimer un menu
            </legend>
            <Label>Menus partagés</Label>
            <Select>
              <SelectTrigger className='items-start [&_[data-description]]:hidden'>
                <SelectValue placeholder='Selectionner un menu à retirer du partage' />
              </SelectTrigger>
              <SelectContent></SelectContent>
            </Select>
            <Button className='w-full'>Supprimer</Button>
          </fieldset>
        </fieldset>

        <fieldset className='grid gap-6 rounded-lg border p-4'>
          <legend className='-ml-1 px-1 text-sm font-medium'>
            Gestion des contacts
          </legend>
          <fieldset className='grid gap-4 rounded-lg border p-4'>
            <legend className='-ml-1 px-1 text-sm font-medium'>
              Ajouter un contact
            </legend>
            <Label>Vos contacts</Label>
            <Select>
              <SelectTrigger className='items-start [&_[data-description]]:hidden'>
                <SelectValue placeholder='Selectionner un menu à partager' />
              </SelectTrigger>
              <SelectContent></SelectContent>
            </Select>
            <Button className='w-full'>Ajouter</Button>
          </fieldset>
          <fieldset className='grid gap-4 rounded-lg border p-4'>
            <legend className='-ml-1 px-1 text-sm font-medium'>
              Supprimer un contact
            </legend>
            <Label>Contacts partagés</Label>
            <Select>
              <SelectTrigger className='items-start [&_[data-description]]:hidden'>
                <SelectValue placeholder='Selectionner un menu à retirer du partage' />
              </SelectTrigger>
              <SelectContent></SelectContent>
            </Select>
            <Button className='w-full'>Supprimer</Button>
          </fieldset>
        </fieldset>
      </div>
    </ScrollArea>
  );
}
