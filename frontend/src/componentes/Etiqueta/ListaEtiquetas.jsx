import React, { useEffect, useState } from 'react';
import { useTags } from '../../hooks/useTags';
import Modal from '../Comunes/Modal';
import FormularioEtiqueta from './FormularioEtiqueta';
import ConfirmAlert from '../Comunes/ConfirmAlert';
import Button from '../Comunes/Button';
import Table from '../Comunes/Table';
import ActionButtons from '../Comunes/ActionButtons';
import LoadingText from '../Comunes/LoadingText';
import ErrorText from '../Comunes/ErrorText';

const ListaEtiquetas = () => {
  const { tags, isLoading, error, fetchTags, deleteTag } = useTags();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmAlertOpen, setIsConfirmAlertOpen] = useState(false);
  const [tagIdToDelete, setTagIdToDelete] = useState(null);

  useEffect(() => {
    fetchTags();
  }, []);

  const handleDelete = (id) => {
    setTagIdToDelete(id);
    setIsConfirmAlertOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (tagIdToDelete) {
      await deleteTag(tagIdToDelete);
      fetchTags();
      setTagIdToDelete(null);
      setIsConfirmAlertOpen(false);
    }
  };

  const handleCancelDelete = () => {
    setTagIdToDelete(null);
    setIsConfirmAlertOpen(false);
  };

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => {
    setIsModalOpen(false);
    fetchTags();
  };

  const tagHeaders = ['ID', 'Nombre', 'Acciones'];

  const renderTagRow = (tag) => (
    <tr key={tag.id}>
      <td>{tag.id}</td>
      <td>{tag.nombre}</td>
      <td>
        <ActionButtons> 
          <Button onClick={() => handleDelete(tag.id)}>Eliminar</Button>
          {/* Add edit button */}
        </ActionButtons>
      </td>
    </tr>
  );

  if (isLoading) return <LoadingText>Cargando categorías...</LoadingText>;
  if (error) return <ErrorText>{error}</ErrorText>;

  return (
    <div>
      <h2>Etiquetas</h2>
      <Button onClick={handleOpenModal}>Crear Nueva Etiqueta</Button>
      <Table headers={tagHeaders} data={tags} renderRow={renderTagRow} />

      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title="Crear Etiqueta">
        <FormularioEtiqueta onSave={handleCloseModal} />
      </Modal>

      <ConfirmAlert
        isOpen={isConfirmAlertOpen}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        message="¿Estás seguro de que quieres eliminar esta etiqueta?"
        title="Confirmar Eliminación"
      />
    </div>
  );
};

export default ListaEtiquetas;
