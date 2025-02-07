import { MultiSelect } from "@/components/atoms/MultiSelect/MutltiSelect";
import { moodOptions, personalityOptions } from "@/modules/bot/bots";
import { Bot } from "@/modules/bot/interface";
import {
  Box,
  Button,
  FormControl,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import { ChangeEvent, FormEvent, useState } from "react";

interface BotSettingsModalProps {
  open: boolean;
  handleClose: () => void;
  bot: Bot;
  updateBot: (bot: Bot) => void;
}

export const BotSettingsModal = ({
  open,
  handleClose,
  bot,
  updateBot,
}: BotSettingsModalProps) => {
  const [settings, setSettings] = useState<{
    personality: string;
    mood: string;
  }>({
    personality: "",
    mood: "",
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateBot({
      ...bot,
      personality: settings.personality,
      mood: settings.mood,
    });
    handleClose();
  };

  const updatePersonality = (e: ChangeEvent<HTMLInputElement>) => {
    setSettings({ ...settings, personality: e.target.value });
  };

  const updateMood = (e: ChangeEvent<HTMLInputElement>) => {
    setSettings({ ...settings, mood: e.target.value });
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: [400, 500, 600],
          bgcolor: "background.paper",
          border: "2px solid #000",
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", color: "primary.main" }}
        >
          {bot.name}
        </Typography>
        <Typography id="modal-description" sx={{ my: 1 }}>
          {`Here you can define `}
          <strong>{bot.name}</strong>
          {`'s personality.`}
        </Typography>
        <form onSubmit={handleSubmit}>
          <FormControl variant="outlined">
            <Stack spacing={2} direction="column">
              <MultiSelect
                options={personalityOptions}
                value={settings.personality}
                onChange={updatePersonality}
                label="Personality"
              />
              <MultiSelect
                options={moodOptions}
                value={settings.mood}
                onChange={updateMood}
                label="Mood"
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ width: 100 }}
              >
                Save
              </Button>
            </Stack>
          </FormControl>
        </form>
      </Box>
    </Modal>
  );
};
