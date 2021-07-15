import Link from "next/link";
import {
  Button,
  Box,
  Link as ChakraLink,
  Grid,
  Stack,
  useColorMode,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import CompContainer from "../components/CompContainer";
import { HamburgerIcon } from "@chakra-ui/icons";
import BlazityLogo from "../components/BlazityLogo";
import ColorModeSwitcher from "../components/ColorModeSwitcher";
import { useRouter } from "next/router";

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
  const { colorMode } = useColorMode();
  const router = useRouter();

  // const { isOpen, onOpen, onClose } = useDisclosure();
  // const { setIsNavbarVisible, ctaButton } = useNavigationContext();

  // const isNavbarVisible =
  //   scrollingDirection === "up" || scrollingDirection === "none";

  // useEffect(() => {
  //   setIsNavbarVisible(isNavbarVisible);
  // }, [isNavbarVisible, setIsNavbarVisible]);

  const bgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.800", "whiteAlpha.900");
  return (
    <>
      <Box
        position="sticky"
        top={0}
        zIndex={100}
        // visibility={isNavbarVisible ? "visible" : "hidden"}
        // transform={{
        //   base: isNavbarVisible ? "translateY(0)" : "translateY(-80px)",
        //   lg: isNavbarVisible ? "translateY(0)" : "translateY(-96px)",
        // }}
        // transitionProperty="transform, visibility, height"
        // transitionDuration="0.2s"
        // transitionTimingFunction="ease-in-out"
      >
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
            background: bgColor,
            opacity: 1,
            transition: "opacity 0.2s ease-in-out",
          }}
        >
          <CompContainer
            as={Grid}
            gridTemplateColumns={{ base: "2fr auto, lg:1fr auto 1fr" }}
            alignItems="center"
            justify="space-between" // jak to jest w blazitach?
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
                          color={textColor}
                          fontSize="md"
                          px={4}
                          py={2}
                          textTransform="uppercase"
                          _hover={{
                            bg: "initial",
                            color: "orange.500",
                          }}
                          _focus={{
                            boxShadow: "none",
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
                _focus={{
                  boxShadow: "none",
                }}
                _active={{
                  border: "none",
                  borderStyle: "none",
                }}
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
