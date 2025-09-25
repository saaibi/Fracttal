import React from 'react';
import styled from 'styled-components';

const TableWrapper = styled.div`
  overflow-x: auto;
  width: 100%;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
  background-color: ${(props) => props.theme.colors.cardBackground};
  color: ${(props) => props.theme.colors.text};

  th,
  td {
    padding: 8px 11px;
    border: 1px solid ${(props) => props.theme.colors.cardBorder};
    text-align: left;
  }

  th {
    background-color: ${(props) => props.theme.colors.primary};
    color: white;
    font-weight: bold;
  }

  tr:nth-child(even) {
    background-color: ${(props) => props.theme.colors.cardBackground}aa;
  }

  tr:hover {
    background-color: ${(props) => props.theme.colors.cardBorder};
  }
`;

const Table = ({ headers, data, renderRow }) => {
  return (
    <TableWrapper>
      <StyledTable>
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => renderRow(item, index))}
        </tbody>
      </StyledTable>
    </TableWrapper>
  );
};

export default Table;
