import { extendTheme } from "@chakra-ui/react";

const extendedTheme = {
  components: {
    Button: {
      variants: {
        solidBrand: {
          _focus: {
            boxShadow: "none",
          },
          variant: "solid",
          textTransform: "uppercase",
          backgroundColor: "#e65300",
          textColor: "white",
          _hover: {
            background: "#8a3200",
          },
          _active: {
            border: "none",
            borderStyle: "none",
          },
        },
        ghostBrand: {
          background: "transparent",
          variant: "solid",
          textColor: "#e65300",
          textTransform: "uppercase",
          _focus: {
            boxShadow: "none",
          },
          _hover: {
            background: "rgba(255,147,74,0.3)",
          },
          _active: {
            border: "none",
            borderStyle: "none",
          },
        },
      },
    },
  },
  colors: {
    orange: {
      50: "#ffeddb",
      100: "#ffcdaf",
      200: "#ffad7e",
      300: "#ff8d4c",
      400: "#ff6d1a",
      500: "#e65300",
      600: "#b44000",
      700: "#812d00",
      800: "#4f1a00",
      900: "#210600",
    },
  },
};

const theme = extendTheme(extendedTheme);
export default theme;
