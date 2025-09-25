import React, { useState } from 'react';
import { useTags } from '../../hooks/useTags';
import Button from '../Comunes/Button';
import FormGroup from '../Comunes/FormGroup';
import Form from '../Comunes/Form';

const FormularioEtiqueta = ({ initialData = {}, onSave }) => {
  const [nombre, setNombre] = useState(initialData.nombre || '');
  const { createTag, updateTag, isLoading, error } = useTags();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (initialData.id) {
      await updateTag(initialData.id, { nombre });
    } else {
      await createTag({ nombre });
    }
    onSave();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <label>Nombre de la Etiqueta:</label>
        <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
      </FormGroup>
      <Button type="submit" disabled={isLoading}>Guardar Etiqueta</Button>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
    </Form>
  );
};

export default FormularioEtiqueta;
