import { Box } from "@chakra-ui/react";

const CompContainer = (props) => {
  return (
    <Box
      maxWidth="98em"
      width="100%"
      mx="auto"
      sx={{
        "@media (max-width: 1075px) and (min-width: 62em)": {
          px: 20,
        },
      }}
      px={{ base: 4, md: 8, lg: 32 }}
      {...props}
    >
      {props.children}
    </Box>
  );
};

export default CompContainer;
