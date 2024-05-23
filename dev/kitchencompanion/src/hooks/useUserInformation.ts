import { useEffect, useState } from "react";
import { useSession } from "./useSession";
import { UserInformation } from "@/lib/type";
import { getCurrentUser } from "@/hooks/_action/action";

export function useUserInformation() {
  const { email } = useSession();
  const [userInformation, setUserInformation] = useState<UserInformation>(
    {} as UserInformation
  );

  useEffect(() => {
    const fetchUserInformation = async () => {
      try {
        const user = await getCurrentUser(email);
        if (user) {
          setUserInformation({
            name: user.name as string,
            phone: user.phone,
            address: user.address,
            avatar_key: user.avatar_key,
          } as UserInformation);
        }
      } catch (error) {
        console.error(
          "Error useUserInformation: fetchUserInformation(), error: ",
          error
        );
      }
    };

    fetchUserInformation();
  }, [email]);

  return { userInformation };
}
