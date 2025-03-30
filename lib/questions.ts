type Question = {
  id: number;
  text: string;
  options: { id: string; text: string }[];
  correctAnswer: string;
};

export const questions: Question[] = [
  {
    id: 1,
    text: 'Qual é a capital da Itália?',
    options: [
      { id: 'a', text: 'Roma' },
      { id: 'b', text: 'Paris' },
      { id: 'c', text: 'Lisboa' },
      { id: 'd', text: 'Londres' },
    ],
    correctAnswer: 'a',
  },
  {
    id: 2,
    text: 'Qual é o maior oceano do mundo?',
    options: [
      { id: 'a', text: 'Atlântico' },
      { id: 'b', text: 'Índico' },
      { id: 'c', text: 'Pacífico' },
      { id: 'd', text: 'Ártico' },
    ],
    correctAnswer: 'c',
  },
  {
    id: 3,
    text: 'Qual é o símbolo químico do ouro?',
    options: [
      { id: 'a', text: 'Ag' },
      { id: 'b', text: 'Au' },
      { id: 'c', text: 'Fe' },
      { id: 'd', text: 'Cu' },
    ],
    correctAnswer: 'b',
  },
];