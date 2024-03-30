"use server";

import {
  createNotification,
  getNotifications,
} from "@/db/data-access/notifications";
import { NotifTypes, Notification } from "@prisma/client";
import { get } from "http";

export default async function processReceipt(formData: FormData) {
  const headers = new Headers();
  headers.append("X-App-Name", "bonservice");
  headers.append("X-Api-Key", process.env.RECEIPT_EXTRACTOR_API_KEY as string);
  headers.append("X-Supplier", formData.get("supplier") as string);

  const userId = formData.get("userId") as string;

  try {
    const response = await fetch("http://127.0.0.1:5000/api/process-receipts", {
      method: "POST",
      headers: headers,
      body: formData,
    });

    if (response.ok) {
      const data = await response.json();

      if (data.error) {
        return {
          error: "Une erreur est survenue lors de la réception de votre reçu.",
          status: 400,
        };
      }

      const notif = {
        content: JSON.stringify(data) as string,
        type: "OPENAI_RETURN" as NotifTypes,
        userId: userId as string,
      };

      createNotification(notif as Notification);

      return {
        success: "Votre reçu a été transmis avec succès.",
        status: 200,
      };
    } else {
      return {
        error: "Une erreur est survenue lors de la transmission de votre reçu.",
        status: 400,
      };
    }
  } catch (error) {
    return {
      error: "Une erreur est survenue lors de la transmission de votre reçu.",
      status: 400,
    };
  }
}

export async function getAllNotifications(userId: string) {
  return await getNotifications(userId);
}
