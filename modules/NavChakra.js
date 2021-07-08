import {
  useColorMode,
  Switch,
  Flex,
  Button,
  IconButton,
} from "@chakra-ui/react";
import { useState } from "react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/image";
import NextLink from "next/link";

export const DarkModeSwitch = () => {
  const { colorMode, toggleColorMode } = useState();
  const isDark = colorMode === "dark";
  return (
    <Flex>
      <Flex pos="fixed" top="1rem" right="1rem">
          <Flex></Flex>
      </Flex>
      <Switch color="green" isChecked={isDark} onChange={toggleColorMode} />
    </Flex>
  );
};
