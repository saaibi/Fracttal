import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  background-color: ${({theme}) => theme.colors.cardBackground};
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

const Header = () => {
  return (
    <HeaderContainer>
      <h1>Fracttal App</h1>
      <Nav>
        <ul>
          <li><Link to="/">Tasks</Link></li>
          <li><Link to="/categorias">Categories</Link></li>
        </ul>
      </Nav>
    </HeaderContainer>
  );
};

export default Header;