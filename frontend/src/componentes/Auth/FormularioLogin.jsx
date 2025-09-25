import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import styled from 'styled-components';

const Card = styled.div`
  background-color: ${({theme}) => theme.colors.background};
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  max-width: 400px;
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;

  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: bold;
    color: #333;
  }

  input {
    width: 100%;
    padding: 0.8rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
  }
`;

const Button = styled.button`
  background-color: ${({theme}) => theme.colors.primary};
  color: white;
  padding: 0.8rem 1.2rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  width: 100%;

  &:disabled {
    background-color: ${({theme}) => theme.colors.background};
    cursor: not-allowed;
  }
`;

const ErrorText = styled.p`
  color: red;
  margin-top: 1rem;
  text-align: center;
`;

const LoadingText = styled.p`
  text-align: center;
  margin-top: 1rem;
`;

const FormularioLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading, error } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login({ email, password });
  };

  return (
    <Card>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </FormGroup>
        <FormGroup>
          <label>Contraseña:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </FormGroup>
        <Button type="submit" disabled={isLoading}>Login</Button>
      </form>
      {isLoading && <LoadingText>Cargando...</LoadingText>}
      {error && <ErrorText>{error}</ErrorText>}
    </Card>
  );
};

export default FormularioLogin;
