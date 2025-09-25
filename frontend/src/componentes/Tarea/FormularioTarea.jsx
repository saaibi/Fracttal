import React, { useState, useEffect } from 'react';
import { useTareas } from '../../hooks/useTareas';
import { useCategorias } from '../../hooks/useCategorias';
import styled from 'styled-components';
import Button from '../Comunes/Button';
import FormGroup from '../Comunes/FormGroup';
import ErrorText from '../Comunes/ErrorText';
import LoadingText from '../Comunes/LoadingText';

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FormularioTarea = ({ initialData = {}, onSave, isNewTask }) => {
  const [titulo, setTitulo] = useState(initialData.titulo || '');
  const [descripcion, setDescripcion] = useState(initialData.descripcion || '');
  const [fechaVencimiento, setFechaVencimiento] = useState(initialData.fecha_vencimiento || '');
  const [prioridad, setPrioridad] = useState(initialData.prioridad || 1);
  const [categoriaId, setCategoriaId] = useState(initialData.categoria_id || '');

  const { addTask, updateTask, isLoading, error } = useTareas();
  const { categories, fetchCategories } = useCategorias();


  useEffect(() => {
    fetchCategories();
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    const taskData = {
      titulo,
      descripcion,
      fecha_vencimiento: fechaVencimiento || null,
      prioridad: parseInt(prioridad),
      categoria_id: categoriaId ? parseInt(categoriaId) : null,
    };

    try {
      if (initialData.id) {
        await updateTask(initialData.id, taskData);
      } else {
        await addTask(taskData);
      }
      onSave();
    } catch (err) {
      console.error(err)
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <FormGroup>
        <label>Título:</label>
        <input type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} required />
      </FormGroup>
      <FormGroup>
        <label>Descripción:</label>
        <textarea value={descripcion} onChange={(e) => setDescripcion(e.target.value)}></textarea>
      </FormGroup>
      <FormGroup>
        <label>Fecha de Vencimiento:</label>
        <input type="date" value={fechaVencimiento} onChange={(e) => setFechaVencimiento(e.target.value)} required={isNewTask} />
      </FormGroup>
      <FormGroup>
        <label>Prioridad:</label>
        <select value={prioridad} onChange={(e) => setPrioridad(e.target.value)}>
          <option value={1}>Baja</option>
          <option value={2}>Media</option>
          <option value={3}>Alta</option>
        </select>
      </FormGroup>
      <FormGroup>
        <label>Categoría:</label>
        <select value={categoriaId} onChange={(e) => setCategoriaId(e.target.value)} required={isNewTask}>
          <option value="">Seleccionar Categoría</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.nombre}
            </option>
          ))}
        </select>
      </FormGroup>
      <Button type="submit" disabled={isLoading}>
        {initialData.id ? 'Actualizar Tarea' : 'Crear Tarea'}
      </Button>
      {isLoading && <LoadingText>Guardando...</LoadingText>}
      {error && <ErrorText>{error}</ErrorText>}
    </FormContainer>
  );
};

export default FormularioTarea;