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
  { value: "", label: "" },
  {
    value: "funny",
    label: "🤡 Funny",
  },
  {
    value: "serious",
    label: "😐 Serious",
  },
  {
    value: "exentric",
    label: "🥸 Exentric",
  },
  {
    value: "crazy",
    label: "🤪 Crazy",
  },
  {
    value: "optimistic",
    label: "🤗 Optimistic",
  },
  {
    value: "pessimistic",
    label: "🫣 Pessimistic",
  },
];

export const moodOptions = [
  { value: "", label: "" },
  {
    value: "happy",
    label: "😊 Happy",
  },
  {
    value: "sad",
    label: "😞 Sad",
  },
  {
    value: "angry",
    label: "😡 Angry",
  },
  {
    value: "excited",
    label: "🥳 Excited",
  },
  {
    value: "bored",
    label: "😒 Bored",
  },
];
