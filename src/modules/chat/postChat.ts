import { Bot, Bots } from "@/modules/bot/interface";
import { ChatMessage } from "@/modules/chat/interface";
import { instructions } from "@/modules/chat/intructions";

export const postChat = async ({
  chatHistory,
  bot1,
  bot2,
}: {
  chatHistory: ChatMessage[];
  bot1: Bot;
  bot2: Bot;
}) => {
  const speakerBot = chatHistory[chatHistory.length - 1]?.user;
  const { mood, personality, somethingToKnowAbout } =
    speakerBot === Bots.Bot1 ? bot2 : bot1;

  const systemInstruction =
    `Your character is defined like this:
     ${mood !== "" ? `- your mood is ${mood}` : ""}
     ${personality !== "" ? `- your personality is ${personality}` : ""}
     ${
       somethingToKnowAbout !== ""
         ? `- this sentence applies well to you: ${somethingToKnowAbout}`
         : ""
     }
     ` + instructions;

  const response = await fetch("/api/ai", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ chatHistory, systemInstruction }),
  });
  const data = await response.json();
  return data;
};
