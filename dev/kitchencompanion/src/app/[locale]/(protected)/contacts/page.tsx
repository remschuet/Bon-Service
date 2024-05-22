"use client";

import { useRedirectMembers } from "@/hooks/useRedirectMembers";

import { AddContact } from "@/app/[locale]/(protected)/contacts/_components/add-contact";
import { ContactList } from "@/app/[locale]/(protected)/contacts/_components/contact-list";
import { ContactProvider } from "@/providers/contact";
import { KitchensProvider } from "@/providers/kitchens";
import { Button } from "@/components/ui/button";
import { ExportContact } from "@/app/[locale]/(protected)/contacts/_components/export-contact";
export default function ContactPage() {
  useRedirectMembers();

  return (
    <div className="container mx-auto">
      <ContactProvider>
        <KitchensProvider>
          <div className="flex gap-5 justify-end mt-6">
            <AddContact />
            <ExportContact />
          </div>
          <ContactList />
        </KitchensProvider>
      </ContactProvider>
    </div>
  );
}
