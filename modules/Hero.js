import AppContainer from "../components/AppContainer";
// import Button from "../components/Button";
import { ThemeSubTitle } from "../components/HeroSection.style";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import CompContainer from "../components/CompContainer";
import {
  Flex,
  Stack,
  Heading,
  Link,
  Button,
  Box,
  Image,
} from "@chakra-ui/react";

const Hero = () => {
  return (
    <Flex as="section" w="100%" h="calc(100vh - 6rem)" position="relative">
      <Image
        src="/rocket-bg2.svg"
        alt="Orange rocket"
        h="80%"
        maxHeight="80Vw"
        w="auto"
        position="absolute"
        right="0px"
        zIndex="-1"
      />
      <CompContainer>
        <Flex
          maxWidth="35rem"
          height="calc(100vh - 6rem)"
          justify="left"
          pt="5rem"
        >
          <Stack spacing={8} maxWidth="lg">
            <Stack spacing={2}>
              <Heading
                as="h2"
                fontWeight="700"
                fontSize="3.75rem"
                justify="center"
              >
                Blazing fast webapps, no more headaches for the CMO
                {/* <Box as="span" whiteSpace="nowrap">
                the C<SwitchingLetters />O
              </Box> */}
              </Heading>
            </Stack>
            <Heading
              as="h2"
              size="md"
              fontSize="1.25rem"
              fontWeight="300"
              lineHeight={1.5}
            >
              We work with busy tech executives, entrepreneurs and founders on a
              constant <b> 5-star client satisfaction</b> level
            </Heading>

            <Stack
              // direction={{ base: "column", lg: "row" }}
              direction="row"
              spacing={4}
              display="flex"
            >
              <Box>
                <Link
                  href="#estimate"
                  _hover={{
                    textDecoration: "none",
                  }}
                >
                  <Button
                    _focus={{
                      boxShadow: "none",
                    }}
                    variant="solid"
                    size="lg"
                    textTransform="uppercase"
                    backgroundColor="#e65300"
                    textColor="white"
                    _hover={{
                      background: "#8a3200",
                    }}
                    _active={{
                      border: "none",
                      borderStyle: "none",
                    }}
                  >
                    let&apos;s talk
                  </Button>
                </Link>
              </Box>
              <Box>
                <Link
                  href="/portfolio"
                  _hover={{
                    textDecoration: "none",
                  }}
                >
                  <Button
                    _focus={{
                      boxShadow: "none",
                    }}
                    variant="ghost"
                    size="lg"
                    rightIcon={<ArrowForwardIcon />}
                    textTransform="uppercase"
                    textColor="#e65300"
                    _hover={{
                      background: "rgba(255,147,74,0.3)",
                    }}
                    _active={{
                      border: "none",
                      borderStyle: "none",
                    }}
                  >
                    our work
                  </Button>
                </Link>
              </Box>
            </Stack>
          </Stack>
        </Flex>
      </CompContainer>
      <div></div>
    </Flex>
  );
};

export default Hero;
