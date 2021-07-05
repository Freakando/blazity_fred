import CompContainer from "../components/CompContainer";
import {
  WhoWeAreSection,
  TitleBox,
  Title,
  TitleComment,
  TextBox,
  Quote,
  Reference,
} from "../components/WhoWeAre.style";

const WhoAreWe = () => {
  return (
    <CompContainer>
      <WhoWeAreSection>
        <TitleBox>
          <Title>
            We use bleeding edge tech to build faster, more secure and
            converting web.
          </Title>
          <TitleComment>
            We work with JAMStack - modern architecture that is faster, more
            secure and more scalable compared to mainstream, monolithic
            solutions.
          </TitleComment>
        </TitleBox>
        <TextBox>
          <Quote>
            “It is very easy to simply trust Blazity to just get the project
            done in the right way.”
          </Quote>
          <Reference>Nathan Joens, CEO, Structurely</Reference>
        </TextBox>
      </WhoWeAreSection>
    </CompContainer>
  );
};

export default WhoAreWe;
