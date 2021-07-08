import CompContainer from "../components/CompContainer";
import { Stack, Grid } from "@chakra-ui/react";
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
          <Stack>
            <Title>
              We use bleeding edge tech to build faster, more secure and
              converting web.
            </Title>
          </Stack>
          <TitleComment>
            We work with JAMStack - modern architecture that is faster, more
            secure and more scalable compared to mainstream, monolithic
            solutions.
          </TitleComment>
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
