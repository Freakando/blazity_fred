import React from "react";
import { Box, Image } from "@chakra-ui/react";

const Waves = ({ bottomWaves }) => {
  return (
    <Box
      width="100%"
      position="relative"
      transform={bottomWaves ? "rotateX(180deg)" : "none"}
      top={bottomWaves ? "-2px" : "initial"}
      bottom={bottomWaves ? "initial" : "-2px"}
    >
      <Image
        alt="Orange Wave"
        aria-hidden
        src="/rear-wave.svg"
        position="absolute"
        width="100%"
        top={0}
      />
      <Image
        alt="Orange Wave"
        aria-hidden
        src="/front-wave.svg"
        position="relative"
        width="100%"
        top={0}
      />
    </Box>
  );
};

export default Waves;
