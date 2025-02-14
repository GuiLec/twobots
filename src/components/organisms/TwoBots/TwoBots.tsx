"use client";
import { useState, FormEvent, ChangeEvent, useEffect } from "react";
import { FormControl, TextField, Button, Stack, Box } from "@mui/material";
import { postChat } from "@/modules/chat/postChat";
import { ChatMessage } from "@/modules/chat/interface";
import { BotArea } from "@/components/organisms/TwoBots/components/BotArea/BotArea";
import { Bot, Bots } from "@/modules/bot/interface";
import { bots } from "@/modules/bot/bots";
import { useTranslations } from "next-intl";

const MAX_NUMBER_OF_MESSAGES = 15;
const NUMBER_OF_CHARS_READ_PER_SECOND = 33;

export const TwoBots = () => {
  const t = useTranslations("home.twoBots");

  const [playingState, setPlayingState] = useState<"stop" | "start" | "pause">(
    "stop"
  );
  const [numberOfMessages, setNumberOfMessages] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [bot1Message, setBot1Message] = useState("");
  const [bot2Message, setBot2Message] = useState("");
  const [activeBot, setActiveBot] = useState<Bots>(Bots.Bot1);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [bot1, setBot1] = useState<Bot>(bots[Bots.Bot1]);
  const [bot2, setBot2] = useState<Bot>(bots[Bots.Bot2]);

  const resetGame = () => {
    setPlayingState("stop");
    setBot1Message("");
    setBot2Message("");
    setActiveBot(Bots.Bot1);
    setNumberOfMessages(0);
    setInputValue("");
    setChatHistory([]);
  };

  const fetchAnswer = async () => {
    if (numberOfMessages < MAX_NUMBER_OF_MESSAGES) {
      const answer = await postChat({ chatHistory, bot1, bot2 });
      const message = answer.response.result;
      if (activeBot === Bots.Bot1) {
        setBot2Message(message);
        setChatHistory([...chatHistory, { text: message, user: Bots.Bot2 }]);
        setBot1Message("");
        await delay((1000 * message.length) / NUMBER_OF_CHARS_READ_PER_SECOND);
        setActiveBot(Bots.Bot2);
      } else {
        setBot1Message(message);
        setChatHistory([...chatHistory, { text: message, user: Bots.Bot1 }]);
        setBot2Message("");
        await delay((1000 * message.length) / NUMBER_OF_CHARS_READ_PER_SECOND);
        setActiveBot(Bots.Bot1);
      }
      setNumberOfMessages(numberOfMessages + 1);
    } else {
      resetGame();
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (playingState === "stop") {
      setBot1Message(inputValue);
      setChatHistory([...chatHistory, { text: inputValue, user: Bots.Bot1 }]);
      setPlayingState("start");
    } else if (playingState === "start") {
      setPlayingState("pause");

      setNumberOfMessages(MAX_NUMBER_OF_MESSAGES);
    } else {
      resetGame();
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  useEffect(() => {
    if (playingState === "start") {
      fetchAnswer();
    }
  }, [activeBot, playingState]);

  useEffect(() => {
    const firstMessage = decodeURIComponent(
      new URLSearchParams(window.location.search).get("first-message") ?? ""
    );
    setInputValue(firstMessage);
  }, []);

  return (
    <Box sx={{ paddingY: 2 }}>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <Stack spacing={2} direction="column">
            <TextField
              label={t("firstMessage")}
              multiline
              rows={4}
              sx={{ width: 300 }}
              variant="outlined"
              placeholder={t("enterFirstMessage")}
              value={inputValue}
              onChange={handleChange}
            />
            <Box>
              <Button
                disabled={inputValue === "" && playingState === "stop"}
                type="submit"
                variant="contained"
                color="primary"
              >
                {getSubmitButtonLabel(playingState)}
              </Button>
            </Box>
          </Stack>
        </FormControl>
      </form>
      <Stack
        spacing={2}
        direction="row"
        sx={{
          paddingY: 2,
        }}
      >
        <BotArea
          botMessage={bot1Message}
          bot={bot1}
          imageSrc="/bot1.png"
          updateBot={setBot1}
        />
        <BotArea
          botMessage={bot2Message}
          bot={bot2}
          imageSrc="/bot2.png"
          updateBot={setBot2}
        />
      </Stack>
    </Box>
  );
};

const getSubmitButtonLabel = (playingState: string) => {
  switch (playingState) {
    case "stop":
      return "Start";
    case "start":
      return "Stop";
    case "pause":
      return "Refresh";
  }
};

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
