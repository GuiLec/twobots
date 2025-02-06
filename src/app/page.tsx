import { TwoBots } from "@/components/TwoBots/TwoBots";
import { Container, Typography } from "@mui/material";

export default function Home() {
  return (
    <main>
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
