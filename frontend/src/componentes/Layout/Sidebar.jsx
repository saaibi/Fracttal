import React from 'react';
import styled from 'styled-components';
import FiltroTareas from '../Tarea/FiltroTareas';
import { useTareas } from '../../hooks/useTareas';

const Aside = styled.aside`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 250px;
  padding: 20px;
  background-color: ${({theme}) => theme.colors.cardBackground};
  border-right: 1px solid ${({theme}) => theme.colors.cardBorder};
  color: ${({theme}) => theme.colors.text};
  transition: transform 0.3s ease-in-out;
  transform: ${({ isOpen }) => (isOpen ? 'translateX(0)' : 'translateX(-100%)')};
  z-index: 100;
  overflow-y: auto;

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

const Sidebar = ({ isOpen }) => {
  const { onFilterChange } = useTareas();

  return (
    <Aside isOpen={isOpen}>
      {<FiltroTareas onFilterChange={onFilterChange} />}
    </Aside>
  );
};

export default Sidebar;
