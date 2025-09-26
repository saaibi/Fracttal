import React, { useState } from 'react';
import styled from 'styled-components';
import { useBI } from '../hooks/useBI';

const DashboardContainer = styled.div`
  padding: 2rem;
`;

const QuerySelector = styled.div`
  margin-bottom: 2rem;
`;

const QueryResult = styled.div`
  margin-top: 2rem;
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th, td {
    border: 1px solid #ddd;
    padding: 8px;
  }

  th {
    background-color: #f2f2f2;
    text-align: left;
  }
`;

const availableQueries = [
  'userParticipationAnalysis',
  'completionRateTrends',
  'categoryPerformance',
  'userProductivityPatterns',
  'overdueTaskAnalysis',
  'tagUsageStatistics',
  'userRetentionMetrics',
  'priorityDistributionAnalysis',
  'seasonalTrends',
  'performanceBenchmarking',
];

const Dashboard = () => {
  const { data, loading, error, executeGetQuery } = useBI();
  const [selectedQuery, setSelectedQuery] = useState(availableQueries[0]);

  const handleQueryChange = (e) => {
    setSelectedQuery(e.target.value);
  };

  const handleExecuteGetQuery = () => {
    executeGetQuery(selectedQuery);
  };

  return (
    <DashboardContainer>
      <h1>Business Intelligence Dashboard</h1>
      <QuerySelector>
        <h2>Pre-defined Queries</h2>
        <select onChange={handleQueryChange} value={selectedQuery}>
          {availableQueries.map((query) => (
            <option key={query} value={query}>
              {query}
            </option>
          ))}
        </select>
        <button onClick={handleExecuteGetQuery} disabled={loading}>
          Execute
        </button>
      </QuerySelector>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}

      {data && (
        <QueryResult>
          <h2>Query Result</h2>
          <Table>
            <thead>
              <tr>
                {Object.keys(data[0] || {}).map((key) => (
                  <th key={key}>{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={index}>
                  {Object.values(row).map((value, i) => (
                    <td key={i}>{value}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </Table>
        </QueryResult>
      )}
    </DashboardContainer>
  );
};

export default Dashboard;
