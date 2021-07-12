import Link from "next/link";
import { Button, Box, Link as ChakraLink } from "@chakra-ui/react";
import CompContainer from "../components/CompContainer";
import { HamburgerIcon } from "@chakra-ui/icons";

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
        <Box as="header">
          <CompContainer>
            <Box>
              <Link href="/" passHref>
                <ChakraLink>
                  <Box>Blazity</Box>
                </ChakraLink>
              </Link>
            </Box>
            <Box>
              <Button variant="link">
                <HamburgerIcon height="40px" width="40px" />
              </Button>
            </Box>
          </CompContainer>
        </Box>
      </Box>
    </>
  );
};

export default Navigation;
