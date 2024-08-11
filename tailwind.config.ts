import type { Config } from "tailwindcss";

export const appColors = {
  popBlack: {
    100: "#8A8A8A",
    200: "#3D3D3D",
    300: "#161616",
    400: "#121212",
    500: "#0D0D0D",
  },
  popWhite: {
    100: "#D2D2D2",
    200: "#E0E0E0",
    300: "#EFEFEF",
    400: "#FBFBFB",
    500: "#FFFFFF",
  },
  poliPurple: {
    100: "#E8DFFF",
    200: "#D2C2FF",
    300: "#B49AFF",
    400: "#9772FF",
    500: "#6A35FF",
    600: "#4A25B3",
    700: "#351A80",
    800: "#20104D",
  },
  orangeSunshine: {
    100: "#FFEFE6",
    200: "#FFDBC7",
    300: "#FFC3A2",
    400: "#FFAB7C",
    500: "#FF8744",
    600: "#B35F30",
    700: "#804322",
    800: "#4D2914",
  },
  pinkPong: {
    100: "#FFE1E9",
    200: "#FFC6D4",
    300: "#FFA0B7",
    400: "#FF7B9A",
    500: "#FF426F",
    600: "#B32E4E",
    700: "#802138",
    800: "#4D1421",
  },
  manna: {
    100: "#FFF8E5",
    200: "#FFEFC7",
    300: "#FFE5A2",
    400: "#FFDB7D",
    500: "#FFCB45",
    600: "#B38E30",
    700: "#806623",
    800: "#4D3D15",
  },
  neoPaccha: {
    100: "#FBFFE6",
    200: "#F7FFC6",
    300: "#F2FF9F",
    400: "#EDFE79",
    500: "#E5FE40",
    600: "#A0B22D",
    700: "#727F20",
    800: "#454C13",
  },
  yoyo: {
    100: "#F4E5FF",
    200: "#E5C5FF",
    300: "#D59FFF",
    400: "#C379FF",
    500: "#AA3FFF",
    600: "#772CB3",
    700: "#552080",
    800: "#33134D",
  },
  parkGreen: {
    100: "#DDFFF1",
    200: "#C4FFE6",
    300: "#9DFFD6",
    400: "#76FFC6",
    500: "#3BFFAD",
    600: "#29B379",
    700: "#1E8057",
    800: "#124D34",
  },
};

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      zIndex: {
        bg: "-1",
      },

      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: { ...appColors },
    },
  },

};
export default config;
