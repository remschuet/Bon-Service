import { ColumnDef } from "@tanstack/react-table";
import { Recipe, Unit } from "@prisma/client";

import { ArrowUpDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export const columns: ColumnDef<Recipe>[] = [
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
    cell: ({ row }) => {
      return (
        <Link
          href={`/${(row.getValue("name") as string).replace(
            "",
            "%20"
          )}?recipeId=${row.getValue("id")}`}
          className='font-bold hover:text-brand-dark'>
          {row.getValue("name")}
        </Link>
      );
    },
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      return <div className='w-[280px]'>{row.getValue("description")}</div>;
    },
  },
  {
    accessorKey: "cost",
    header: () => <div className='w-[75px]'>Côut</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("cost"));
      const formatted = new Intl.NumberFormat("en-CA", {
        style: "currency",
        currency: "CAD",
      }).format(amount);

      return <div className='font-medium w-[75px]'>{formatted}</div>;
    },
  },
  {
    accessorKey: "unit",
    header: () => <div>Unité</div>,
    cell: ({ row }) => {
      return <div>{row.getValue("unit")}</div>;
    },
  },
  {
    accessorKey: "updatedAt",
    header: () => <div className='max-w-[120px] text-right'>Modifications</div>,
    cell: ({ row }) => {
      const date = new Date(row.getValue("updatedAt"));
      const formatted = new Intl.DateTimeFormat("fr-CA", {
        dateStyle: "long",
      }).format(date);

      return <div className='max-w-[120px] text-right'>{formatted}</div>;
    },
  },
];
