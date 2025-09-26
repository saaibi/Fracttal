import React, { useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import styled, { ThemeContext } from 'styled-components';
import { darkTheme, lightTheme } from '../../theme';
import { useAuth } from '../../hooks/useAuth';
import Modal from '../Comunes/Modal';
import Button from '../Comunes/Button';
import ThemeToggleButton from '../Comunes/ThemeToggleButton';
import Popover from '../Comunes/Popover';

const HeaderContainer = styled.header`
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  h1 {
    margin: 0;
    font-size: 1.5rem;
    display: block;

    @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
     display: none;
    }
  }
`;

const NavPopover = styled(ThemeToggleButton)`
  display: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
     display: block;
  }
`;

const Nav = styled.nav`
  flex: 1;
  display: flex;
  justify-content: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;

const NavLinks = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.cardBackground};
  border-radius: 4px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.2);

  li {
    margin: 0 0.5rem;
  }

  a {
    color: ${({ theme }) => theme.colors.text};
    text-decoration: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    transition: background-color 0.3s, color 0.3s;

    &:hover {
      background-color: ${({ theme }) => theme.colors.primary};
      color: white;
      text-decoration: none;
    }

    &.active {
      background-color: ${({ theme }) => theme.colors.primary};
      color: white;
    }
  }
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  
  ul {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
  }
  
  li {
    margin-left: 1rem;
  }
`;

const UserInfo = styled.div`
  padding: 1rem;
  text-align: center;

  p {
    margin: 0.5rem 0;
  }
`;

const Header = ({ setTheme }) => {
  const { user, logout } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);
  const themeContext = useContext(ThemeContext);
  const isDarkTheme = themeContext.id === 'dark';

  const handleLogout = () => {
    logout();
    setModalOpen(false);
  };

  return (
    <HeaderContainer>
      <Popover
        trigger={<NavPopover>☰</NavPopover>}
        content={({ close }) => (
          <div>
            <NavLink onClick={() => close()} to="/">Tareas</NavLink>
            <NavLink onClick={() => close()} to="/categorias">Categorias</NavLink>
            <NavLink onClick={() => close()} to="/tags">Etiquetas</NavLink>
          </div>
        )}
      />
      <h1>Fracttal App</h1>
      <Nav>
        <NavLinks>
          <li><NavLink to="/" end className={({ isActive }) => isActive ? "active" : ""}>Tareas</NavLink></li>
          <li><NavLink to="/categorias" className={({ isActive }) => isActive ? "active" : ""}>Categorias</NavLink></li>
          <li><NavLink to="/tags" className={({ isActive }) => isActive ? "active" : ""}>Etiquetas</NavLink></li>
        </NavLinks>
      </Nav>
      <HeaderActions>
        <ul>
          <li>
            <ThemeToggleButton onClick={() => setTheme(isDarkTheme ? lightTheme : darkTheme)}>
              {isDarkTheme ? '☀️' : '🌙'}
            </ThemeToggleButton>
          </li>
          <li>
            <ThemeToggleButton onClick={() => setModalOpen(true)}>
              👤
            </ThemeToggleButton>
          </li>
          <li>
            <ThemeToggleButton onClick={handleLogout}>➜🚪</ThemeToggleButton>
          </li>
        </ul>
      </HeaderActions>
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Información del usuario">
        {user && (
          <UserInfo>
            <p><strong>Name:</strong> {user.nombre}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <Button onClick={handleLogout}>Logout</Button>
          </UserInfo>
        )}
      </Modal>
    </HeaderContainer>
  );
};

export default Header;