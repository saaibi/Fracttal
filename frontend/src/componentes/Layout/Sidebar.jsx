import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Aside = styled.aside`
  width: 200px;
  padding: 20px;
  background-color: ${({theme}) => theme.colors.cardBackground};
  border-right: 1px solid ${({theme}) => theme.colors.cardBorder};
  color: ${({theme}) => theme.colors.text};

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    margin-bottom: 10px;
  }

  a {
    text-decoration: none;
    color: ${({theme}) => theme.colors.text};
    &:hover {
      color: ${({theme}) => theme.colors.primary};
    }
  }
`;

const Sidebar = () => {

  return (
    <Aside>
      <nav>
        <ul>
          <li><Link to="/">Tasks</Link></li>
          <li><Link to="/categorias">Categories</Link></li>
          <li><Link to="/tags">Tags</Link></li>
        </ul>
      </nav>
    </Aside>
  );
};

export default Sidebar;