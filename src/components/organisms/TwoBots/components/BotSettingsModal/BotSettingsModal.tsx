import { MultiSelect } from "@/components/atoms/MultiSelect/MutltiSelect";
import { moodOptions, personalityOptions } from "@/modules/bot/bots";
import { Bot } from "@/modules/bot/interface";
import {
  Box,
  Button,
  FormControl,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useTranslations } from "next-intl";
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
  const t = useTranslations("home.twoBots.settingsModal");
  const t2 = useTranslations("bots");

  const [settings, setSettings] = useState<{
    personality: string;
    mood: string;
    somethingToKnowAbout: string;
  }>({
    personality: "",
    mood: "",
    somethingToKnowAbout: "",
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateBot({
      ...bot,
      personality: settings.personality,
      mood: settings.mood,
      somethingToKnowAbout: settings.somethingToKnowAbout,
    });
    handleClose();
  };

  const updatePersonality = (e: ChangeEvent<HTMLInputElement>) => {
    setSettings({ ...settings, personality: e.target.value });
  };

  const updateMood = (e: ChangeEvent<HTMLInputElement>) => {
    setSettings({ ...settings, mood: e.target.value });
  };

  const updateSomethingToKnowAbout = (e: ChangeEvent<HTMLInputElement>) => {
    setSettings({ ...settings, somethingToKnowAbout: e.target.value });
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
          {t("intro.part1")}
          <strong>{bot.name}</strong>
          {t("intro.part2")}
        </Typography>
        <form onSubmit={handleSubmit}>
          <FormControl variant="outlined">
            <Stack spacing={2} direction="column">
              <MultiSelect
                options={personalityOptions.map((personality) => ({
                  value: personality.value,
                  label: t2(personality.key),
                }))}
                value={settings.personality}
                onChange={updatePersonality}
                label={t("personality")}
              />
              <MultiSelect
                options={moodOptions.map((mood) => ({
                  value: mood.value,
                  label: t2(mood.key),
                }))}
                value={settings.mood}
                onChange={updateMood}
                label={t("mood")}
              />
              <TextField
                label={`${t("somethingToKnowAbout")}${bot.name}`}
                multiline
                rows={3}
                sx={{ width: [300, 400, 500] }}
                variant="outlined"
                placeholder={`${t("somethingToKnowAbout")}${bot.name}`}
                value={settings.somethingToKnowAbout}
                onChange={updateSomethingToKnowAbout}
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
