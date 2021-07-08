import { Box, Flex } from "@chakra-ui/react";

const CompContainer = (props) => {
  return (
    <Flex
      maxWidth="98em"
      width="100%"
      mx="auto"
      px={8}
      // align="${(props) => props.alignItems}"
      // justify="${(props) => props.justifyContent};{...props}"
    >
      {props.children}
    </Flex>
  );
};

export default CompContainer;
