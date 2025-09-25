import React from 'react';
import Header from './Header';
import styled from 'styled-components';

const Main = styled.main`
  flex: 1;
  padding: 20px;
  background-color: ${(props) => props.theme.colors.cardBackground};
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const Layout = ({ children, setTheme }) => {
  return (
    <Container>
      <Header setTheme={setTheme} />
      <Main>{children}</Main>
    </Container>
  );
};

export default Layout;