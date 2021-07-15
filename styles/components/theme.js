import { extendTheme } from "@chakra-ui/react";

export const extendedTheme = {
  components: {
    Button: {
      variants: {
        solidBrand: {
          _focus: {
            boxShadow: "none",
          },
          variant: "solid",
          size: "lg",
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
      },
    },
  },
};

const theme = extendTheme(extendedTheme);
export default theme;
