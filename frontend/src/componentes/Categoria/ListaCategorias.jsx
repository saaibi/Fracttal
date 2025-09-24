import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories, deleteCategory } from '../../store/slices/categoriesSlice';

const ListaCategorias = () => {
  const dispatch = useDispatch();
  const { categories, isLoading, error } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      dispatch(deleteCategory(id));
    }
  };

  if (isLoading) return <p>Cargando categorías...</p>;
  if (error) return <p style={{ color: 'red' }}>Error: {error.message}</p>;

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
