import { TwoBots } from "@/components/organisms/TwoBots/TwoBots";
import { bots } from "@/modules/bot/bots";
import { Bots } from "@/modules/bot/interface";
import { Container, Typography } from "@mui/material";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("home");
  return (
    <main>
      <Container sx={{ paddingY: 4 }}>
        <Typography variant="h5" component="h1">
          <strong>{bots[Bots.Bot1].name}</strong>
          {t("intro.messagePart1")}
          <strong>{bots[Bots.Bot2].name}</strong>
          {t("intro.messagePart2")}
        </Typography>
        <TwoBots />
      </Container>
    </main>
  );
}
