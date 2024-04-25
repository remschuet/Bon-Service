import { Template, BLANK_PDF } from "@pdfme/common";
import { generate } from "@pdfme/generator";
import { Contact } from "@prisma/client";

const contacts: Contact[] = [
  {
    id: "123",
    userId: "123",
    name: "Remi 1",
    description: "blabla",
    phoneNumber: "123",
    compteNumber: "123",
  },
  {
    id: "12344",
    userId: "123",
    name: "Julien 2",
    description: "blabla",
    phoneNumber: "123",
    compteNumber: "123",
  },
  {
    id: "12355",
    userId: "123",
    name: "Bob 3",
    description: "blabla",
    phoneNumber: "123",
    compteNumber: "123",
  },
];

const template: Template = {
  basePdf: BLANK_PDF,
  schemas: [
    {
      a: {
        type: "text",
        position: { x: 0, y: 0 },
        width: 10,
        height: 10,
      },
      b: {
        type: "text",
        position: { x: 10, y: 10 },
        width: 10,
        height: 10,
      },
      c: {
        type: "text",
        content: "coucou",
        position: { x: 20, y: 20 },
        width: 10,
        height: 10,
      },
    },
  ],
};

const inputs: { [key: string]: string }[] = [{ a: "a1", b: "b1", c: "c1" }];

async function updateTemplate() {
  let pos_x = 30;

  contacts.forEach((contact) => {
    pos_x += 10;
    console.log(contact.name);

    // Pour ajouter une nouvelle colonne 'd', par exemple
    const newColumn = {
      [contact.id]: {
        type: "text",
        position: { x: 30, y: pos_x },
        width: 10,
        height: 10,
      },
    };

    // Insérer la nouvelle colonne dans le schéma existant
    template.schemas[0] = { ...template.schemas[0], ...newColumn };
    inputs[0][contact.id] = contact.name;
  });

  console.log("fin generate");
}

export async function createPdfPDF() {
  console.log("Creating PDF");
  await updateTemplate();
  console.log("call generate");
  console.log(template.schemas);
  generate({ template, inputs }).then((pdf) => {
    console.log(pdf);

    // Browser
    const blob = new Blob([pdf.buffer], { type: "application/pdf" });
    window.open(URL.createObjectURL(blob));

    // Browser
    // const blob = new Blob([pdf.buffer], { type: 'application/pdf' });
    // window.open(URL.createObjectURL(blob));

    // Node.js
    // fs.writeFileSync(path.join(__dirname, `test.pdf`), pdf);
  });
}
