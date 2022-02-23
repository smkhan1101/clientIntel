import {Option} from "./option";

export interface Field {
  id: number;
  name: string;
  type: string;
  answer_type: string;
  required: boolean;
  weight: number;
  options: Option[];
}
