import {
  Box,
  Stack,
  useTheme,
  Heading,
  Text,
  Link as ChakraLink,
  Grid,
  Flex,
} from "@chakra-ui/react";
import CompContainer from "../components/CompContainer";
import { transparentize } from "@chakra-ui/theme-tools";

const RealMVP = () => {
  const theme = useTheme();
  return (
    <Box as="section" pt={24}>
      <CompContainer position="relative">
        <Stack
          w="100%"
          align="center"
          spacing={32}
          _before={{
            content: `""`,
            position: "absolute",
            right: 0,
            bottom: 0,
            width: 560,
            height: 560,
            zIndex: -1,
            backgroundImage: `radial-gradient(${transparentize(
              "orange.500",
              0.4
            )(theme)} 1px, transparent 1%)`,
            backgroundSize: "14px 14px",
          }}
          _after={{
            content: "url(orbit.svg)",
            top: -16,
            right: 0,
            zIndex: -1,
            position: "absolute",
            pointerEvents: "none",
            transform: "translateX(50%)",
            opacity: 0.6,
          }}
        >
          <Stack w="100%" direction="column" spacing={16}>
            <Stack align="center">
              <Heading
                as="h1"
                size="sm"
                color="orange.500"
                textAlign="center"
                textTransform="uppercase"
              >
                Gain market traction and grow
              </Heading>
              <Heading
                as="h2"
                maxW="2xl"
                size="xl"
                textAlign="center"
                fontWeight="400"
              >
                No more headaches
              </Heading>
            </Stack>
            <Stack
              direction={["column", "column", "row"]}
              justify="center"
              align="start"
            >
              <Stack spacing={[4, 6]} maxW="lg">
                <Box
                  position="relative"
                  _before={{
                    content: "url(/path-18.svg)",
                    position: "absolute",
                    opacity: 0.3,
                    top: 0,
                    left: 0,
                    zIndex: -1,
                  }}
                >
                  <Text fontSize="lg" p={8}>
                    You have a web app and one of these scenarios: it&apos;s not
                    performant, adding new features takes forever, or you need
                    to build it from scratch. Either way, just thinking about it
                    gives you a headache. That&apos;s why we are here.
                  </Text>
                </Box>
                <Text
                  color="orange.500"
                  borderLeft="2px solid"
                  borderLeftColor="orange.500"
                  fontSize="2xl"
                  px={8}
                >
                  All our projects are fixed price, which means you always know
                  exactly how much you will pay.
                </Text>
              </Stack>
              <Stack spacing={[4, 6]} maxW="lg">
                <Box
                  position="relative"
                  _after={{
                    content: "url(/path-19.svg)",
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    opacity: 0.3,
                    zIndex: -1,
                  }}
                >
                  <Text fontSize="lg" padding={8}>
                    Our deep understanding of{" "}
                    <ChakraLink
                      isExternal
                      href="https://blog.blazity.com/8-reasons-why-you-should-migrate-to-JAMstack-in-2021"
                      rel="noopener"
                      fontWeight="600"
                      textDecoration="underline"
                      _focus={{
                        boxShadow: "none",
                      }}
                      _hover={{ color: "orange.100" }}
                    >
                      Jamstack
                    </ChakraLink>{" "}
                    and headless integrations lets us build easy to maintain
                    software. Clients appreciate it because it significantly
                    reduces costs. One of the startups we helped has a monthly
                    upkeep cost of just 100$.
                  </Text>
                </Box>
                <Text
                  color="orange.500"
                  borderRight="2px solid"
                  borderRightColor="orange.500"
                  fontSize="2xl"
                  px={8}
                >
                  Every one of our clients either continues expanding with us,
                  starts new projects or refers us to other company departments.
                </Text>
              </Stack>
            </Stack>
          </Stack>
          <Grid
            gridTemplateColumns={{ base: "1fr", lg: "3fr 4fr" }}
            gap={16}
            justifyContent="center"
            alignItems="center"
          >
            <Flex
              h={0}
              pb="100%"
              position="relative"
              backgroundImage="url(/orange-orbit.svg)"
              backgroundSize="100% 100%"
              width="100%"
              justifyContent="center"
              alignItems="centerr"
              maxW="2xl"
            >
              <Stack
                maxW="xl"
                minW="xs"
                pos="absolute"
                top="50%"
                textAlign="center"
                px={8}
                transform="translateY(-50%)"
              >
                <Heading as="h3" size="xl" display={["none", "unset"]}>
                  We can’t stand anything less than 5-star reviews of our work.
                </Heading>
              </Stack>
            </Flex>
            <Stack justify="center" spacing={8} maxW="3xl">
              <Heading as="h2" size="xl" maxW="30ch" fontWeight="400">
                Client satisfaction is our absolute top priority.
              </Heading>
              <Stack spacing={4} fontSize="xl" maxW="58ch">
                <Text>
                  We have a medium sized team and{` `}
                  <Box color="orange.500" as="b">
                    the founders personally know and select every engineer in
                    the company.
                  </Box>
                </Text>
                <Text>
                  Thanks to that hands-on approach of the founding team, you can
                  always count on direct communication, quick response times and
                  ongoing availability.{" "}
                </Text>
              </Stack>
            </Stack>
          </Grid>
        </Stack>
      </CompContainer>
    </Box>
  );
};

export default RealMVP;
