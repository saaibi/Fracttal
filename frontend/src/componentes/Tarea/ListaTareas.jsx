import React, { useEffect, useMemo, useState } from 'react';
import moment from 'moment';
import styled from 'styled-components';
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
import Popover from '../Comunes/Popover';

const ActionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  margin: 0;
`;

const SeacrchContainer = styled.div`
   width: 30%;
`;

const SearchInput = styled.input`
  width: 80%;
  padding: 0.8rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  font-family: inherit;
`;

const ThemeButton = styled(ThemeToggleButton)`
  color: ${({ theme }) => theme.colors.primary};

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`;

const StyleSpan = styled.span`
  color: ${({ theme, priority }) => {
    switch (priority) {
      case "baja":
        return theme.colors.info;
      case "media":
        return theme.colors.warning;
      case "alta":
        return theme.colors.danger;
      default:
        return theme.colors.primary
    }
  }};
`

const StyleTr = styled.tr`
 cursor: pointer;
 background-color: ${({ theme }) => theme.colors.primary} !important;
`

const ListaTareas = ({ toggleSidebar }) => {
  const { tasks, fetchTasks, deleteTask, completeTask, isLoading, error, onFilterChange } = useTareas();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [isConfirmAlertOpen, setIsConfirmAlertOpen] = useState(false);
  const [taskIdToDelete, setTaskIdToDelete] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [taskToView, setTaskToView] = useState(null);
  const [busqueda, setBusqueda] = useState(undefined);
  const [groupBy, setGroupBy] = useState(null);
  const [collapsedGroups, setCollapsedGroups] = useState({});

  const toggleGroup = (groupName) => {
    setCollapsedGroups(prev => ({ ...prev, [groupName]: !prev[groupName] }));
  };

  const setPrioridadView = id => ({
    1: <StyleSpan priority="baja">Baja</StyleSpan>,
    2: <StyleSpan priority="media">Media</StyleSpan>,
    3: <StyleSpan priority="alta">Alta</StyleSpan>,
  }[id] || '');

  const setPrioridad = id => ({
    1: "Baja",
    2: "Media",
    3: "Alta",
  }[id] || '');

  const { tableData, currentHeaders, headerToKey } = useMemo(() => {
    const baseHeaders = ['ID', 'Título', 'Descripción', 'Fecha Vencimiento', 'Prioridad', 'Lote', 'Completada', 'Categoria', 'Etiquetas', 'Acciones'];
    const baseHeaderToKey = {
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

    if (!groupBy) {
      return { tableData: tasks, currentHeaders: baseHeaders, headerToKey: baseHeaderToKey };
    }

    const currentHeaders = baseHeaders.filter(h => h.toLowerCase() !== groupBy);

    const sortedTasks = [...tasks].sort((a, b) => {
      let aGroup, bGroup;
      if (groupBy === 'categoria') {
        aGroup = a.categoria_nombre || 'Sin Categoría';
        bGroup = b.categoria_nombre || 'Sin Categoría';
      } else if (groupBy === 'prioridad') {
        aGroup = setPrioridad(a.prioridad);
        bGroup = setPrioridad(b.prioridad);
      }
      if (aGroup < bGroup) return -1;
      if (aGroup > bGroup) return 1;
      return 0;
    });

    const tableData = [];
    let lastGroup = null;
    sortedTasks.forEach(task => {
      let currentGroup;
      if (groupBy === 'categoria') {
        currentGroup = task.categoria_nombre || 'Sin Categoría';
      } else if (groupBy === 'prioridad') {
        currentGroup = setPrioridad(task.prioridad);
      }

      if (currentGroup !== lastGroup) {
        tableData.push({ isGroup: true, name: currentGroup });
        lastGroup = currentGroup;
      }
      tableData.push(task);
    });

    return { tableData, currentHeaders, headerToKey: baseHeaderToKey };
  }, [tasks, groupBy]);

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    if (onFilterChange) {
      const cleanFilters = Object.fromEntries(
        Object.entries(onFilterChange).filter(([, v]) => v !== '')
      );
      fetchTasks(cleanFilters);
    }
  }, [onFilterChange]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (busqueda !== undefined) {
        fetchTasks({ busqueda });
      }
    }, 1200);

    return () => {
      clearTimeout(timer);
    };
  }, [busqueda]);

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

  const handleExportCSV = () => {
    const headers = currentHeaders.filter(h => h !== 'Acciones');
    const csvRows = [
      headers.join(','),
    ];

    tasks.forEach(task => {
      const row = headers.map(header => {
        const key = headerToKey[header];
        let value = task[key];
        if (typeof value === 'string' && value.includes(',')) {
          value = `"${value}"`;
        }
        return value;
      });
      csvRows.push(row.join(','));
    });

    const csvString = csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'tareas.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportJSON = () => {
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(tasks, null, 2))}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = "tareas.json";
    link.click();
  };

  const renderRow = (item) => {
    if (item.isGroup) {
      return (
        <StyleTr key={item.name} onClick={() => toggleGroup(item.name)}>
          <td colSpan={currentHeaders.length}>
            <strong>{item.name}</strong> ({collapsedGroups[item.name] ? '+' : '-'})
          </td>
        </StyleTr>
      );
    }

    const task = item;
    let groupOfTask;
    if (groupBy === 'categoria') {
      groupOfTask = task.categoria_nombre || 'Sin Categoría';
    } else if (groupBy === 'prioridad') {
      groupOfTask = setPrioridad(task.prioridad);
    }

    if (groupBy && collapsedGroups[groupOfTask]) {
      return null;
    }

    return (
      <tr key={task.id}>
        {currentHeaders.map(header => {
          if (header === 'Acciones') {
            return (
              <td key={header}>
                <ActionButtons>
                  <Button onClick={() => handleOpenViewModal(task)}>👁️</Button>
                  <Button onClick={() => handleOpenModal(task)}>✏️</Button>
                  <Button onClick={() => handleDelete(task.id)}>🗑️</Button>
                </ActionButtons>
              </td>
            );
          }
          if (header === 'Etiquetas') {
            return (
              <td key={header}>
                {task.etiquetas && task.etiquetas.split(', ').map((tag, index) => (
                  <Chip key={index}>{tag}</Chip>
                ))}
              </td>
            );
          }
          if (header === 'Prioridad') {
            return <td key={header}>{setPrioridadView(task.prioridad)}</td>;
          }
          if (header === 'Fecha Vencimiento') {
            return <td key={header}>{moment(task.fecha_vencimiento).format('DD/MM/YYYY')}</td>;
          }
          if (header === 'Completada') {
            return <td key={header}>{task.completada ? 'SI' : 'NO'}</td>;
          }
          return <td key={header}>{task[headerToKey[header]]}</td>;
        })}
      </tr>
    );
  };

  if (isLoading) return <LoadingText>Cargando tareas...</LoadingText>;
  if (error) return <ErrorText>{error}</ErrorText>;

  return (
    <div>
      <h2>Tareas</h2>
      <ActionContainer>
        <div>
          <Button onClick={() => handleOpenModal()}>╋</Button>
          <ThemeButton onClick={() => fetchTasks()}>⟳ Refrescar</ThemeButton>
          <ThemeButton onClick={toggleSidebar}>ᯤ Filtro</ThemeButton>
          <Popover
            trigger={<ThemeButton>🗂️ Agrupar</ThemeButton>}
            content={({ close }) => (
              <div>
                <a onClick={() => { setGroupBy('categoria'); close(); }}>Categoría</a>
                <a onClick={() => { setGroupBy('prioridad'); close(); }}>Prioridad</a>
                {groupBy && <a onClick={() => { setGroupBy(null); close(); }}>Quitar</a>}
              </div>
            )}
          />
        </div>
        <SeacrchContainer>
          <SearchInput type="text" placeholder="Buscar..." id="busqueda" value={busqueda || ''} onChange={(e) => setBusqueda(e.target.value)} />
        </SeacrchContainer>
        <div>
          <ThemeButton onClick={handleExportCSV}>📥 CSV</ThemeButton>
          <ThemeButton onClick={handleExportJSON}>💾 JSON</ThemeButton>
        </div>
      </ActionContainer>
      <Table
        label="Tareas"
        headers={currentHeaders}
        data={tableData}
        renderRow={renderRow}
        itemsPerPage={100}
        totalItems={tableData.length}
        headerToKey={headerToKey}
      />

      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={taskToEdit ? "Editar Tarea" : "Crear Tarea"}>
        <FormularioTarea
          initialData={taskToEdit || {}}
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
          {!taskToView?.completada ? "Marcar como Completada" : "Marcar como Incompleta"}
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
