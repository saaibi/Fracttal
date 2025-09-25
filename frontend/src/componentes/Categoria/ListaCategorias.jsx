import React, { useEffect } from 'react';
import { useCategorias } from '../../hooks/useCategorias'; // Changed import path

const ListaCategorias = () => {
  const { categories, isLoading, error, fetchCategories, deleteCategory } = useCategorias();

  useEffect(() => {
    fetchCategories();
  }, []); // Empty dependency array as fetchCategories is stable from context

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      await deleteCategory(id);
    }
  };

  if (isLoading) return <p>Cargando categorías...</p>;
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;

  return (
    <div>
      <h2>Categorías</h2>
      <ul>
        {categories.map((category) => (
          <li key={category.id}>
            {category.nombre}
            <button onClick={() => handleDelete(category.id)}>Eliminar</button>
            {/* Add edit button */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListaCategorias;
