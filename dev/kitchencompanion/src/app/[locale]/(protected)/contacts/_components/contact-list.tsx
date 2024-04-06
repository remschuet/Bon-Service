"use client";

import { useContacts } from "@/hooks/useContacts";
import { Datatable } from "@/components/datatable";
import { columns } from "@/app/[locale]/(protected)/contacts/_components/datatable/contacts-columns";

export function ContactList() {
  const { contacts } = useContacts();

  return (
    <Datatable
      data={contacts}
      columns={columns}
    />
  );
}
