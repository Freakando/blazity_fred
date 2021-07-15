import { Box } from "@chakra-ui/react";
import Waves from "../components/Waves";

const Services = () => {
  return (
    <Box as="section" position="relative">
      <Waves />
      <Box
        backgroundColor="orange"
        position="relative"
        _before={{
          content: "''",
          width: 40,
          height: "6px",
        }}
      >
        <Box />
      </Box>
    </Box>
  );
};

export default Services;
