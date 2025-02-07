import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

interface BotSettingsModalProps {
  open: boolean;
  handleClose: () => void;
  botName: string;
}

export const BotSettingsModal = ({
  open,
  handleClose,
  botName,
}: BotSettingsModalProps) => {
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
          {botName}
        </Typography>
        <Typography id="modal-description" sx={{ my: 1 }}>
          {`Here you can define `}
          <strong>{botName}</strong>
          {`'s personality.`}
        </Typography>
        <form>
          <FormControl variant="outlined">
            <Stack spacing={2} direction="column">
              <TextField
                style={{ width: "100%" }}
                variant="outlined"
                value="test"
                onChange={(e) => console.log(e.target.value)}
                select
                label="Label"
              >
                <MenuItem key={1} value="test">
                  Test 1
                </MenuItem>
                <MenuItem key={2} value="test2">
                  Test 2
                </MenuItem>
              </TextField>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                onClick={handleClose}
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
