import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import styled from 'styled-components';

const Main = styled.main`
  flex: 1;
  padding: 20px;
  background-color: ${(props) => props.theme.colors.cardBackground};
  overflow-y: auto;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const Layout = ({ children, setTheme, toggleSidebar, isSidebarOpen }) => {
 
  return (
    <Container>
      <Header setTheme={setTheme} />
        <Sidebar isOpen={isSidebarOpen} /> 
        <Main toggleSidebar={toggleSidebar}>{children}</Main>
    </Container>
  );
};

export default Layout;
