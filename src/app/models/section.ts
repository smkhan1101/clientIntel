import {Field} from "./field";

export interface Section {
  id: number;
  name: string;
  description: string;
  weight: number;
  fields: Field[];
}
