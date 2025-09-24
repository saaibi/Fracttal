import React from 'react';

const ItemTarea = ({ task }) => {
  return (
    <li>
      <h3>{task.titulo}</h3>
      <p>{task.descripcion}</p>
      <p>Due: {task.fecha_vencimiento}</p>
      <p>Priority: {task.prioridad}</p>
      <p>Completed: {task.completada ? 'Yes' : 'No'}</p>
      {task.categoria_nombre && <p>Category: {task.categoria_nombre}</p>}
      {task.etiquetas && <p>Tags: {task.etiquetas}</p>}
      {/* Add buttons for edit, delete, complete */}
    </li>
  );
};

export default ItemTarea;
