import styled from "styled-components";

const Button = styled.button`
  min-width: 3rem;
  height: 3rem;
  border-radius: 0.375rem;
  background-color: ${(props) => props.backgroundColor};
  padding-right: 1.5rem;
  padding-left: 1.5rem;
  margin-right: 1rem;
  cursor: pointer;
  color: ${(props) => props.textColor};
  border: 0px;
  font-weight: 600;
  font-size: ${(props) => props.fontSize};
  text-transform: uppercase;

  &:hover {
    background-color: ${(props) => props.hoverBcgColor};
    transition-duration: 0.3s;
  }
`;

export default Button;
