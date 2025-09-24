import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createCategory, updateCategory } from '../../store/slices/categoriesSlice';

const FormularioCategoria = ({ initialData = {}, onSave }) => {
  const [nombre, setNombre] = useState(initialData.nombre || '');
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.categories);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (initialData.id) {
      dispatch(updateCategory({ id: initialData.id, categoryData: { nombre } }));
    } else {
      dispatch(createCategory({ nombre }));
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
