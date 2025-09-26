import React, { useState } from 'react';
import { useCategorias } from '../../hooks/useCategorias';
import Button from '../../componentes/Comunes/Button';
import FormGroup from '../../componentes/Comunes/FormGroup';
import Form from '../../componentes/Comunes/Form';
import { useSnackbar } from '../../hooks/useSnackbar';

const FormularioCategoria = ({ initialData = {}, onSave }) => {
  const [nombre, setNombre] = useState(initialData.nombre || '');
  const { createCategory, updateCategory, isLoading } = useCategorias();
  const { showSnackbar } = useSnackbar();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (initialData.id) {
      updateCategory(initialData.id, { nombre }).then(()=> showSnackbar('Se actualizo la categoria correctamente!'));
    } else {
      createCategory({ nombre }).then(()=> showSnackbar('Se creo la categoria correctamente!'));
    }
    onSave();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <label>Nombre de la Categoría:</label>
        <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
      </FormGroup>
      <Button type="submit" disabled={isLoading}>
        {initialData.id ? 'Actualizar Categoría' : 'Crear Categoría'}
      </Button>
    </Form>
  );
};

export default FormularioCategoria;
