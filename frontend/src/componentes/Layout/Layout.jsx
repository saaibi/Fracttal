import React from 'react';
import Header from './Header';

const Layout = ({ children, setTheme }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Header setTheme={setTheme} />
      <main style={{ flex: 1, padding: '20px' }}>{children}</main>
    </div>
  );
};

export default Layout;