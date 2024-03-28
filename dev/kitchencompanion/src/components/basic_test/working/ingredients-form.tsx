import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { actionCreateIngredient } from "@/app/[locale]/(public)/test/ingredient/_action/ingredient-action";
import { Ingredient, UnitMeasure } from "@prisma/client";

const data = [
  {
    id: "ABS1",
    category: "Fromage",
    name: "Bleu",
    origin: "QC",
    price: 15.99,
    quantity: 4,
    unit: "LB",
  },
  {
    id: "ABS2",
    category: "Fromage",
    name: "Bleu",
    origin: "QC",
    price: 15.99,
    quantity: 4,
    unit: "LB",
  },
  {
    id: "ABS3",
    category: "Fromage",
    name: "Bleu",
    origin: "QC",
    price: 15.99,
    quantity: 4,
    unit: "LB",
  },
];

export function IngredientForm() {
  // const [isPending, startTransition] = useTransition();

  async function handleCreateIngredient(formData: FormData) {
    const ingredient = {
      name: formData.get("name") as string,
      price: parseInt(formData.get("price") as string),
      unit: formData.get("measure") as string as UnitMeasure,
      category: formData.get("categorie") as string,
      origin: formData.get("origin") as string,
      supplierName: formData.get("supplierName") as string,
      userId: formData.get("userId") as string,
    };

    await actionCreateIngredient(ingredient as Ingredient);
  }

  return (
    <>
      <Card className="w-[350px] h-[450px] grid place-content-center">
        <CardHeader>Create Ingredient</CardHeader>
        <CardContent>
          <form action={handleCreateIngredient} className="grid gap-2">
            <input
              type="text"
              name="userId"
              id="userId"
              placeholder="Enter userId"
            />
            <input type="text" name="name" id="name" placeholder="Enter name" />
            <input
              type="text"
              name="price"
              id="price"
              placeholder="Enter price (INT)"
            />
            <input
              type="text"
              name="measure"
              id="measure"
              placeholder="Enter measure"
            />
            <input
              type="text"
              name="supplierName"
              id="supplierName"
              placeholder="Enter supplierName"
            />
            <input
              type="text"
              name="categorie"
              id="categorie"
              placeholder="Enter categorie"
            />
            <input
              type="text"
              name="origin"
              id="origin"
              placeholder="Enter origin"
            />
            <input
              type="text"
              name="quantite"
              id="quantite"
              placeholder="Enter quantité"
            />
            <Button type="submit">Create ingredient</Button>
          </form>
        </CardContent>
      </Card>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Categorie</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Origine</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Unit</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, key) => (
            <TableRow key={key}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.category}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.origin}</TableCell>
              <TableCell>{row.price}</TableCell>
              <TableCell>{row.quantity}</TableCell>
              <TableCell>{row.unit}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
