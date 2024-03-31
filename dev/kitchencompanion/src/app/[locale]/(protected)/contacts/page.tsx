"use client";

import { useRedirectMembers } from "@/hooks/useRedirectMembers";

import { AddContact } from "@/app/[locale]/(protected)/contacts/_components/add-contact";
import { ContactList } from "@/app/[locale]/(protected)/contacts/_components/contact-list";

export default function ContactPage() {
  useRedirectMembers();

  return (
    <div className='container mx-auto pt-10'>
      <div className='space-y-5'></div>
      <div className='flex gap-5 justify-end mt-6'>
        <AddContact />
      </div>
      <ContactList />
    </div>
  );
}
