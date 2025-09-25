import React, { useEffect, useState, useCallback } from 'react';
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
import DetalleTarea from './DetalleTarea';
import ThemeToggleButton from '../Comunes/ThemeToggleButton';

const ListaTareas = ({toggleSidebar}) => {
  const { tasks, fetchTasks, deleteTask, completeTask, isLoading, error } = useTareas();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [isConfirmAlertOpen, setIsConfirmAlertOpen] = useState(false);
  const [taskIdToDelete, setTaskIdToDelete] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [taskToView, setTaskToView] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  // const handleFilterChange = useCallback((filters) => {
  //   const cleanFilters = Object.fromEntries(
  //     Object.entries(filters).filter(([, v]) => v !== '')
  //   );
  //   fetchTasks(cleanFilters);
  // }, [fetchTasks]);

//    useEffect(() => {                                                                                                                           
//      if (setOnFilterChange) {                                                                                                                  
//     setOnFilterChange(() => handleFilterChange);                                                                                            
//     }                                                                                                                                         
//  }, [setOnFilterChange, handleFilterChange]);  

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

  const handleOpenViewModal = (task) => {
    setTaskToView(task);
    setIsViewModalOpen(true);
  };

  const handleCloseViewModal = () => {
    setTaskToView(null);
    setIsViewModalOpen(false);
  };

  const handleCompleteTask = async (id, completada) => {
    await completeTask(id, completada);
    fetchTasks();
  };

  const setPrioridad = id => ({ 1: "Baja", 2: "Media", 3: "Alta", }[id] || '');

  const taskHeaders = ['ID', 'Título', 'Descripción', 'Fecha Vencimiento', 'Prioridad', 'Lote', 'Completada', 'Categoria', 'Etiquetas', 'Acciones'];
  const headerToKey = {
    'ID': 'id',
    'Título': 'titulo',
    'Descripción': 'descripcion',
    'Fecha Vencimiento': 'fecha_vencimiento',
    'Prioridad': 'prioridad',
    'Lote': 'lote',
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
      <td>{task.lote}</td>
      <td>{task.completada ? 'Sí' : 'No'}</td>
      <td>{task.categoria_nombre}</td>
      <td>
        {task.etiquetas && task.etiquetas.split(', ').map((tag, index) => (
          <Chip key={index}>{tag}</Chip>
        ))}
      </td>
      <td>
        <ActionButtons>
          <Button onClick={() => handleOpenViewModal(task)}>Ver</Button>
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
      <h2>Tareas</h2>
      <Button onClick={() => handleOpenModal()}>Crear Nueva Tarea</Button> 
      <ThemeToggleButton onClick={toggleSidebar}>☰</ThemeToggleButton>
      <Table
        headers={taskHeaders}
        data={tasks}
        renderRow={renderTaskRow}
        itemsPerPage={100}
        totalItems={tasks.length}
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

      <Modal isOpen={isViewModalOpen} onClose={handleCloseViewModal} title="Detalle de Tarea">
        <DetalleTarea task={taskToView} />
        <Button
          onClick={() => {
            handleCompleteTask(taskToView?.id, !taskToView?.completada);
            handleCloseViewModal();
          }} 
        >
         {!taskToView?.completada ?  "Marcar como Completada" : "Marcar como Incompleta"}
        </Button>
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