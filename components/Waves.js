import React from "react";
import { Box, Image } from "@chakra-ui/react";

const Waves = () => {
  return (
    <Box width="100%" position="relative">
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
