import styled from "styled-components";

const CompContainer = styled.div`
  margin: 0 10rem 0 10rem;
  display: flex;
  align-items: ${(props) => props.alignItems};
  justify-content: ${(props) => props.justifyContent};
`;

export default CompContainer;
