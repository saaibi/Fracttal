import React, { useState } from 'react';
import { useCategorias } from '../../hooks/useCategorias';
import styled from 'styled-components'; 
import Button from '../../componentes/Comunes/Button'; 
import FormGroup from '../../componentes/Comunes/FormGroup'; 

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FormularioCategoria = ({ initialData = {}, onSave }) => {
  const [nombre, setNombre] = useState(initialData.nombre || '');
  const { createCategory, updateCategory, isLoading } = useCategorias();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (initialData.id) {
      await updateCategory(initialData.id, { nombre });
    } else {
      await createCategory({ nombre });
    }
    onSave();
  };

  return (
    <FormContainer onSubmit={handleSubmit}> 
      <FormGroup>
        <label>Nombre de la Categoría:</label>
        <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
      </FormGroup>
      <Button type="submit" disabled={isLoading}>Guardar Categoría</Button> 
    </FormContainer>
  );
};

export default FormularioCategoria;
