import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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
  async function handleCreateIngredient(formData: FormData) {
    "use server";
  }

  return (
    <>
      <Card className='w-[350px] h-[450px] grid place-content-center'>
        <CardContent>
          <CardHeader>Create Ingredient</CardHeader>
          <form
            action={handleCreateIngredient}
            className='grid gap-2'>
            <input
              type='text'
              name='userId'
              id='userId'
              placeholder='Enter userId'
            />
            <input
              type='text'
              name='kitchenId'
              id='kitchenId'
              placeholder='Enter kitchenId'
            />
            <Button type='submit'>Link</Button>
          </form>
        </CardContent>
      </Card>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Categorie</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Origine</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Unit</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row: any) => (
            <TableRow
              key={row.id}
              className='flex flex-row'>
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
