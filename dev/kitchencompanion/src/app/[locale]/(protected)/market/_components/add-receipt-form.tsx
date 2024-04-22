import processReceipt from "@/app/[locale]/(protected)/market/_action/process-receipt-action";
import { DialogClose } from "@/components/ui/dialog";
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
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { useSelectedSupplier } from "@/hooks/useSelectedSupplier";
import { useSession } from "@/hooks/useSession";
import { useTransition } from "react";
import { PulseLoader } from "react-spinners";

export function AddReceiptForm() {
  const { isOther, setSupplier } = useSelectedSupplier();
  const { id } = useSession();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  function handleReceipt(formData: FormData) {
    formData.append("userId", id);
    try {
      startTransition(() => {
        processReceipt(formData);

        toast({
          title: "Reçu téléversé",
          description: "Votre reçu a été téléversé avec succès.",
          action: (
            <ToastAction altText="Process the receipt">Fermer</ToastAction>
          ),
        });
      });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <form
      className="flex flex-col w-[80%] space-y-2 mx-auto"
      action={handleReceipt}
    >
      <Input type="file" name="file" accept="image/*, application/pdf" />
      <div className="flex gap-4">
        <Select
          name={!isOther ? "supplier" : ""}
          onValueChange={(e) => setSupplier(e as string)}
        >
          <SelectTrigger className="w-[300px]">
            <SelectValue placeholder="Fournisseur" />
          </SelectTrigger>
          <SelectContent className="w-[170px]">
            <SelectItem value="hector_larivee">Hector Larivée</SelectItem>
            <SelectItem value="birri">Birri</SelectItem>
            <SelectItem value="distribution_alsa">Distribution Alsa</SelectItem>
            <SelectItem value="maison_du_roti">Maison du rôti</SelectItem>
            <SelectItem value="marc_mushroom">Marc's Mushroom</SelectItem>
            <SelectItem value="la_fermette">La Fermette</SelectItem>
            <SelectItem value="krinos">Krinos</SelectItem>
            <SelectItem value="bruno_nick">Bruno & Nick</SelectItem>
            <SelectItem value="macchi_inc">Macchi Inc</SelectItem>
            <SelectItem value="au_terroir">Au Terroir</SelectItem>
            <SelectItem value="other">Autre</SelectItem>
          </SelectContent>
        </Select>

        {isOther && (
          <Input type="text" name="supplier" placeholder="Nom du fournisseur" />
        )}
      </div>
      {isOther && (
        <Textarea
          className="h-[10rem]"
          placeholder="Entrez un prompt sur mesure pour votre reçu. Si votre fournisseur n'est pas dans la liste."
        />
      )}

      <div className="flex gap-2 self-end pt-3">
        <DialogClose asChild>
          <Button type="button" variant="outline">
            Quitter
          </Button>
        </DialogClose>
        <Button type="submit" disabled={isPending}>
          {isPending ? <PulseLoader size={5} /> : "Ajouter"}
        </Button>
      </div>
    </form>
  );
}
