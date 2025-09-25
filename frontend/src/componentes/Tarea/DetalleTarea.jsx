import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import Chip from '../Comunes/Chip';

const DetailsContainer = styled.div`
  padding: 1rem;
  background-color: ${({ theme }) => theme.colors.cardBackground};
  color: ${({ theme }) => theme.colors.text};
`;

const DetailItem = styled.div`
  margin-bottom: 1rem;
  strong {
    display: block;
    margin-bottom: 0.25rem;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const setPrioridad = id => ({ 1: "Baja", 2: "Media", 3: "Alta", }[id] || '');

const DetalleTarea = ({ task }) => {
  if (!task) return null;

  return (
    <DetailsContainer>
      <DetailItem>
        <strong>Título:</strong>
        {task.titulo}
      </DetailItem>
      <DetailItem>
        <strong>Descripción:</strong>
        {task.descripcion}
      </DetailItem>
      <DetailItem>
        <strong>Fecha Vencimiento:</strong>
        {moment(task.fecha_vencimiento).format('DD/MM/YYYY')}
      </DetailItem>
      <DetailItem>
        <strong>Prioridad:</strong>
        {setPrioridad(task.prioridad)}
      </DetailItem>
       <DetailItem>
        <strong>Lote:</strong>
        {task.lote}
      </DetailItem>
      <DetailItem>
        <strong>Completada:</strong>
        {task.completada ? 'Sí' : 'No'}
      </DetailItem>
      <DetailItem>
        <strong>Categoría:</strong>
        {task.categoria_nombre}
      </DetailItem>
      <DetailItem>
        <strong>Etiquetas:</strong>
        {task.etiquetas && task.etiquetas.split(', ').map((tag, index) => (
          <Chip key={index}>{tag}</Chip>
        ))}
      </DetailItem>
    </DetailsContainer>
  );
};

export default DetalleTarea;
