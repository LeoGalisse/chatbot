import { Period } from './period';

export interface Professor {
  nomeDoProfessor: string;
  horarioDeAtendimento: string;
  periodo: Period;
  sala: string;
  predio: string[];
}