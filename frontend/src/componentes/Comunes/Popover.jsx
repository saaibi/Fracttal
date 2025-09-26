import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const PopoverContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const PopoverContent = styled.div`
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;

  a {
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
    cursor: pointer;

    &:hover {background-color: #f1f1f1}
  }
`;

const Popover = ({ trigger, content }) => {
  const [isOpen, setIsOpen] = useState(false);

   useEffect(() => {
      const handleKeyDown = (event) => {
        if (event.key === 'Escape') {
          setIsOpen(false);
        }
      };
      if (isOpen) {
        document.addEventListener('keydown', handleKeyDown);
      }
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }, [isOpen]);

  return (
    <PopoverContainer>
      {React.cloneElement(trigger, { onClick: () => setIsOpen(prev => !prev) })}
      <PopoverContent isOpen={isOpen}>
        {content({ close: () => setIsOpen(false) })}
      </PopoverContent>
    </PopoverContainer>
  );
};

export default Popover;
