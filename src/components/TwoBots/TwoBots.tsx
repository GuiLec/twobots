"use client";
import { useState, FormEvent, ChangeEvent, useEffect } from "react";
import {
  FormControl,
  TextField,
  Button,
  Stack,
  Box,
  Typography,
} from "@mui/material";
import { postChat } from "@/modules/chat/postChat";
import Markdown from "react-markdown";
import { ChatMessage } from "@/modules/chat/interface";
import styles from "./TwoBots.module.css";

enum Bots {
  Bot1 = "user1",
  Bot2 = "user2",
}

const MAX_NUMBER_OF_MESSAGES = 15;
const NUMBER_OF_CHARS_READ_PER_SECOND = 33;

export const TwoBots = () => {
  const [playingState, setPlayingState] = useState<"stop" | "start" | "pause">(
    "stop"
  );
  const [numberOfMessages, setNumberOfMessages] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [bot1Message, setBot1Message] = useState("");
  const [bot2Message, setBot2Message] = useState("");
  const [activeBot, setActiveBot] = useState<Bots>(Bots.Bot1);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);

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
      const answer = await postChat({ chatHistory });
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

  return (
    <form onSubmit={handleSubmit}>
      <FormControl>
        <Stack spacing={2} direction="row">
          <TextField
            label="First message"
            multiline
            rows={4}
            sx={{ width: 300 }}
            variant="outlined"
            placeholder="Enter the first message"
            value={inputValue}
            onChange={handleChange}
          />
          <Box>
            <Button
              disabled={inputValue === ""}
              type="submit"
              variant="contained"
              color="primary"
            >
              {getSubmitButtonLabel(playingState)}
            </Button>
          </Box>
        </Stack>
      </FormControl>
      <Stack
        spacing={2}
        direction="row"
        justifyContent="space-between"
        sx={{
          paddingY: 2,
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <img src="/bot1.png" alt="bot1" className={styles.botImage} />
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", color: "primary.main", paddingY: 1 }}
          >
            Purple bot
          </Typography>
          <Typography component="div">
            <Markdown>{bot1Message}</Markdown>
          </Typography>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <img src="/bot2.png" alt="bot2" className={styles.botImage} />
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", color: "primary.main", paddingY: 1 }}
          >
            Cyan bot
          </Typography>
          <Typography component="div">
            <Markdown>{bot2Message}</Markdown>
          </Typography>
        </Box>
      </Stack>
    </form>
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
