import {
  Box,
  useTheme,
  Stack,
  Heading,
  Grid,
  Text,
  keyframes,
} from "@chakra-ui/react";
import Waves from "../components/Waves";
import CompContainer from "../components/CompContainer";

const rotating = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg)
  }
`;

const Services = (props) => {
  const theme = useTheme();

  return (
    <Box as="section" position="relative">
      <Waves />
      <Box
        backgroundColor="orange.500"
        position="relative"
        _before={{
          content: "''",
          position: "absolute",
          bottom: { sm: "3%", md: "10%" },
          right: { sm: "3%" },
          display: { base: "none", sm: "block" },
          width: 40,
          height: "6px",
          borderRadius: "6px",
          transform: "rotate(-30deg)",
          background: `linear-gradient(
              to right,
              ${theme.colors.whiteAlpha[700]},
              ${theme.colors.orange[500]} 100%
            )`,
          zIndex: 0,
          pointerEvents: "none",
        }}
        _after={{
          content: `""`,
          position: "absolute",
          top: { sm: "8%", md: "5%" },
          left: { sm: "3%", lg: "5%" },
          display: { base: "none", sm: "block" },
          width: 40,
          height: "6px",
          borderRadius: "6px",
          transform: "rotate(-30deg)",
          background: `linear-gradient(
              to right,
              ${theme.colors.whiteAlpha[700]},
              ${theme.colors.orange[500]} 100%
            )`,
          zIndex: 0,
          // pointerEvents: "none",
        }}
      >
        <Box />
        <CompContainer
          as={Stack}
          spacing={16}
          position="relative"
          color="whiteAlpha.900"
          _before={{
            content: `url(/background-stars.svg)`,
            position: "absolute",
            left: "-20",
            top: 0,
            maxWidth: { base: "60%", md: "40%" },
          }}
          _after={{
            content: `url(/background-stars.svg)`,
            position: "absolute",
            right: 0,
            bottom: 0,
            maxWidth: { base: "60%", md: "45%" },
            zIndex: 0,
            pointerEvents: "none",
          }}
        >
          <Stack position="relative" zIndex={2} alignItems="center" spacing={0}>
            <Heading
              as="h1"
              size="sm"
              textAlign="center"
              textTransform="uppercase"
            >
              benefits
            </Heading>
            <Heading
              as="h2"
              maxWidth="lg"
              size="xl"
              textAlign="center"
              fontWeight="400"
            >
              How we helped our clients
            </Heading>
          </Stack>
          <Grid
            templateColumns={{ md: "repeat(2, 1fr)", base: "1fr" }}
            gap={16}
            px={8}
            zIndex={2}
          >
            {content.map((coulmn, index) => (
              <Stack key={index} spacing={8}>
                <Stack>
                  <Heading as="h1" size="lg">
                    {coulmn.title}
                  </Heading>
                  <Text minHeight={"80px"} fontSize="lg" fontWeight="400">
                    {coulmn.description}
                  </Text>
                </Stack>
              </Stack>
            ))}
          </Grid>
        </CompContainer>
      </Box>
      <Waves bottomWaves />
    </Box>
  );
};

const content = [
  {
    title: "Early stage tech guidance",
    description:
      "We work with early stage digital products to help define the technology path. We helped one of the startups attract over 150k active users in under a year from the idea stage.",
  },
  {
    title: "Performance optimisation",
    description:
      "We are top-tier experts in the JavaScript ecosystem. We helped one of our clients to improve their web app performance by over 350%",
  },
  {
    title: "Tech audits",
    description:
      "We have audited thousands of lines of code and work with brands like CaptureOne to optimize their solutions.",
  },
  {
    title: "Building from A to Z",
    description:
      "Want us to build your solution from the ground up? Don’t worry. We’ve got you covered, our deep engineering background means we love tech challenges.",
  },
];

export default Services;
