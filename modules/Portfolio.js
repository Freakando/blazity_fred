import React, { Fragment } from "react";
import {
  Box,
  Button,
  Grid,
  Heading,
  Link as ChakraLink,
  Stack,
  Flex,
  Text,
  Tooltip,
  useTheme,
} from "@chakra-ui/react";
import Link from "next/link";
import CompContainer from "../components/CompContainer";
import FilestackImage from "../temp/FilestackImage";
import { transparentize } from "@chakra-ui/theme-tools";
import techMap from "../utils/techMap";

const ProjectTile = ({ projectData, ...rest }) => {
  const { projectImage, category, title, description, techStack } = projectData;

  return (
    <Stack spacing={8} w="100%" {...rest}>
      <Flex
        transition="0.2s ease-in-out"
        // h={["auto", "auto", "auto", 360]}
        alignItems="center"
        _hover={{
          transform: "translateY(-5px)",
        }}
      >
        <FilestackImage
          style={{ flex: 1 }}
          fluid={{ image: projectImage, maxHeight: 360 }}
        />
      </Flex>
      <Stack spacing={8} alignItems="center">
        <Stack spacing={2}>
          <Stack spacing={0}>
            <Heading
              as="h3"
              size="sm"
              color="orange.500"
              textAlign="center"
              textTransform="uppercase"
            >
              {category}
            </Heading>
            <Heading as="h2" size="xl" textAlign="center">
              {title}
            </Heading>
          </Stack>
          <Text fontWeight="300" textAlign="center" fontSize="xl" maxW="xs">
            {description}
          </Text>
        </Stack>
        <Stack direction="row" alignItems="center" spacing={4}>
          {techStack.map((tech) => {
            const TechIcon = techMap[tech.toLowerCase()];
            return TechIcon ? (
              <Tooltip
                key={tech}
                label={tech}
                bg="orange.500"
                color="whiteAlpha.900"
              >
                <Box>
                  <TechIcon h={8} w={8} />
                </Box>
              </Tooltip>
            ) : null;
          })}
        </Stack>
      </Stack>
    </Stack>
  );
};

const Portfolio = () => {
  return (
    <Box as="section" position="relative">
      <CompContainer
        as={Stack}
        spacing={16}
        position="relative"
        _after={{
          content: "url(orange-zigzag.svg)",
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
            Portfolio
          </Heading>
          <Heading
            as="h2"
            maxW="lg"
            size="xl"
            textAlign="center"
            fontWeight={400}
          >
            Products that take our clients to the next level
          </Heading>
        </Stack>
        <Grid
          templateColumns={{ base: "1fr", lg: "1fr 1fr 1fr" }}
          gridGap={16}
          alignItems="flex-end"
        >
          {content.map((project, index) => (
            <Fragment key={index}>
              <ProjectTile key={project.title} projectData={project} />{" "}
              {index !== content.length - 1 && (
                <Box
                  width="100%"
                  borderStyle="solid"
                  borderTopWidth="1px"
                  borderColor="orange.400"
                  display={{ base: "block", lg: "none" }}
                />
              )}
            </Fragment>
          ))}
        </Grid>
        <Flex w="100%" justifyContent="center">
          <Link href="/portfolio" passHref>
            <Button
              as={ChakraLink}
              variant="solidBrand"
              size="lg"
              _hover={{
                color: "initial",
                textDecoration: "none",
              }}
            >
              Check out more
            </Button>
          </Link>
        </Flex>
        <BackgroundWithDotsDesktop />
      </CompContainer>
    </Box>
  );
};

export default Portfolio;

const content = [
  {
    projectImage: {
      handle: "V6JzYXj5SuaUcphIwCaw",
      width: 1144,
      height: 671,
    },
    category: "Real estate",
    title: "mSeven",
    description: "Templating engine for real estate fund mSeven",
    techStack: ["JavaScript", "React", "Gatsby", "GraphCMS"],
  },
  {
    projectImage: {
      handle: "XXVdspqQQKiuEsVna60a",
      width: 725,
      height: 797,
    },
    category: "Fashion e-commerce",
    title: "Dropsy",
    description: "Chart-topping mobile app for streetwear enthusiasts",
    techStack: ["TypeScript", "React", "GraphCMS"],
  },
  {
    projectImage: {
      handle: "O73OT7FXSDyH2Za42dKW",
      width: 1142,
      height: 666,
    },
    category: "Fintech",
    title: "Divi",
    description: "Beautiful website for a cryptocurrency product",
    techStack: ["JavaScript", "React", "Next", "GraphCMS"],
  },
];

const OrangeDots = (props) => {
  const theme = useTheme();
  return (
    <Box {...props} width={32} height={32}>
      <Box
        width="100%"
        height="100%"
        backgroundImage={`radial-gradient(${transparentize(
          "orange.500",
          0.5
        )(theme)} 1px, transparent 1%)`}
        backgroundSize="8px 8px"
      />
    </Box>
  );
};

const BackgroundWithDotsDesktop = () => (
  <Box
    position="absolute"
    width="100%"
    height="100%"
    display={{ base: "none", lg: "block" }}
    pointerEvents="none"
    zIndex="-1"
  >
    <OrangeDots position="absolute" top="10%" left={-30} />
    <OrangeDots position="absolute" top="40%" left="5%" />
    <OrangeDots position="absolute" bottom="60%" left="30%" />
    <OrangeDots position="absolute" top="40%" right="30%" />
    <OrangeDots position="absolute" bottom="60%" right="5%" />
    <OrangeDots position="absolute" bottom="20%" right={0} />
  </Box>
);
