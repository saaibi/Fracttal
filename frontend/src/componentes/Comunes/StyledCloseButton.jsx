import styled from "styled-components";

const StyledCloseButton = styled.button`
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: ${({theme}) => theme.colors.text};

  &:hover {
    color: ${(props) => props.theme.colors.danger};
  }
`;

export default StyledCloseButton;