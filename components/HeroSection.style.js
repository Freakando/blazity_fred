import styled from "styled-components";

export const HeroSection = styled.div`
  /* margin-top: 8rem; */
  width: 100%;
  height: calc(100vh - 6rem);
  display: flex;
`;

export const Image = styled.img`
  height: 80%;
  max-height: 80vw;
  width: auto;
  position: absolute;
  right: 0px;
  z-index: -1;
`;

export const ThemeBox = styled.div`
  max-width: 35rem;
  height: calc(100vh - 6rem);
  display: flex;
  justify-content: left;
  padding-top: 5rem;
`;

export const ThemeTitle = styled.h1`
  font-size: 3.75rem;
  font-weight: 700;
  display: flex;
  justify-content: center;
`;

export const ThemeSubTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 300;
  line-height: 1.5;
`;

export const HeroButtonBox = styled.div``;
