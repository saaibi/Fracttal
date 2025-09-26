import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import Button from './Button';

const TableWrapper = styled.div`
  overflow-x: auto;
  width: 100%;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
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
    cursor: pointer;

    .sort-arrow {
      display: inline-flex;
      flex-direction: column;
      margin-left: 5px;
      float: right;
    }
    .sort-arrow::before,
    .sort-arrow::after {
      content: "▲";
      font-size: 0.8em;
      line-height: 0.7;
      opacity: 0.3;
    }
    .sort-arrow::after {
      content: "▼";
    }
    .sort-arrow.asc::before {
      opacity: 1;
    }
    .sort-arrow.desc::after {
      opacity: 1;
    }
  }

  tr:nth-child(even) {
    background-color: ${(props) => props.theme.colors.cardBackground}aa;
  }

  tr:hover {
    background-color: ${(props) => props.theme.colors.cardBorder};
  }
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
  gap: 0.5rem;
`;

const PageButton = styled(Button)`
  width: auto;
  padding: 0.5rem 1rem;
  background-color: ${(props) => (props.active ? props.theme.colors.primary : props.theme.colors.secondary)};
  &:hover {
    background-color: ${(props) => (props.active ? props.theme.colors.primary : props.theme.colors.secondary)}cc;
  }
`;

const Table = ({ headers, data, renderRow, itemsPerPage, totalItems, headerToKey, label}) => {
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);

  const handleSort = (column) => {
    if (headers && headers.includes(column)) {
      if (sortColumn === column) {
        setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
      } else {
        setSortColumn(column);
        setSortDirection('asc');
      }
    }
  };

  const sortedData = useMemo(() => {
    const sorted = [...data];
    if (sortColumn && headerToKey) {
      const key = headerToKey[sortColumn];
      if (key) {
        sorted.sort((a, b) => {
          const aValue = a[key];
          const bValue = b[key];
          if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
          if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
          return 0;
        });
      }
    }
    return sorted;
  }, [data, sortColumn, sortDirection, headerToKey]);

  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = sortedData.slice(startIndex, endIndex);

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <TableWrapper>
      <span>{label}: {totalItems}</span>
      <StyledTable>
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index} onClick={() => handleSort(header)}>
                {header}
                {header !== 'Acciones' && (
                  <span className={`sort-arrow ${sortColumn === header ? sortDirection : ''}`}></span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentData.map((item, index) => renderRow(item, index))}
        </tbody>
      </StyledTable>
      {totalPages > 1 && (
        <PaginationContainer>
          <PageButton onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
            Anterior
          </PageButton>
          {pageNumbers.map((number) => (
            <PageButton
              key={number}
              onClick={() => setCurrentPage(number)}
              active={number === currentPage}
            >
              {number}
            </PageButton>
          ))}
          <PageButton onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
            Sigiente
          </PageButton>
        </PaginationContainer>
      )}
    </TableWrapper>
  );
};

export default Table;
