import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import Button from '../../componentes/Comunes/Button';
import FormGroup from '../../componentes/Comunes/FormGroup';
import ErrorText from '../../componentes/Comunes/ErrorText';
import LoadingText from '../../componentes/Comunes/LoadingText';
import Card from '../../componentes/Comunes/Card'; 

const FormularioRegistro = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register, isLoading, error } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await register({ nombre, email, password });
  };

  return (
    <Card>
      <h2>Registro</h2>
      <form onSubmit={handleSubmit}>
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
      </form>
      {isLoading && <LoadingText>Cargando...</LoadingText>}
      {error && <ErrorText>{error}</ErrorText>}
    </Card>
  );
};

export default FormularioRegistro;
