import { Box, Typography } from "@mui/material";
import styles from "./BotArea.module.css";
import Markdown from "react-markdown";

interface BotAreaProps {
  botMessage: string;
  botName: string;
  imageSrc: string;
}

export const BotArea = ({ botMessage, botName, imageSrc }: BotAreaProps) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
      <img src={imageSrc} alt="bot1" className={styles.botImage} />
      <Typography
        variant="h6"
        sx={{ fontWeight: "bold", color: "primary.main", paddingY: 1 }}
      >
        {botName}
      </Typography>
      <Typography component="div">
        <Markdown>{botMessage}</Markdown>
      </Typography>
    </Box>
  );
};
