import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Button from '../../componentes/Comunes/Button';
import FormGroup from '../../componentes/Comunes/FormGroup';
import ErrorText from '../../componentes/Comunes/ErrorText';
import LoadingText from '../../componentes/Comunes/LoadingText';
import FormContainer from '../../componentes/Comunes/FormContainer';
import Form from '../../componentes/Comunes/Form';
import styled from 'styled-components';
import { useSnackbar } from '../../hooks/useSnackbar';

const LoginButtonContainer = styled.div`
  margin-top: 1rem;
  text-align: center;
`;

const FormularioRegistro = () => {
  const { showSnackbar } = useSnackbar();
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register, isLoading, error } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      showSnackbar(error, 'danger')
    }
  }, [error]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await register({ nombre, email, password });
    if (success) {
      navigate('/login');
      showSnackbar('Se creo el usuario correctamente!')
    };
  };

  return (
    <FormContainer>
      <h2>Registro</h2>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <label>Nombre:</label>
          <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
        </FormGroup>
        <FormGroup>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </FormGroup>
        <FormGroup>
          <label>Contraseña:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </FormGroup>
        <Button type="submit" disabled={isLoading}>Registrar</Button>
      </Form>
      {isLoading && <LoadingText>Cargando...</LoadingText>}
      {error && <ErrorText>{error}</ErrorText>}
      <LoginButtonContainer>
        <p>Already have an account?</p>
        <Link to="/login">
          <Button>Login</Button>
        </Link>
      </LoginButtonContainer>
    </FormContainer>
  );
};

export default FormularioRegistro;
