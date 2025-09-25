import React, { useEffect } from 'react';
import { useTareas } from '../../hooks/useTareas'; 

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

  if (isLoading) return <p>Cargando tareas...</p>;
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;

  return (
    <div>
      <h2>Tasks</h2>
      <button onClick={handleAddTask}>Add Task</button>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>{task.titulo}</li>
        ))}
      </ul>
    </div>
  );
};

export default ListaTareas;
