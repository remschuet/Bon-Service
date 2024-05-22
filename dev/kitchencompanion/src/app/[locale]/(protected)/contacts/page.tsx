"use client";

import { useRedirectMembers } from "@/hooks/useRedirectMembers";

import { AddContact } from "@/app/[locale]/(protected)/contacts/_components/add-contact";
import { ContactList } from "@/app/[locale]/(protected)/contacts/_components/contact-list";
import { ContactProvider } from "@/providers/contact";
import { KitchensProvider } from "@/providers/kitchens";

export default function ContactPage() {
  useRedirectMembers();

  return (
    <div className='container mx-auto'>
      <ContactProvider>
        <KitchensProvider>
          <div className='flex gap-5 justify-end mt-6'>
            <AddContact />
          </div>
          <ContactList />
        </KitchensProvider>
      </ContactProvider>
    </div>
  );
}
