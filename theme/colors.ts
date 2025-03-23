type Colors = {
  primary: string;
  secondary: string;
  accent: string;
  neutral: string;
  error: string;
};

export default function getColors(dark_mode: boolean): Colors {
  if (dark_mode) {
    return {
      primary: "#2E2E38",
      secondary: "#4D77FF",
      accent: "#FDCB6E",
      neutral: "#F5F5F5",
      error: "#D72638",
    };
  }

  return {
    primary: "#F5F5F5",
    secondary: "#4D77FF",
    accent: "#FDCB6E",
    neutral: "#2E2E38",
    error: "#D72638",
  };
}
