import { Result } from "./result";
import { Option } from "./option";

interface BotMessage {
  id: string;
  type: "bot";
  content: string;
}

interface UserMessage {
  id: string;
  type: "user";
  content: string;
}

interface OptionsMessage {
  id: string;
  type: "options";
  content: Option[];
  questionId: number;
}

interface ResultsMessage {
  id: string;
  type: "results";
  content: { results: Result[]; score: number };
}

export type Message = BotMessage | UserMessage | OptionsMessage | ResultsMessage;