import React, { useState, useEffect } from 'react';
import { useTareas } from '../../hooks/useTareas';
import { useCategorias } from '../../hooks/useCategorias';
import Button from '../Comunes/Button';
import FormGroup from '../Comunes/FormGroup';
import ErrorText from '../Comunes/ErrorText';
import LoadingText from '../Comunes/LoadingText';
import Form from '../Comunes/Form';
import { useTags } from '../../hooks/useTags';

const FormularioTarea = ({ initialData = {}, onSave, isNewTask }) => {
  const today = new Date().toISOString().split('T')[0];
  const [titulo, setTitulo] = useState(initialData.titulo || '');
  const [descripcion, setDescripcion] = useState(initialData.descripcion || '');
  const [fechaVencimiento, setFechaVencimiento] = useState(initialData.fecha_vencimiento || '');
  const [prioridad, setPrioridad] = useState(initialData.prioridad || 1);
  const [lote, setLote] = useState(initialData.prioridad || '');
  const [categoriaId, setCategoriaId] = useState(initialData.categoria_id || '');
  const [errorFecha, setErrorFecha] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);

  const { tags, fetchTags } = useTags();
  const { addTask, updateTask, isLoading, error } = useTareas();
  const { categories, fetchCategories } = useCategorias();


  useEffect(() => {
    fetchCategories();
    fetchTags();
  }, []);

    useEffect(() => {
    if (initialData.etiquetas && typeof initialData.etiquetas === 'string' && tags.length > 0) {
      const initialTagNames = initialData.etiquetas.split(', ').map(name => name.trim());
      const tagIds = tags.filter(tag => initialTagNames.includes(tag.nombre)).map(tag => tag.id);
      setSelectedTags(tagIds);
    }
  }, [initialData.etiquetas, tags]);

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    if (selectedDate < today) {
      setErrorFecha('La fecha de vencimiento no puede ser anterior a la fecha actual.');
    } else {
      setErrorFecha('');
    }
    setFechaVencimiento(selectedDate);
  };

   const handleTagChange = (e) => {
    const value = Array.from(e.target.selectedOptions, option => parseInt(option.value));
    setSelectedTags(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (errorFecha) {
      return;
    }
    const taskData = {
      titulo,
      descripcion,
      fecha_vencimiento: fechaVencimiento || null,
      prioridad: parseInt(prioridad),
      lote,
      categoria_id: categoriaId ? parseInt(categoriaId) : null,
      etiquetas: selectedTags
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
    <Form onSubmit={handleSubmit}>
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
        <input type="date" min={today} value={fechaVencimiento} onChange={handleDateChange} required={isNewTask} />
        {errorFecha && <ErrorText>{errorFecha}</ErrorText>}
      </FormGroup>
      <FormGroup>
        <label>Prioridad:</label>
        <select value={prioridad} onChange={(e) => setPrioridad(e.target.value)}>
          <option value={1}>Baja</option>
          <option value={2}>Media</option>
          <option value={3}>Alta</option>
        </select>
      </FormGroup>
      {isNewTask && <FormGroup>
        <label>Lote:</label>
        <input type="text" value={lote} onChange={(e) => setLote(e.target.value)} />
      </FormGroup>}
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
      <FormGroup>
        <label>Etiquetas:</label>
        <select multiple={true} value={selectedTags} onChange={handleTagChange}>
          {tags.map((tag) => (
            <option key={tag.id} value={tag.id}>
              {tag.nombre}
            </option>
          ))}
        </select>
      </FormGroup>
      <Button type="submit" disabled={isLoading || !!errorFecha}>
        {initialData.id ? 'Actualizar Tarea' : 'Crear Tarea'}
      </Button>
      {isLoading && <LoadingText>Guardando...</LoadingText>}
      {error && <ErrorText>{error}</ErrorText>}
    </Form>
  );
};

export default FormularioTarea;