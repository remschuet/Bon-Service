"use server";

import { updateAvatarKey } from "@/db/data-access/user";

import { getImageFromS3, uploadImageToS3 } from "@/db/data-access/media";

export async function uploadImage(form: FormData) {
  try {
    const userId = form.get("userId") as string | null;
    const file = form.get("image") as File | null;

    if (!file) {
      return;
    }

    const image = await file.arrayBuffer();
    const buffer = Buffer.from(image);

    const imageKey = crypto.randomUUID();

    await uploadImageToS3(buffer, imageKey);
    await updateAvatarKey(userId as string, imageKey);

    const getImage = await getImageFromS3(imageKey);
    console.log("value:", getImage);
  } catch (error) {
    console.error("Error uploadImage(), error: ", error);
  }
}
