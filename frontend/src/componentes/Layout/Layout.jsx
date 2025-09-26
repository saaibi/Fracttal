import React, { useEffect } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const Content = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
`;

const Main = styled.main`
  flex: 1;
  padding: 20px;
  background-color: ${(props) => props.theme.colors.cardBackground};
  overflow-y: auto;
`;

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 50;
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
`;

const Layout = ({ children, setTheme, isSidebarOpen, closeSidebar }) => {

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeSidebar();
      }
    };
    if (isSidebarOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isSidebarOpen, closeSidebar]);

  return (
    <Container>
      <Header setTheme={setTheme} />
      <Content>
        <Backdrop isOpen={isSidebarOpen} onClick={closeSidebar} />
        <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
        <Main>{children}</Main>
      </Content>
    </Container>
  );
};

export default Layout;
