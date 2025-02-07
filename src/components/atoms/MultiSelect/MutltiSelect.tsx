import { MenuItem, TextField } from "@mui/material";

interface MultiSelectProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  options: { value: string; label: string }[];
  width?: number;
}

export const MultiSelect = ({
  value,
  onChange,
  label,
  options,
  width = 250,
}: MultiSelectProps) => {
  return (
    <TextField
      style={{ width }}
      variant="outlined"
      value={value}
      onChange={onChange}
      select
      label={label}
    >
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
};
