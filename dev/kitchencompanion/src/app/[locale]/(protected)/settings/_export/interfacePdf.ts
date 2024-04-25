/* ALL THE INTERFACE FOR PDF*/

export interface Column {
  type: "text";
  position: { x: number; y: number };
  width: number;
  height: number;
  content?: string;
}

export interface Schema {
  [key: string]: Column;
}

export interface InputData {
  [key: string]: string;
}
