import styled from 'styled-components';

const Card = styled.div`
  background-color: ${({theme}) => theme.colors.cardBackground};
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  max-width: 400px;
`;

export default Card;
