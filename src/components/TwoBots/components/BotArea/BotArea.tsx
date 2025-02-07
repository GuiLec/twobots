import { Box, IconButton, Stack, Typography } from "@mui/material";
import styles from "./BotArea.module.css";
import Markdown from "react-markdown";
import SettingsIcon from "@mui/icons-material/Settings";

interface BotAreaProps {
  botMessage: string;
  botName: string;
  imageSrc: string;
}

export const BotArea = ({ botMessage, botName, imageSrc }: BotAreaProps) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
      <img src={imageSrc} alt="bot1" className={styles.botImage} />
      <Stack direction="row" spacing={1} alignItems={"center"}>
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", color: "primary.main", paddingY: 1 }}
        >
          {botName}
        </Typography>
        <IconButton>
          <SettingsIcon />
        </IconButton>
      </Stack>
      <Typography
        component="div"
        sx={{
          border: 1,
          borderColor: "grey.300",
          borderRadius: 2,
          minHeight: 200,
          padding: 2,
        }}
      >
        <Markdown>{botMessage}</Markdown>
      </Typography>
    </Box>
  );
};
