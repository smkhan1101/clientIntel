import {Section} from "./section";

export interface Questionnaire {
  id: number;
  name: string;
  description: string;
  sections: Section[];
}
