import styled from 'styled-components';

const ErrorText = styled.p`
  color: ${(props) => props.theme.colors.danger};
  margin-top: 1rem;
  text-align: center;
`;

export default ErrorText;
