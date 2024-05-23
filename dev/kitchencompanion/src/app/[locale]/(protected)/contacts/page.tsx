"use client";

import { useRedirectMembers } from "@/hooks/useRedirectMembers";

import { ContactList } from "@/app/[locale]/(protected)/contacts/_components/contact-list";
import { ContactProvider } from "@/providers/contact";
import { KitchensProvider } from "@/providers/kitchens";
import { ExportContact } from "@/app/[locale]/(protected)/contacts/_components/export-contact";
import { AddDialogue } from "@/components/add-dialogue";
import { AddContactForm } from "@/app/[locale]/(protected)/contacts/_components/add-contact-form";
export default function ContactPage() {
  useRedirectMembers();

  return (
    <div className='container mx-auto'>
      <ContactProvider>
        <KitchensProvider>
          <div className='flex gap-5 justify-end mt-6'>
            <AddDialogue
              buttonText='Ajouter un contact'
              title='Ajouter un contact'
              description="Vous pouvez le lier avec l'une ou plusieurs de vos cuisines
              existante directement si vous le souhaitez.">
              <AddContactForm />
            </AddDialogue>
            <ExportContact />
          </div>
          <ContactList />
        </KitchensProvider>
      </ContactProvider>
    </div>
  );
}
