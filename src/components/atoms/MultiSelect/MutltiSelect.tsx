import { MenuItem, TextField } from "@mui/material";

interface MultiSelectProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  options: { value: string; label: string }[];
}

export const MultiSelect = ({
  value,
  onChange,
  label,
  options,
}: MultiSelectProps) => {
  return (
    <TextField
      style={{ width: 250 }}
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
