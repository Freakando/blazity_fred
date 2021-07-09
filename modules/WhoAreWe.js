import CompContainer from "../components/CompContainer";
import { Stack, Grid, Box, Heading, Flex, Text } from "@chakra-ui/react";
import {
  // WhoWeAreSection,
  TitleBox,
  Title,
  TitleComment,
  TextBox,
  Quote,
  Reference,
} from "../components/WhoWeAre.style";

const WhoAreWe = (props) => {
  return (
    <CompContainer as="section" {...props}>
      <Stack spacing={24}>
        <Grid
          templateColumns={{ base: "1fr", lg: "1fr 1fr" }}
          columnGap={{ xl: 32, md: 16 }}
          alignContent="center"
          justifyItems="center"
        >
          <Stack justify="center" spacing={4}>
            <Heading as="h1" size="xl" fontWeight="300">
              We use{" "}
              <b>
                <Box as="span" color="#e65300">
                  bleeding edge tech{" "}
                </Box>
              </b>
              to build <b>faster, more secure and converting web.</b>
            </Heading>
          </Stack>
          <Flex align="center" position="relative">
            <Text
              padding={8}
              position="relative"
              fontSize="2xl"
              fontWeight="300"
              // _before={{
              //   content: `url(/whoAreWe/line-left.svg)`,
              //   position: "absolute",
              //   left: 0,
              //   top: 0,
              //   opacity: 0.5,
              // }}
              // _after={{
              //   content: `url(/whoAreWe/line-right.svg)`,
              //   position: "absolute",
              //   right: 0,
              //   bottom: 0,
              //   opacity: 0.5,
              // }}
            >
              We work with{" "}
              <Box as="b" color="#e65300">
                JAMStack
              </Box>{" "}
              - modern architecture that is{" "}
              <b>faster, more secure and more scalable</b> compared to
              mainstream, monolithic solutions.
            </Text>
          </Flex>
        </Grid>
        <TextBox>
          <Quote>
            “It is very easy to simply trust Blazity to just get the project
            done in the right way.”
          </Quote>
          <Reference>Nathan Joens, CEO, Structurely</Reference>
        </TextBox>
      </Stack>
    </CompContainer>
  );
};

export default WhoAreWe;
