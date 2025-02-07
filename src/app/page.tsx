import { TwoBots } from "@/components/organisms/TwoBots/TwoBots";
import { Container, Typography } from "@mui/material";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations();
  return (
    <main>
      <h1>{t("welcome")}</h1>
      <Container sx={{ paddingY: 4 }}>
        <Typography variant="h5" component="h1">
          <strong>Purple bot</strong> and <strong>Cyan bot</strong> want to
          chat. Init the conversation and see what happens!
        </Typography>
        <TwoBots />
      </Container>
    </main>
  );
}
