// Utilisation d'enum pour OrientationPDF
export enum OrientationPDF {
  Portrait = "portrait",
  Landscape = "landscape",
}
export enum UnitPDF {
  mm = "mm",
  cm = "cm",
  in = "in",
  px = "px",
}

export type Position = {
  x: number;
  y: number;
};

export type TableDataType = { [key: string]: string };

export type RGBColor = [number, number, number];

export type Coordinates = {
  start: { x: number; y: number };
  end: { x: number; y: number };
};
export interface Section {
  [key: string]: Coordinates;
}
