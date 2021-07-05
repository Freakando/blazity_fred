import AppContainer from "../components/AppContainer";
import Button from "../components/Button";
import {
  HeroSection,
  Image,
  ThemeBox,
  ThemeTitle,
  ThemeSubTitle,
} from "../components/HeroSection.style";
import CompContainer from "../components/CompContainer";

const Hero = () => {
  return (
    <HeroSection>
      <Image src="/rocket-bg2.svg" alt="rocket" />
      <CompContainer>
        <ThemeBox>
          <div>
            <ThemeTitle>
              Blazing fast webapps, no more headaches for the CMO
            </ThemeTitle>
            <ThemeSubTitle>
              We work with busy tech executives, entrepreneurs and founders on a
              constant <b> 5-star client satisfaction</b> level
            </ThemeSubTitle>
            <div>
              <Button backgroundColor="#e65300" textColor="white">
                let&apos;s talk
              </Button>
              <Button backgroundColor="yellow" textColor="#e65300">
                our work -&gt;
              </Button>
            </div>
          </div>
        </ThemeBox>
      </CompContainer>
      <div></div>
    </HeroSection>
  );
};

export default Hero;
