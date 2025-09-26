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
  const [categoryToEdit, setCategoryToEdit] = useState(null);


  useEffect(() => {
    fetchCategories();
  }, []);

  const handleOpenModal = (category = null) => {
    setCategoryToEdit(category);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setCategoryToEdit(null);
    setIsModalOpen(false);
    fetchCategories();
  };

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

  const categoryHeaders = ['ID', 'Nombre', 'Acciones'];
  const headerToKey = { 'ID': 'id', 'Nombre': 'nombre' };

  const renderCategoryRow = (category) => (
    <tr key={category.id}>
      <td>{category.id}</td>
      <td>{category.nombre}</td>
      <td>
        <ActionButtons>
          <Button onClick={() => handleOpenModal(category)}>✏️</Button>
          <Button onClick={() => handleDelete(category.id)}>🗑️</Button>
        </ActionButtons>
      </td>
    </tr>
  );

  if (isLoading) return <LoadingText>Cargando categorías...</LoadingText>;
  if (error) return <ErrorText>{error}</ErrorText>;

  return (
    <div>
      <h2>Categorías</h2>
      <Button onClick={() => handleOpenModal()}>╋</Button>
      <Table
        headers={categoryHeaders}
        data={categories}
        renderRow={renderCategoryRow}
        itemsPerPage={12}
        totalItems={categories.length}
        headerToKey={headerToKey}
      />

      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={categoryToEdit ? "Editar Categoría" : "Crear Categoría"}>
        <FormularioCategoria onSave={handleCloseModal} initialData={categoryToEdit || {}} />
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
