import { ChatMessage } from "@/modules/chat/interface";

export const postChat = async ({
  chatHistory,
}: {
  chatHistory: ChatMessage[];
}) => {
  const response = await fetch("/api/ai", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ chatHistory }),
  });
  const data = await response.json();
  return data;
};
