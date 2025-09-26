import React, { useEffect, useState } from 'react';
import { useTags } from '../../hooks/useTags';
import Modal from '../Comunes/Modal';
import FormularioEtiqueta from './FormularioEtiqueta';
import Button from '../Comunes/Button';
import Table from '../Comunes/Table';
import LoadingText from '../Comunes/LoadingText';
import { useSnackbar } from '../../hooks/useSnackbar';

const ListaEtiquetas = () => {
  const { tags, isLoading, fetchTags, error } = useTags();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { showSnackbar } = useSnackbar();

  useEffect(() => {
    fetchTags();
  }, []);

  useEffect(() => {
      if (error) {
        showSnackbar(error, 'danger')
      }
  }, [error]);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => {
    setIsModalOpen(false);
    fetchTags();
  };

  const tagHeaders = ['ID', 'Nombre'];
  const headerToKey = { 'ID': 'id', 'Nombre': 'nombre' };

  const renderTagRow = (tag) => (
    <tr key={tag.id}>
      <td>{tag.id}</td>
      <td>{tag.nombre}</td>
    </tr>
  );

  if (isLoading) return <LoadingText>Cargando etiquetas...</LoadingText>;
 
  return (
    <div>
      <h2>Etiquetas</h2>
      <Button onClick={handleOpenModal}>╋</Button>
      <Table
        label="Etiquetas"
        headers={tagHeaders}
        data={tags}
        renderRow={renderTagRow}
        itemsPerPage={12}
        totalItems={tags.length}
        headerToKey={headerToKey}
      />

      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title="Crear Etiqueta">
        <FormularioEtiqueta onSave={handleCloseModal} />
      </Modal>
    </div>
  );
};

export default ListaEtiquetas;
