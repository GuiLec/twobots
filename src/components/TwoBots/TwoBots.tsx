"use client";
import { useState, FormEvent, ChangeEvent } from "react";
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

export const TwoBots = () => {
  const [inputValue, setInputValue] = useState("");
  const [bot1Message, setBot1Message] = useState("");
  const [bot2Message, setBot2Message] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("🚀 ~ handleSubmit ~ inputValue:", inputValue);
    const answer = await postChat({ prompt: inputValue });
    setBot1Message(answer.response.result);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl>
        <TextField
          label="Enter Text"
          variant="outlined"
          value={inputValue}
          onChange={handleChange}
        />
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </FormControl>
      <Stack spacing={2} direction="row" justifyContent="space-between">
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
