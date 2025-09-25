import React, { useEffect, useState } from 'react';
import { useCategorias } from '../../hooks/useCategorias';
import Modal from '../Comunes/Modal';
import FormularioCategoria from './FormularioCategoria';
import ConfirmAlert from '../Comunes/ConfirmAlert';
import Button from '../Comunes/Button';
import Table from '../Comunes/Table';
import ActionButtons from '../Comunes/ActionButtons';
import LoadingText from '../Comunes/LoadingText';
import ErrorText from '../Comunes/ErrorText';

const ListaCategorias = () => {
  const { categories, isLoading, error, fetchCategories, deleteCategory } = useCategorias();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmAlertOpen, setIsConfirmAlertOpen] = useState(false);
  const [categoryIdToDelete, setCategoryIdToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); 
  const itemsPerPage = 12; 

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

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const categoryHeaders = ['ID', 'Nombre', 'Acciones'];

  const renderCategoryRow = (category) => (
    <tr key={category.id}>
      <td>{category.id}</td>
      <td>{category.nombre}</td>
      <td>
        <ActionButtons>
          <Button onClick={() => handleDelete(category.id)}>Eliminar</Button>
          {/* Add edit button */}
        </ActionButtons>
      </td>
    </tr>
  );

  if (isLoading) return <LoadingText>Cargando categorías...</LoadingText>;
  if (error) return <ErrorText>{error}</ErrorText>;

  return (
    <div>
      <h2>Categorías</h2>
      <Button onClick={handleOpenModal}>Crear Nueva Categoría</Button>
      <Table
        headers={categoryHeaders}
        data={categories}
        renderRow={renderCategoryRow}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        totalItems={categories.length}
        onPageChange={handlePageChange}
      />

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
