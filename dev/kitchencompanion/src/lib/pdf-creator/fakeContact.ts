import { Contact } from "@prisma/client";

export const contacts: Contact[] = [
  {
    id: "123",
    userId: "u_123",
    name: "Remi Chuet",
    description:
      "Frigoriste, appeler si problème important avec les frigo en haut et en bas.",
    phoneNumber: "123 123 1221",
    compteNumber: "111",
  },
  {
    id: "12344",
    userId: "u_1234",
    name: "Julien C-M",
    description:
      "Chef, appeler en cas d urgence sir problemes dans la cuisines ou si fuite d eau importante. Peut etre appelé pour plusieurs choses.",
    phoneNumber: "123 123 1111",
    compteNumber: "222",
  },
  {
    id: "12355",
    userId: "u_1236",
    name: "Martin le nom tres long",
    description: "Cuisiner de support pour la cuisine.",
    phoneNumber: "234 234 2222",
    compteNumber: "333",
  },
];
