import React, { useState } from 'react';
import Form from '../Comunes/Form';
import FormGroup from '../Comunes/FormGroup';
import Button from '../Comunes/Button';

const FiltroTareas = ({ onFilterChange }) => {
  const [completada, setCompletada] = useState('');
  const [categoria, setCategoria] = useState('');
  const [prioridad, setPrioridad] = useState('');
  const [busqueda, setBusqueda] = useState('');
  const [fecha_vencimiento, setFechaVencimiento] = useState('');

  const handleFilter = (e) => {
    e.preventDefault();
    onFilterChange({ completada, categoria, prioridad, busqueda, fecha_vencimiento });
  };

  return (
    <Form onSubmit={handleFilter}>
      <h3>Filtrar Tareas</h3>
      <FormGroup>
        <label htmlFor="completada">Completada:</label>
        <select id="completada" value={completada} onChange={(e) => setCompletada(e.target.value)}>
          <option value="">Todos</option>
          <option value="true">Sí</option>
          <option value="false">No</option>
        </select>
      </FormGroup>
      <FormGroup>
        <label htmlFor="categoria">Categoría:</label>
        <input id="categoria" type="text" value={categoria} onChange={(e) => setCategoria(e.target.value)} />
      </FormGroup>
      <FormGroup>
        <label htmlFor="prioridad">Prioridad:</label>
        <select id="prioridad" value={prioridad} onChange={(e) => setPrioridad(e.target.value)}>
          <option value="">Todos</option>
          <option value="1">Baja</option>
          <option value="2">Media</option>
          <option value="3">Alta</option>
        </select>
      </FormGroup>
       <FormGroup>
        <label htmlFor="fecha_vencimiento">Fecha de Vencimiento:</label>
        <input id="fecha_vencimiento" type="date" value={fecha_vencimiento} onChange={(e) => setFechaVencimiento(e.target.value)} />
      </FormGroup>
      <FormGroup>
        <label htmlFor="busqueda">Búsqueda:</label>
        <input id="busqueda" type="text" value={busqueda} onChange={(e) => setBusqueda(e.target.value)} />
      </FormGroup>
      <Button type="submit">Aplicar Filtros</Button>
    </Form>
  );
};

export default FiltroTareas;
