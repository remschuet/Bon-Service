import { Button } from "@/components/ui/button";
import {
  updateUserFacturation,
  updateToAdmin,
  updateProfilUser,
} from "../_action/settings-action";
import { useSession } from "@/hooks/useSession";
import { createPdfPDF } from "../_export/pdfMain-contact";
import jsPDF from "jspdf";

export function Test() {
  const { id, email, name, userType, isPremium } = useSession();

  async function createPdf(formData: FormData) {
    await createPdfPDF(id);
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
      <form action={createPdf}>
        <Button type="submit">Create PDF</Button>
      </form>{" "}
      {facturactionContent}
      {adminModeContent}
    </>
  );
}
