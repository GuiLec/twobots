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

enum Bots {
  Bot1 = 1,
  Bot2 = 2,
}

const MAX_NUMBER_OF_MESSAGES = 10;

export const TwoBots = () => {
  const [playingState, setPlayingState] = useState<"stop" | "start" | "pause">(
    "stop"
  );
  const [numberOfMessages, setNumberOfMessages] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [bot1Message, setBot1Message] = useState("");
  const [bot2Message, setBot2Message] = useState("");
  const [activeBot, setActiveBot] = useState<Bots>(Bots.Bot1);

  const fetchAnswer = async (prompt: string) => {
    if (numberOfMessages < MAX_NUMBER_OF_MESSAGES) {
      const answer = await postChat({ prompt });
      if (activeBot === Bots.Bot1) {
        setBot2Message(answer.response.result);
        setActiveBot(Bots.Bot2);
      } else {
        setBot1Message(answer.response.result);
        setActiveBot(Bots.Bot1);
      }
      setNumberOfMessages(numberOfMessages + 1);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (playingState === "stop") {
      setPlayingState("start");
      setBot1Message(inputValue);
      fetchAnswer(inputValue);
    } else if (playingState === "start") {
      setPlayingState("pause");

      setNumberOfMessages(MAX_NUMBER_OF_MESSAGES);
    } else {
      setPlayingState("stop");
      setBot1Message("");
      setBot2Message("");
      setActiveBot(Bots.Bot1);
      setNumberOfMessages(0);
      setInputValue("");
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  useEffect(() => {
    if (playingState === "start") {
      const prompt = activeBot === Bots.Bot1 ? bot1Message : bot2Message;
      fetchAnswer(prompt);
    }
  }, [activeBot, playingState]);

  return (
    <form onSubmit={handleSubmit}>
      <FormControl>
        <Stack spacing={2} direction="row">
          <TextField
            label="First message"
            variant="outlined"
            placeholder="Enter the first message"
            value={inputValue}
            onChange={handleChange}
          />
          <Button
            disabled={inputValue === ""}
            type="submit"
            variant="contained"
            color="primary"
          >
            {getSubmitButtonLabel(playingState)}
          </Button>
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
          <Typography variant="h6">Bot 1</Typography>
          <Typography component="div">
            <Markdown>{bot1Message}</Markdown>
          </Typography>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <Typography variant="h6">Bot 2</Typography>
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
