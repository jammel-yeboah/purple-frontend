// frontend/theme.js
import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    background: "#121212",
    text: {
      primary: "#FFFFFF",
      secondary: "#B0B0B0",
    },
    accent: "#9057ca",
    border: "#333333",
  },
  fonts: {
    body: "Courier New, Courier, monospace",
    heading: "Courier New, Courier, monospace",
  },
  styles: {
    global: {
      body: {
        bg: "background",
        color: "text.primary",
      },
      a: {
        color: "accent",
        _hover: {
          textDecoration: "underline",
        },
      },
    },
  },
});

export default theme;