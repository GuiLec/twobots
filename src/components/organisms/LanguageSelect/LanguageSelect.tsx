"use client";
import { MultiSelect } from "@/components/atoms/MultiSelect/MutltiSelect";
import { Box } from "@mui/material";

interface LanguageSelectProps {
  locale?: string;
}

export const LanguageSelect = ({ locale = "en" }: LanguageSelectProps) => {
  const onLanguageChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    document.cookie = `locale=${e.target.value}`;
    window.location.reload();
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "flex-end", padding: 2 }}>
      <MultiSelect
        options={options}
        value={locale}
        onChange={onLanguageChange}
        label=""
        width={70}
      />
    </Box>
  );
};

const options = [
  {
    value: "en",
    label: "🇬🇧",
  },
  {
    value: "fr",
    label: "🇫🇷  ",
  },
];
