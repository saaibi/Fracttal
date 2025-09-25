import styled from 'styled-components';

const Button = styled.button`
  background-color: ${(props) => props.theme.colors.primary};
  color: white;
  padding: 0.8rem 1.2rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  width: auto;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: ${(props) => props.theme.colors.primary}cc;
  }

  &:disabled {
    background-color: ${(props) => props.theme.colors.secondary};
    cursor: not-allowed;
  }
`;

export default Button;
