import { SupplierSupported } from "@prisma/client";
import { dev_createManySupplierSupported, dev_removeAllSupplierSupported } from "./supplier";


/*
* Permet de creer les supplier supported avec leur prompt
* Appel venant du dev, une seul fois !!
 */
export async function actionCreateSupplierSupported() {
  let supplierSupportedList: SupplierSupported[] = [];

  const Hector = {
    name: "Hector Larivée",
    prompt: "OPEN IA",
    phoneNumber: "111-111-1111",
    description: "Supper fournisseur 10/10",
    isPublic: true,
  } as SupplierSupported;

  const JulienDev = {
    name: "Julien Dev",
    prompt: "OPEN IA",
    phoneNumber: "111-111-1111",
    description: "Supper fournisseur 10/10",
    isPublic: false,
  } as SupplierSupported;

  supplierSupportedList.push(Hector);
  supplierSupportedList.push(JulienDev);

  dev_createManySupplierSupported(supplierSupportedList);
}

/*remove supplier supported*/
export async function actionRemoveSupplierSupported() {
  dev_removeAllSupplierSupported();
}