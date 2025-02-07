import { Bot, Bots } from "@/modules/bot/interface";

export const bots: Record<Bots, Bot> = {
  [Bots.Bot1]: {
    name: "Purple Bot",
    personality: "",
    mood: "",
    somethingToKnowAbout: "",
  },
  [Bots.Bot2]: {
    name: "Cyan Bot",
    personality: "",
    mood: "",
    somethingToKnowAbout: "",
  },
};
export const personalityOptions = [
  { value: "", key: "personalityOptions.empty" },
  {
    value: "funny",
    key: "personalityOptions.funny",
  },
  {
    value: "serious",
    key: "personalityOptions.serious",
  },
  {
    value: "exentric",
    key: "personalityOptions.exentric",
  },
  {
    value: "crazy",
    key: "personalityOptions.crazy",
  },
  {
    value: "optimistic",
    key: "personalityOptions.optimistic",
  },
  {
    value: "pessimistic",
    key: "personalityOptions.pessimistic",
  },
];

export const moodOptions = [
  { value: "", key: "moodOptions.empty" },
  {
    value: "happy",
    key: "moodOptions.happy",
  },
  {
    value: "sad",
    key: "moodOptions.sad",
  },
  {
    value: "angry",
    key: "moodOptions.angry",
  },
  {
    value: "excited",
    key: "moodOptions.excited",
  },
  {
    value: "bored",
    key: "moodOptions.bored",
  },
];
