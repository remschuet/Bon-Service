import { Button } from "@/components/ui/button";
import {
  updateUserFacturation,
  updateToAdmin,
  updateProfilUser,
} from "../_action/settings-action";
import { useSession } from "@/hooks/useSession";
import { createPdfPDF } from "../_export/pdf-contact-export";
import { exportCreatePdfRecipe } from "../_export/pdf-recipe-export";
import { uploadImage } from "../_action/settings-image-action";
import { exportCreatePdfIngredient } from "../_export/pdf-ingredient-export";
export function Test() {
  const { id, email, name, userType, isPremium } = useSession();

  async function processImage(formData: FormData) {
    try {
      formData.append("userId", id);
      uploadImage(formData);
    } catch (error) {
      console.error("Error processing image:", error);
      throw error;
    }
  }

  // Fonction utilitaire pour convertir un objet File en buffer
  function readFileAsBuffer(file: File): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (event) => {
        if (event.target && event.target.result) {
          const buffer = Buffer.from(event.target.result as ArrayBuffer);
          resolve(buffer);
        } else {
          reject(new Error("Error reading file"));
        }
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsArrayBuffer(file); // Convertit le contenu du fichier en ArrayBuffer
    });
  }

  async function createPdfContact(formData: FormData) {
    await createPdfPDF(id);
  }

  async function createPdfIngredient(formData: FormData) {
    await exportCreatePdfIngredient(id);
  }

  async function createPdfRecipe(formData: FormData) {
    formData.append("userId", id);
    await exportCreatePdfRecipe(formData);
  }

  async function updateFacturation(formData: FormData) {
    formData.append("userId", id);
    if (!isPremium) {
      formData.append("facturation", "PREMIUM");
    }
    console.log(await updateUserFacturation(formData));
  }

  async function updateAdminMode() {
    console.log(await updateToAdmin(id));
  }

  async function updateProfil(formData: FormData) {
    formData.append("userId", id);
    console.log(await updateProfilUser(formData));
  }

  let adminModeContent = undefined;
  let facturactionContent = undefined;

  if (isPremium) {
    facturactionContent = (
      <>
        <form action={updateFacturation}>
          <div>
            <p>Bon Service Pro</p>
          </div>
          <Button type="submit">Quitter le mode Pro</Button>
        </form>
      </>
    );
  } else {
    facturactionContent = (
      <>
        <form action={updateFacturation}>
          <div>
            <p>Bon Service Pro</p>
          </div>
          <Button type="submit">Devenir Pro</Button>
        </form>
      </>
    );
  }

  if (userType === "MEMBER") {
    adminModeContent = (
      <>
        <p>Update To admin Mode</p>
        <form action={updateAdminMode}>
          <Button type="submit">Admin Mode</Button>
        </form>
      </>
    );
  } else {
    adminModeContent = (
      <>
        <p>Vous êtes deja administrateur.</p>
        <form action={updateAdminMode}>
          <Button type="submit" disabled>
            Admin Mode
          </Button>
        </form>
      </>
    );
  }
  return (
    <>
      <form action={createPdfContact}>
        <Button type="submit">Create PDF contacts</Button>
      </form>
      <form action={createPdfIngredient}>
        <Button type="submit">Create PDF ingredient</Button>
      </form>
      <form action={createPdfRecipe}>
        <Button type="submit">Create PDF recipes</Button>
      </form>{" "}
      {facturactionContent}
      {adminModeContent}
      <form action={processImage}>
        <input
          type="file"
          name="image"
          id="image"
          accept="image/jpeg, image/png"
        />
        <Button type="submit">Upload</Button>
      </form>
    </>
  );
}
