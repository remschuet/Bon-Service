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
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
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
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nom
          <ArrowUpDown className="ml-2 h-4 w-4 opacity-50" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <Link
          href={`/recipes/books/${(row.getValue("name") as string).replace(
            " ",
            "%20"
          )}?recipeId=${row.original.id}`}
          className="font-bold hover:text-brand-dark"
        >
          {row.getValue("name")}
        </Link>
      );
    },
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      return <div className="w-[450px]">{row.getValue("description")}</div>;
    },
  },
  {
    accessorKey: "updatedAt",
    header: () => <div className="w-[120px">Modifications</div>,
    cell: ({ row }) => {
      const date = new Date(row.getValue("updatedAt"));
      const formatted = new Intl.DateTimeFormat("fr-CA", {
        dateStyle: "long",
      }).format(date);

      return <div className="w-[120px]">{formatted}</div>;
    },
  },
  {
    accessorKey: "cost",
    header: () => <div className="text-right mr-2">Rendement</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("cost"));
      const formatted = new Intl.NumberFormat("en-CA", {
        style: "currency",
        currency: "CAD",
      }).format(amount);

      return (
        <div className="mr-2 font-medium text-right">{`${formatted} / ${row.original.unit}`}</div>
      );
    },
  },
];
