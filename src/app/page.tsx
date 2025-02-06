import { TwoBots } from "@/components/TwoBots/TwoBots";
import { Container } from "@mui/material";

export default function Home() {
  return (
    <main>
      <Container sx={{ paddingY: 4 }}>
        <TwoBots />
      </Container>
    </main>
  );
}
