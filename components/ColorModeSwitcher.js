/* eslint-disable jsx-a11y/accessible-emoji */
import { Button } from "@chakra-ui/button";
import { useColorMode, useColorModeValue } from "@chakra-ui/color-mode";
import { Box } from "@chakra-ui/layout";
import { transparentize, darken } from "@chakra-ui/theme-tools";
import React from "react";
import MoonIcon from "./icons/MoonIcon";
import SunIcon from "./icons/SunIcon";

export default function ColorModeSwitcher({ ...boxProps }) {
  const { colorMode, toggleColorMode } = useColorMode();
  const bgColor = useColorModeValue("#F2F2F2", "#433C3E");
  const iconColor = useColorModeValue("#5C5C5C", "#fff");

  return (
    <Button
      display="flex"
      alignItems="center"
      justifyContent="center"
      position="relative"
      w={16}
      h={8}
      p={2}
      color={bgColor}
      bgColor="currentColor"
      _hover={{ bgColor: "currentColor" }}
      _active={{ bgColor: "currentColor" }}
      borderRadius={10}
      onClick={toggleColorMode}
      {...boxProps}
    >
      <SunIcon
        color={iconColor}
        boxSize="20px"
        mr="auto"
        as="span"
        role="img"
        lineHeight={1}
        aria-label="Day"
      />
      <MoonIcon
        color={iconColor}
        boxSize="20px"
        ml="auto"
        as="span"
        role="img"
        lineHeight={1}
        aria-label="Day"
      />

      <Box
        position="absolute"
        boxSize={6}
        borderRadius={7}
        bgColor="#fff"
        transform={
          colorMode === "light" ? "translateX(-65%)" : "translateX(65%)"
        }
        transitionDuration=".2s"
        transitionProperty="transform, background-color"
        sx={{
          backfaceVisibility: "hidden",
        }}
      />
    </Button>
  );
}
