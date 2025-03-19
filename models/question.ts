import { Option } from "./option";

export type Question = {
  id: number;
  text: string;
  options: Option[];
};