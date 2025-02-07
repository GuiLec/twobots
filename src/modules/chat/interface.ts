import { Bots } from "@/modules/bot/interface";

export interface ChatMessage {
  text: string;
  user: Bots;
}
