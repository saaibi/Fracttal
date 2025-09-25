import React, { useEffect, useState } from 'react';
import { useTags } from '../../hooks/useTags';
import Modal from '../Comunes/Modal';
import FormularioEtiqueta from './FormularioEtiqueta';
import Button from '../Comunes/Button';
import Table from '../Comunes/Table';
import LoadingText from '../Comunes/LoadingText';
import ErrorText from '../Comunes/ErrorText';

const ListaEtiquetas = () => {
  const { tags, isLoading, error, fetchTags } = useTags();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    fetchTags();
  }, []);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => {
    setIsModalOpen(false);
    fetchTags();
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
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
  if (error) return <ErrorText>{error}</ErrorText>;

  return (
    <div>
      <h2>Etiquetas</h2>
      <Button onClick={handleOpenModal}>Crear Nueva Etiqueta</Button>
      <Table
        headers={tagHeaders}
        data={tags}
        renderRow={renderTagRow}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        totalItems={tags.length}
        onPageChange={handlePageChange}
        headerToKey={headerToKey}
      />

      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title="Crear Etiqueta">
        <FormularioEtiqueta onSave={handleCloseModal} />
      </Modal>
    </div>
  );
};

export default ListaEtiquetas;
