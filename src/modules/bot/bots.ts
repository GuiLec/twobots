import { Bot, Bots } from "@/modules/bot/interface";

export const bots: Record<Bots, Bot> = {
  [Bots.Bot1]: { name: "Purple Bot" },
  [Bots.Bot2]: { name: "Cyan Bot" },
};
