import Link from "next/link";
import { Button, Box, Link as ChakraLink, Grid, Stack } from "@chakra-ui/react";
import CompContainer from "../components/CompContainer";
import { HamburgerIcon } from "@chakra-ui/icons";
import BlazityLogo from "../components/BlazityLogo";
import ColorModeSwitcher from "../components/ColorModeSwitcher";

const navLinks = [
  {
    name: "Services",
    pathname: "/#services",
    isCta: false,
  },
  {
    name: "Why us",
    pathname: "/#whyus",
    isCta: false,
  },
  {
    name: "Portfolio",
    pathname: "/portfolio",
    isCta: false,
  },
  {
    name: "Blog",
    pathname: "/blog",
    isCta: false,
  },
];

const Navigation = () => {
  return (
    <>
      <Box position="sticky" top={0} zIndex={100}>
        <Box
          as="header"
          transition="box-shadow 0.2s ease-in-out"
          boxShadow="md"
          _before={{
            content: `""`,
            position: "absolute",
            width: "100%",
            height: "100%",
            zIndex: -1,
            background: "white",
            opacity: 1,
            transition: "opacity 0.2s ease-in-out",
          }}
        >
          <CompContainer
            as={Grid}
            gridTemplateColumns={{ base: "2fr auto, lg:1fr auto 1fr" }}
            alignItems="center"
          >
            <Box py={2}>
              <Link href="/" passHref>
                <ChakraLink>
                  <BlazityLogo maxWidth={40} height={16} width="auto" />
                </ChakraLink>
              </Link>
            </Box>
            <Box>
              <Button variant="link" display={{ base: "unset", lg: "none" }}>
                <HamburgerIcon height="40px" width="40px" color="grey.800" />
              </Button>
              <Box as="nav" display={{ base: "none", lg: "inherit" }}>
                <Stack
                  as="ul"
                  direction="row"
                  listStyleType="none"
                  height={24}
                  align="center"
                >
                  {navLinks.map((navLink) => (
                    <Box
                      key={navLink.pathname}
                      as="li"
                      borderTop="4px solid"
                      borderBottom="4px solid"
                      borderTopColor="transparent"
                      borderBottomColor="transparent"
                    >
                      <Link href={navLink.pathname} passHref>
                        <ChakraLink
                          borderRadius="md"
                          fontWeight={500}
                          display="block"
                          color="black"
                          fontSize="md"
                          px={4}
                          py={2}
                          textTransform="uppercase"
                          _hover={{
                            bg: "initial",
                            color: "orange.500",
                          }}
                        >
                          {navLink.name}
                        </ChakraLink>
                      </Link>
                    </Box>
                  ))}
                </Stack>
              </Box>
            </Box>
            <Stack
              spacing={10}
              isInline
              alignItems="center"
              justifySelf="end"
              display={{ base: "none", lg: "flex" }}
            >
              <Button
                variant="solidBrand"
                size="md"
                textTransform="uppercase"
                // onClick={() =>
                //   (window.location.href =
                //     ctaButton?.url || "https://blazity.com/#contact-us")
                // }
              >
                Get a quote
              </Button>
              <ColorModeSwitcher />
            </Stack>
          </CompContainer>
        </Box>
      </Box>
    </>
  );
};

export default Navigation;
