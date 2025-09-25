import React, { useEffect, useState } from 'react';
import { useCategorias } from '../../hooks/useCategorias';
import Modal from '../Comunes/Modal';
import FormularioCategoria from './FormularioCategoria';
import ConfirmAlert from '../Comunes/ConfirmAlert';
import Button from '../Comunes/Button'; 

const ListaCategorias = () => {
  const { categories, isLoading, error, fetchCategories, deleteCategory } = useCategorias();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmAlertOpen, setIsConfirmAlertOpen] = useState(false);
  const [categoryIdToDelete, setCategoryIdToDelete] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = (id) => {
    setCategoryIdToDelete(id);
    setIsConfirmAlertOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (categoryIdToDelete) {
      await deleteCategory(categoryIdToDelete);
      fetchCategories();
      setCategoryIdToDelete(null);
      setIsConfirmAlertOpen(false);
    }
  };

  const handleCancelDelete = () => {
    setCategoryIdToDelete(null);
    setIsConfirmAlertOpen(false);
  };

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => {
    setIsModalOpen(false);
    fetchCategories();
  };

  if (isLoading) return <p>Cargando categorías...</p>;
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;

  return (
    <div>
      <h2>Categorías</h2>
      <Button onClick={handleOpenModal}>Crear Nueva Categoría</Button> 
      <ul>
        {categories.map((category) => (
          <li key={category.id}>
            {category.nombre}
            <Button onClick={() => handleDelete(category.id)}>Eliminar</Button> 
            {/* Add edit button */}
          </li>
        ))}
      </ul>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title="Crear Categoría">
        <FormularioCategoria onSave={handleCloseModal} />
      </Modal>

      <ConfirmAlert
        isOpen={isConfirmAlertOpen}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        message="¿Estás seguro de que quieres eliminar esta categoría?"
        title="Confirmar Eliminación"
      />
    </div>
  );
};

export default ListaCategorias;
