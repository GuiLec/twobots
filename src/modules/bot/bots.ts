import { Bot, Bots } from "@/modules/bot/interface";

export const bots: Record<Bots, Bot> = {
  [Bots.Bot1]: { name: "Purple Bot", personality: "" },
  [Bots.Bot2]: { name: "Cyan Bot", personality: "" },
};

export const personalityOptions = [
  { value: "", label: "" },
  {
    value: "friendly",
    label: "Friendly",
  },
  {
    value: "serious",
    label: "Serious",
  },
  {
    value: "funny",
    label: "Funny",
  },
  {
    value: "analytical",
    label: "Analytical",
  },
  {
    value: "creative",
    label: "Creative",
  },
];
