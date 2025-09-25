import React, { useState } from 'react';
import { useCategorias } from '../../hooks/useCategorias'; // Changed import path

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
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nombre de la Categoría:</label>
        <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
      </div>
      <button type="submit" disabled={isLoading}>Guardar Categoría</button>
    </form>
  );
};

export default FormularioCategoria;
