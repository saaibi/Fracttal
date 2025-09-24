import React, { useState } from 'react';

const FiltroTareas = ({ onFilterChange }) => {
  const [completada, setCompletada] = useState('');
  const [categoria, setCategoria] = useState('');
  const [prioridad, setPrioridad] = useState('');
  const [busqueda, setBusqueda] = useState('');

  const handleFilter = () => {
    onFilterChange({ completada, categoria, prioridad, busqueda });
  };

  return (
    <div>
      <h3>Filtrar Tareas</h3>
      <div>
        <label>Completada:</label>
        <select value={completada} onChange={(e) => setCompletada(e.target.value)}>
          <option value="">Todos</option>
          <option value="true">Sí</option>
          <option value="false">No</option>
        </select>
      </div>
      <div>
        <label>Categoría:</label>
        <input type="text" value={categoria} onChange={(e) => setCategoria(e.target.value)} />
      </div>
      <div>
        <label>Prioridad:</label>
        <select value={prioridad} onChange={(e) => setPrioridad(e.target.value)}>
          <option value="">Todos</option>
          <option value="1">Baja</option>
          <option value="2">Media</option>
          <option value="3">Alta</option>
        </select>
      </div>
      <div>
        <label>Búsqueda:</label>
        <input type="text" value={busqueda} onChange={(e) => setBusqueda(e.target.value)} />
      </div>
      <button onClick={handleFilter}>Aplicar Filtros</button>
    </div>
  );
};

export default FiltroTareas;
