import { BLANK_PDF, Template } from "@pdfme/common";

export const inputs: { [key: string]: string }[] = [
  { a: "a1", b: "b1", c: "c1" },
];

export const templateTable: Template = {
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
