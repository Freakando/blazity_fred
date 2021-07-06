import styled from "styled-components";

export const NavSection = styled.div``;

export const NavBox = styled.header`
  height: 6rem;
  width: 100%;
  box-shadow: 0px 0.1px 6px grey;

  /* position: absolute; */
`;

export const BlazityLogo = styled.p`
  font-size: 1.8rem;
  text-transform: uppercase;
  letter-spacing: 0.4rem;
  font-weight: 600;
  cursor: pointer;
`;

export const NavMenu = styled.ul`
  display: flex;
  justify-content: space-around;
  align-items: center;
  list-style: none;
  direction: row;
  width: 30%;
  min-width: 400px;
`;

export const NavButtons = styled.li`
  border-top: 4px solid;
  border-bottom: 4px solid;
  border-top-color: transparent;
  border-bottom-color: transparent;
  cursor: pointer;
  text-transform: uppercase;
  font-size: 1rem;
  font-weight: 500;

  &:hover {
    color: #e65300;
    transition-duration: 0.1s;
  }
`;

export const RigthElementNavBox = styled.div``;
