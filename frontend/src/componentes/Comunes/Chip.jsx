import styled from 'styled-components';

const Chip = styled.span`
  display: inline-block;
  padding: 0.2em 0.6em;
  margin: 0 0.2em 0.2em 0;
  border-radius: 1em;
  background-color: ${(props) => props.theme.colors.secondary};
  color: white;
  font-size: 0.8em;
  font-weight: bold;
`;

export default Chip;
