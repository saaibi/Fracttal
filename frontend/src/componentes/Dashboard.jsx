import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import api from '../servicios/api';
import QueryCard from './Comunes/QueryCard';
import { useSnackbar } from '../hooks/useSnackbar';

const DashboardContainer = styled.div`
  padding: 2rem;
`;

const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 1rem;
`;

const availableQueries = [
  { id: 'userParticipationAnalysis', title: '1. Análisis de Participación de Usuarios' },
  { id: 'userProductivityPatterns', title: '4. Patrones de Productividad del Usuario' },
  { id: 'seasonalTrends', title: '9. Tendencias Estacionales' },
  { id: 'performanceBenchmarking', title: '10. Benchmarking de Rendimiento' },
  { id: 'userRetentionMetrics', title: '7. Métricas de Retención de Usuarios' },
  { id: 'overdueTaskAnalysis', title: '5. Análisis de Tareas Vencidas' },
  { id: 'priorityDistributionAnalysis', title: '8. Análisis de Distribución de Prioridad' },
  { id: 'completionRateTrends', title: '2. Tendencias de Tasa de Completado' },
  { id: 'tagUsageStatistics', title: '6. Estadísticas de Uso de Etiquetas' },
  { id: 'categoryPerformance', title: '3. Rendimiento por Categoría' }

];

const Dashboard = () => {
  const { showSnackbar } = useSnackbar();
  const [queryData, setQueryData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllQueries = async () => {
      try {
        const promises = availableQueries.map(query => api.get(`/bi/${query.id}`));
        const results = await Promise.all(promises);
        const allData = availableQueries.reduce((acc, query, index) => {
          acc[query.id] = results[index].data;
          return acc;
        }, {});
        setQueryData(allData);
      } catch (err) {
        showSnackbar(err)
      } finally {
        setLoading(false);
      }
    };

    fetchAllQueries();
  }, [showSnackbar]);

  return (
    <DashboardContainer>
      <h1>Business Intelligence Dashboard</h1>
      {loading && <p>Loading...</p>}
      {!loading && (
        <CardsContainer>
          {availableQueries.map(query => (
            <QueryCard
              key={query.id}
              title={query.title}
              data={queryData[query.id]}
            />
          ))}
        </CardsContainer>
      )}
    </DashboardContainer>
  );
};

export default Dashboard;
