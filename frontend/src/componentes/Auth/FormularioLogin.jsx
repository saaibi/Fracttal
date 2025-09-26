import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Button from '../../componentes/Comunes/Button';
import FormGroup from '../../componentes/Comunes/FormGroup';
import ErrorText from '../../componentes/Comunes/ErrorText';
import LoadingText from '../../componentes/Comunes/LoadingText';
import FormContainer from '../../componentes/Comunes/FormContainer';
import Form from '../../componentes/Comunes/Form';
import styled from 'styled-components';
import { useSnackbar } from '../../hooks/useSnackbar';

const RegisterButtonContainer = styled.div`
  margin-top: 1rem;
  text-align: center;
`;

const FormularioLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading, error } = useAuth();
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();

  useEffect(() => {
    if (error) {
      showSnackbar(error, 'danger')
    }
  }, [error]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login({ email, password });
    if (success) {
      navigate('/');
    }
  };

  return (
    <FormContainer>
      <h2>Login</h2>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </FormGroup>
        <FormGroup>
          <label>Contraseña:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </FormGroup>
        <Button type="submit" disabled={isLoading}>Login</Button>
      </Form>
      {isLoading && <LoadingText>Cargando...</LoadingText>}
      {error && <ErrorText>{error}</ErrorText>}
      <RegisterButtonContainer>
        <p>Don't have an account?</p>
        <Link to="/register">
          <Button>Register</Button>
        </Link>
      </RegisterButtonContainer>
    </FormContainer>
  );
};

export default FormularioLogin;
