import React from 'react';
import { Link } from 'react-router-dom';
import styled, { ThemeContext } from 'styled-components';
import { darkTheme, lightTheme } from '../../theme';
import { useContext } from 'react';
import { useAuth } from '../../hooks/useAuth';

const HeaderContainer = styled.header`
  background-color: ${({theme}) => theme.colors.primary};
  color: ${({theme}) => theme.colors.text};
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  h1 {
    margin: 0;
    font-size: 1.5rem;
  }
`;

const Nav = styled.nav`
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
  }

  li {
    margin-left: 1rem;
  }

  a {
    color: ${({theme}) => theme.colors.text};
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const ThemeToggleButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: ${({theme}) => theme.colors.text};
  margin-left: 1rem;

  &:hover {
    color: ${({theme}) => theme.colors.text};
  }
`;


const Header = ({setTheme}) => {
   const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  const themeContext = useContext(ThemeContext)
  const isDarkTheme = themeContext.id === 'dark';

  return (
    <HeaderContainer>
      <h1>Fracttal App</h1>
      <Nav>
        <ul>
          <li><Link to="/">Tareas</Link></li>
          <li><Link to="/categorias">Categorias</Link></li>
          <li><Link to="/tags">Etiquetas</Link></li>
           <li>
            <ThemeToggleButton onClick={() => setTheme(isDarkTheme ? lightTheme : darkTheme)}>
              {isDarkTheme ? '☀️' : '🌙'} 
            </ThemeToggleButton>
          </li>
          <li><ThemeToggleButton>👤</ThemeToggleButton></li>
           <li><ThemeToggleButton onClick={handleLogout}>➜🚪</ThemeToggleButton></li> 
        </ul>
      </Nav>
    </HeaderContainer>
  );
};

export default Header;