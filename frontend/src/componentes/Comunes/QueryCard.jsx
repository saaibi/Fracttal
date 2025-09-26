import React from 'react';
import styled from 'styled-components';

const CardContainer = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const CardTitle = styled.h3`
  margin-top: 0;
`;

const QueryResult = styled.div`
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }

  th {
    color: white;
    background-color: ${({ theme }) => theme.colors.primary};
  }
`;

const QueryCard = ({ title, data, loading, error }) => {

  if (loading) {
    return (
      <CardContainer>
        <CardTitle>{title}</CardTitle>
        <p>Loading...</p>
      </CardContainer>
    );
  }

  if (error) {
    return (
      <CardContainer>
        <CardTitle>{title}</CardTitle>
        <p>Error: {error.message}</p>
      </CardContainer>
    );
  }

  if (!data || data.length === 0) {
    return (
      <CardContainer>
        <CardTitle>{title}</CardTitle>
        <p>No data available.</p>
      </CardContainer>
    );
  }

  return (
    <CardContainer>
      <CardTitle>{title}</CardTitle>
      <QueryResult>
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
                  <td key={i}>{String(value)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      </QueryResult>
    </CardContainer>
  );
};

export default QueryCard;