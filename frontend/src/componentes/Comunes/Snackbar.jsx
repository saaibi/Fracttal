import React, { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    top: -50px;
    opacity: 0;
  }
  to {
    top: 20px;
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    top: 20px;
    opacity: 1;
  }
  to {
    top: -50px;
    opacity: 0;
  }
`;

const SnackbarContainer = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 16px;
  border-radius: 4px;
  color: white;
  background-color: ${({ type, theme }) =>
    type === 'success' ? theme.colors.success : theme.colors.danger};
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  animation: ${fadeIn} 0.5s, ${fadeOut} 0.5s 2.5s;
  z-index: 2000;
`;

const Snackbar = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); 
    return () => {
      clearTimeout(timer);
    };
  }, [onClose]);

  return <SnackbarContainer type={type}>{message}</SnackbarContainer>;
};

export default Snackbar;
