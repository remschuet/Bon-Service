"use server";

import { updateAvatarKey } from "@/db/data-access/user";

import { getImageFromS3, uploadImageToS3 } from "@/db/data-access/media";

export async function uploadImage(form: FormData) {
  try {
    const userId = form.get("userId");
    const imageEntry = form.get("image") as string;
    const imageKey = crypto.randomUUID();

    const buffer = Buffer.from(imageEntry.toString(), "utf-8");

    await uploadImageToS3(buffer, imageKey);
    await updateAvatarKey(userId as string, imageKey);
    console.log("upload terminé");

    const getImage = await getImageFromS3(imageKey);
    console.log("value:", getImage);
  } catch (error) {
    console.error("Error uploadImage(), error: ", error);
  }
}
