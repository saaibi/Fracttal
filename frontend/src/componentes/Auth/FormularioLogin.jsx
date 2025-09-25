import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { useAuth } from '../../hooks/useAuth';
import Button from '../../componentes/Comunes/Button';
import FormGroup from '../../componentes/Comunes/FormGroup'; 
import ErrorText from '../../componentes/Comunes/ErrorText'; 
import LoadingText from '../../componentes/Comunes/LoadingText';
import Card from '../../componentes/Comunes/Card'; 

const FormularioLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading, error } = useAuth();
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login({ email, password });
    if (success) {
      navigate('/'); 
    }
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
