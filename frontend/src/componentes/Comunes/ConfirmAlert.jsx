import React from 'react';
import styled from 'styled-components';
import Button from './Button';

const AlertOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const AlertContent = styled.div`
  background-color: ${(props) => props.theme.colors.cardBackground};
  color: ${(props) => props.theme.colors.text};
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  max-width: 400px;
  width: 90%;
  z-index: 1001;
  text-align: center;
`;

const AlertTitle = styled.h2`
  margin-top: 0;
  margin-bottom: 15px;
  font-size: 1.5rem;
`;

const AlertMessage = styled.p`
  margin-bottom: 20px;
  font-size: 1rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-around;
  gap: 10px;
`;

const StyledConfirmButton = styled(Button)` 
  background-color: ${(props) => props.theme.colors.danger};
  width: auto; 
  &:hover {
    opacity: 0.9;
  }
`;

const StyledCancelButton = styled(Button)` 
  background-color: ${(props) => props.theme.colors.secondary};
  width: auto;
  &:hover {
    opacity: 0.9;
  }
`;

const ConfirmAlert = ({ isOpen, onConfirm, onCancel, message, title = 'Confirmación' }) => {
  if (!isOpen) return null;

  return (
    <AlertOverlay onClick={onCancel}>
      <AlertContent onClick={(e) => e.stopPropagation()}>
        <AlertTitle>{title}</AlertTitle>
        <AlertMessage>{message}</AlertMessage>
        <ButtonGroup>
          <StyledConfirmButton onClick={onConfirm}>Confirmar</StyledConfirmButton>
          <StyledCancelButton onClick={onCancel}>Cancelar</StyledCancelButton>
        </ButtonGroup>
      </AlertContent>
    </AlertOverlay>
  );
};

export default ConfirmAlert;
