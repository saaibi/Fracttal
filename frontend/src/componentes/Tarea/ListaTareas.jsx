import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTask } from '../../store/slices/tasksSlice';

const ListaTareas = () => {
  const tasks = useSelector((state) => state.tasks.tasks);
  const dispatch = useDispatch();

  const handleAddTask = () => {
    const taskName = prompt("Enter task name:");
    if (taskName) {
      dispatch(addTask({ id: Date.now(), name: taskName }));
    }
  };

  return (
    <div>
      <h2>Tasks</h2>
      <button onClick={handleAddTask}>Add Task</button>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>{task.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default ListaTareas;
