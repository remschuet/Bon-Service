import { ColumnDef } from "@tanstack/react-table";
import { Contact } from "@prisma/client";

import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

import { ArrowUpDown } from "lucide-react";

export const columns: ColumnDef<Contact>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Nom
          <ArrowUpDown className='ml-2 h-4 w-4 opacity-50' />
        </Button>
      );
    },
  },
  {
    accessorKey: "compteNumber",
    header: "Numéro de compte",
  },
  {
    accessorKey: "phoneNumber",
    header: "Numéro de téléphone",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
];
