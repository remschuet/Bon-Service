import { Notification } from "@prisma/client";
import { useEffect, useState } from "react";
import { useSession } from "@/hooks/useSession";
import { getAllNotifications } from "@/app/[locale]/(protected)/market/_action/process-receipt-action";

export function useNotification() {
  const { id } = useSession();
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      const data = await getAllNotifications(id);

      setNotifications(data);
    };

    fetchNotifications();
  }, []);

  return { notifications };
}
