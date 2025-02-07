import { Bot, Bots } from "@/modules/bot/interface";

export const bots: Record<Bots, Bot> = {
  [Bots.Bot1]: { name: "Purple Bot", personality: "", mood: "" },
  [Bots.Bot2]: { name: "Cyan Bot", personality: "", mood: "" },
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

export const moodOptions = [
  { value: "", label: "" },
  {
    value: "happy",
    label: "Happy",
  },
  {
    value: "sad",
    label: "Sad",
  },
  {
    value: "angry",
    label: "Angry",
  },
  {
    value: "excited",
    label: "Excited",
  },
  {
    value: "bored",
    label: "Bored",
  },
];
