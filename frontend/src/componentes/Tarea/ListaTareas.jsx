import React, { useEffect } from 'react';
import { useTareas } from '../../hooks/useTareas';
import Table from '../Comunes/Table';
import Button from '../Comunes/Button';
import ActionButtons from '../Comunes/ActionButtons'; 
import LoadingText from '../Comunes/LoadingText';
import ErrorText from '../Comunes/ErrorText';

const ListaTareas = () => {
  const { tasks, fetchTasks, addTask, isLoading, error } = useTareas();

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAddTask = async () => {
    const taskTitle = prompt("Enter task title:");
    if (taskTitle) {
      await addTask({ titulo: taskTitle });
    }
  };

  const taskHeaders = ['ID', 'Título', 'Descripción', 'Fecha Vencimiento', 'Prioridad', 'Completada', 'Categoria', 'Etiquetas', 'Acciones'];

  const renderTaskRow = (task) => (
    <tr key={task.id}>
      <td>{task.id}</td>
      <td>{task.titulo}</td>
      <td>{task.descripcion}</td>
      <td>{task.fecha_vencimiento}</td>
      <td>{task.prioridad}</td>
      <td>{task.completada ? 'Sí' : 'No'}</td>
      <td>{task.categoria_nombre}</td>
      <td>{task.etiquetas}</td>
      <td>
        <ActionButtons>
          <Button onClick={() => console.log('Edit task', task.id)}>Editar</Button>
          <Button onClick={() => console.log('Delete task', task.id)}>Eliminar</Button>
        </ActionButtons>
      </td>
    </tr>
  );

  if (isLoading) return <LoadingText>Cargando tareas...</LoadingText>;
  if (error) return <ErrorText>{error}</ErrorText>;

  return (
    <div>
      <h2>Tasks</h2>
      <Button onClick={handleAddTask}>Add Task</Button>
      <Table headers={taskHeaders} data={tasks} renderRow={renderTaskRow} />
    </div>
  );
};

export default ListaTareas;
