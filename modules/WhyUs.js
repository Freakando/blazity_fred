import React from "react";
import {
  Box,
  Stack,
  Heading,
  Grid,
  useTheme,
  Image,
  Text,
} from "@chakra-ui/react";
import CompContainer from "../components/CompContainer";
import { transparentize } from "@chakra-ui/theme-tools";

const perks = [
  {
    title: "Unbeatable time-to-market",
    content:
      "Once a client called us on Wednesday. Their project had a deadline so strict that no other company would take it. On Friday evening, the first version of their product was operational. ",
    image: "whyUs/rocket.svg",
    key: "Unbeatable time-to-market",
  },
  {
    title: "We understand tech",
    content:
      "... so you don’t have to. When we forge your idea into a real product we explain every step of the way. This allows you to make conscious decisions about the functionalities and scope.",
    image: "whyUs/planet.svg",
    key: "We understand tech",
  },
  {
    title: "Focus on listening and explaining",
    content:
      "We are dedicated to transparent and direct communication. That’s why at least one of our founders is present at every business workshop with the client, and is available during the development.",
    image: "whyUs/satellite.svg",
    key: "Focus on listening and explaining",
  },
  {
    title: "Market success",
    content:
      "We know how to develop successful apps. One of our clients - an innovative fashion e-commerce start-up - attracted 150 000 users, gaining money to expand worldwide as a result.",
    image: "whyUs/gem.svg",
    kay: "Market success",
  },
];

const WhyUs = () => {
  const theme = useTheme();
  return (
    <Box
      as="section"
      position="relative"
      mt={48}
      mb={24}
      _before={{
        content: `url(whyUs/astronaut.svg)`,
        visibility: { base: "hidden", lg: "visible" },
        position: "absolute",
        right: 0,
        top: [-60, -50, -110, -165, -220],
        height: [130, 155, 195, 195, 259],
        width: [88, 200, 312, 312, 417],
        zIndex: -1,
      }}
    >
      <Box id="whyus" h={0} />
      <CompContainer
        as={Stack}
        spacing={16}
        position="relative"
        _after={{
          content: `url(whyUs/spacer.svg)`,
          opacity: 0.5,
          display: "flex",
          justifyContent: "center",
          width: "100%",
          marginTop: 24,
        }}
      >
        <Stack textAlign="center" alignItems="center" spacing={0}>
          <Heading
            as="h1"
            size="sm"
            color="orange.500"
            textAlign="center"
            textTransform="uppercase"
          >
            Why us
          </Heading>
          <Heading
            as="h2"
            maxW="lg"
            size="xl"
            textAlign="center"
            fontWeight="400"
          >
            Combine speed with quality
          </Heading>
        </Stack>
        <Grid
          templateColumns={["1fr", "1fr", "1fr 1fr"]}
          rowGap={16}
          columnGap={16}
          position="relative"
          _before={{
            content: `""`,
            zIndex: -1,
            left: 0,
            width: "50%",
            height: "100%",
            position: "absolute",
            backgroundImage: `radial-gradient(${transparentize(
              "gray.100",
              0.4
            )(theme)} 1px, transparent 1%)`,
            backgroundSize: "48px 48px",
            backgroundPosition: "top left",
          }}
        >
          {perks.map((perk) => (
            <Grid
              key={perk.key}
              gridTemplateColumns={{ base: "1fr", xl: "auto 1fr" }}
              margin="auto"
              gap={8}
              justifyItems="center"
              alignItems="center"
            >
              <Image alt={perk.key} src={perk.image} w="156px" />
              <Stack spacing={4}>
                <Heading
                  color="orange.500"
                  size="lg"
                  textAlign={{ base: "center", xl: "inherit" }}
                >
                  {perk.title}
                </Heading>
                <Text maxW="50ch" fontSize="lg">
                  {perk.content}
                </Text>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </CompContainer>
    </Box>
  );
};

export default WhyUs;
