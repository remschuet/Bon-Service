import { ColumnDef } from "@tanstack/react-table";
import { Ingredient } from "@prisma/client";

import { ArrowUpDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

import { Button } from "@/components/ui/button";

export const columns: ColumnDef<Ingredient>[] = [
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
          Name
          <ArrowUpDown className='ml-2 h-4 w-4 opacity-50' />
        </Button>
      );
    },
  },
  {
    accessorKey: "supplierName",
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Supplier
          <ArrowUpDown className='ml-2 h-4 w-4 opacity-50' />
        </Button>
      );
    },
  },
  {
    accessorKey: "category",
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Category
          <ArrowUpDown className='ml-2 h-4 w-4 opacity-50' />
        </Button>
      );
    },
  },
  {
    accessorKey: "origin",
    header: "Origin",
  },
  {
    accessorKey: "price",
    header: () => <div className='w-[25px]'>Price</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("price"));
      const formatted = new Intl.NumberFormat("en-CA", {
        style: "currency",
        currency: "CAD",
      }).format(amount);

      return <div className='w-[25px] font-medium'>{formatted}</div>;
    },
  },
  {
    accessorKey: "unit",
    header: () => <div className='w-[25px]'>Unit</div>,
  },
];
