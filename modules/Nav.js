import React from "react";
import { useRouter } from "next/router";
import CompContainer from "../components/CompContainer";
import Link from "next/link";
import Button from "../components/Button";
import {
  NavSection,
  NavMenu,
  BlazityLogo,
  NavButtons,
  NavBox,
  RigthElementNavBox,
} from "../components/Navigation.style";

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

const Nav = () => {
  const router = useRouter();
  return (
    <>
      <NavSection>
        <NavBox>
          <CompContainer alignItems="center" justifyContent="space-between">
            <Link href="/" passHref>
              <BlazityLogo>Blazity</BlazityLogo>
            </Link>
            <NavMenu>
              {navLinks.map((navLink) => (
                <NavButtons key={navLink.pathname}>
                  <Link href={navLink.pathname} passHref activeStyle>
                    <cLink>{navLink.name}</cLink>
                  </Link>
                </NavButtons>
              ))}
            </NavMenu>
            <RigthElementNavBox>
              <Button
                backgroundColor="#e65300"
                hoverBcgColor="#8a3200"
                textColor="white"
                fontSize="rgba(255, 255, 255, 0.92)"
              >
                get a quote
              </Button>
              <switch>on/off</switch>
            </RigthElementNavBox>
          </CompContainer>
        </NavBox>
      </NavSection>
    </>
  );
};

// export default Nav;
