import styled from "styled-components";

const ThemeToggleButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: white;
  margin-left: 1rem;

  &:hover {
    color: ${({ theme }) => theme.colors.warning};
  }
`;


export default ThemeToggleButton;