import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useTareas } from '../../hooks/useTareas';
import Table from '../Comunes/Table';
import Button from '../Comunes/Button';
import ActionButtons from '../Comunes/ActionButtons';
import LoadingText from '../Comunes/LoadingText';
import ErrorText from '../Comunes/ErrorText';
import Modal from '../Comunes/Modal';
import ConfirmAlert from '../Comunes/ConfirmAlert';
import Chip from '../Comunes/Chip';
import FormularioTarea from './FormularioTarea';

const ListaTareas = () => {
  const { tasks, fetchTasks, deleteTask, isLoading, error } = useTareas();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [isConfirmAlertOpen, setIsConfirmAlertOpen] = useState(false);
  const [taskIdToDelete, setTaskIdToDelete] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleOpenModal = (task = null) => {
    setTaskToEdit(task);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setTaskToEdit(null);
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    setTaskIdToDelete(id);
    setIsConfirmAlertOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (taskIdToDelete) {
      await deleteTask(taskIdToDelete);
      fetchTasks();
      setTaskIdToDelete(null);
      setIsConfirmAlertOpen(false);
    }
  };

  const handleCancelDelete = () => {
    setTaskIdToDelete(null);
    setIsConfirmAlertOpen(false);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const setPrioridad = id => ({ 1: "Baja", 2: "Media", 3: "Alta", }[id] || '');

  const taskHeaders = ['ID', 'Título', 'Descripción', 'Fecha Vencimiento', 'Prioridad', 'Completada', 'Categoria', 'Etiquetas', 'Acciones'];
  const headerToKey = {
    'ID': 'id',
    'Título': 'titulo',
    'Descripción': 'descripcion',
    'Fecha Vencimiento': 'fecha_vencimiento',
    'Prioridad': 'prioridad',
    'Completada': 'completada',
    'Categoria': 'categoria_nombre',
    'Etiquetas': 'etiquetas',
  };

  const renderTaskRow = (task) => (
    <tr key={task.id}>
      <td>{task.id}</td>
      <td>{task.titulo}</td>
      <td>{task.descripcion}</td>
      <td>{moment(task.fecha_vencimiento).format('DD/MM/YYYY')}</td>
      <td>{setPrioridad(task.prioridad)}</td>
      <td>{task.completada ? 'Sí' : 'No'}</td>
      <td>{task.categoria_nombre}</td>
      <td>
        {task.etiquetas && task.etiquetas.split(', ').map((tag, index) => (
          <Chip key={index}>{tag}</Chip>
        ))}
      </td>
      <td>
        <ActionButtons>
          <Button onClick={() => handleOpenModal(task)}>Editar</Button>
          <Button onClick={() => handleDelete(task.id)}>Eliminar</Button>
        </ActionButtons>
      </td>
    </tr>
  );

  if (isLoading) return <LoadingText>Cargando tareas...</LoadingText>;
  if (error) return <ErrorText>{error}</ErrorText>;

  return (
    <div>
      <h2>Tasks</h2>
      <Button onClick={() => handleOpenModal()}>Add Task</Button> {/* Button to open modal for new task */}
      <Table
        headers={taskHeaders}
        data={tasks}
        renderRow={renderTaskRow}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        totalItems={tasks.length}
        onPageChange={handlePageChange}
        headerToKey={headerToKey}
      />

      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={taskToEdit ? "Editar Tarea" : "Crear Tarea"}>
        <FormularioTarea
          initialData={taskToEdit ? taskToEdit : {}}
          onSave={() => {
            handleCloseModal();
            fetchTasks();
          }}
          isNewTask={!taskToEdit} />
      </Modal>

      <ConfirmAlert
        isOpen={isConfirmAlertOpen}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        message="¿Estás seguro de que quieres eliminar esta tarea?"
        title="Confirmar Eliminación"
      />
    </div>
  );
};

export default ListaTareas;
