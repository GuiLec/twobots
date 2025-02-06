export const postChat = async ({ prompt }: { prompt: string }) => {
  const response = await fetch("/api/ai", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt }),
  });
  const data = await response.json();
  return data;
};
