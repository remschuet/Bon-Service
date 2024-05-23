import { Button } from "@/components/ui/button";
import {
  updateUserFacturation,
  updateToAdmin,
  updateProfilUser,
} from "../_action/settings-action";
import { useSession } from "@/hooks/useSession";
import { uploadImage } from "../_action/settings-image-action";
export function Test() {
  const { id, userType, isPremium } = useSession();

  async function processImage(formData: FormData) {
    try {
      formData.append("userId", id);
      uploadImage(formData);
    } catch (error) {
      console.error("Error processing image:", error);
      throw error;
    }
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
          <Button type='submit'>Quitter le mode Pro</Button>
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
          <Button type='submit'>Devenir Pro</Button>
        </form>
      </>
    );
  }

  if (userType === "MEMBER") {
    adminModeContent = (
      <>
        <p>Update To admin Mode</p>
        <form action={updateAdminMode}>
          <Button type='submit'>Admin Mode</Button>
        </form>
      </>
    );
  } else {
    adminModeContent = (
      <>
        <p>Vous êtes deja administrateur.</p>
        <form action={updateAdminMode}>
          <Button
            type='submit'
            disabled>
            Admin Mode
          </Button>
        </form>
      </>
    );
  }
  return (
    <>
      {facturactionContent}
      {adminModeContent}
      <form action={processImage}>
        <input
          type='file'
          name='image'
          id='image'
          accept='image/jpeg, image/png'
        />
        <Button type='submit'>Upload</Button>
      </form>
    </>
  );
}
