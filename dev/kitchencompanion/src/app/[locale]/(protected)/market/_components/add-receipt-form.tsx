import processReceipt from "@/app/[locale]/(public)/test/upload/_action/process-receipt";
import { AlertDialogCancel } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useSelectedSupplier } from "@/hooks/useSelectedSupplier";

export function AddReceiptForm() {
  const { isOther, setSupplier } = useSelectedSupplier();

  return (
    <form
      className='flex flex-col space-y-2 w-[80%] mx-auto'
      action={processReceipt}>
      <Input
        type='file'
        name='file'
        accept='image/*, application/pdf'
      />
      <div className='flex gap-4'>
        <Select
          name={!isOther ? "supplier" : ""}
          onValueChange={(e) => setSupplier(e as string)}>
          <SelectTrigger className='w-[300px]'>
            <SelectValue placeholder='Fournisseur' />
          </SelectTrigger>
          <SelectContent className='w-[170px]'>
            <SelectItem value='hector_larivee'>Hector Larivée</SelectItem>
            <SelectItem value='birri'>Birri</SelectItem>
            <SelectItem value='distribution_alsa'>Distribution Alsa</SelectItem>
            <SelectItem value='Pmaison_du_roti'>Maison du rôti</SelectItem>
            <SelectItem value='marc_mushroom'>Marc's Mushroom</SelectItem>
            <SelectItem value='la_fermette'>La Fermette</SelectItem>
            <SelectItem value='krinos'>Krinos</SelectItem>
            <SelectItem value='bruno_nick'>Bruno & Nick</SelectItem>
            <SelectItem value='macchi_inc'>Macchi Inc</SelectItem>
            <SelectItem value='au_terroir'>Au Terroir</SelectItem>
            <SelectItem value='other'>Autre</SelectItem>
          </SelectContent>
        </Select>

        {isOther && (
          <Input
            type='text'
            name='supplier'
            placeholder='Nom du fournisseur'
          />
        )}
      </div>
      {isOther && (
        <Textarea
          className='h-[10rem]'
          placeholder="Entrez un prompt sur mesure pour votre reçu. Si votre fournisseur n'est pas dans la liste."
        />
      )}

      <div className='flex gap-2 self-end'>
        <AlertDialogCancel>Quitter</AlertDialogCancel>
        <Button type='submit'>Téléverser</Button>
      </div>
    </form>
  );
}
