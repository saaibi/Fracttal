import React, { useState } from 'react';

const FormularioTarea = ({ onSubmit, initialData = {} }) => {
  const [titulo, setTitulo] = useState(initialData.titulo || '');
  const [descripcion, setDescripcion] = useState(initialData.descripcion || '');
  const [fechaVencimiento, setFechaVencimiento] = useState(initialData.fecha_vencimiento || '');
  const [prioridad, setPrioridad] = useState(initialData.prioridad || 1);
  const [categoriaId, setCategoriaId] = useState(initialData.categoria_id || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ titulo, descripcion, fecha_vencimiento: fechaVencimiento, prioridad, categoria_id: categoriaId });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Título:</label>
        <input type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} required />
      </div>
      <div>
        <label>Descripción:</label>
        <textarea value={descripcion} onChange={(e) => setDescripcion(e.target.value)}></textarea>
      </div>
      <div>
        <label>Fecha de Vencimiento:</label>
        <input type="date" value={fechaVencimiento} onChange={(e) => setFechaVencimiento(e.target.value)} />
      </div>
      <div>
        <label>Prioridad:</label>
        <select value={prioridad} onChange={(e) => setPrioridad(Number(e.target.value))}>
          <option value={1}>Baja</option>
          <option value={2}>Media</option>
          <option value={3}>Alta</option>
        </select>
      </div>
      <div>
        <label>Categoría:</label>
        <input type="text" value={categoriaId} onChange={(e) => setCategoriaId(e.target.value)} />
      </div>
      <button type="submit">Guardar Tarea</button>
    </form>
  );
};

export default FormularioTarea;
