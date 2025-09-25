import React from 'react';
import styled from 'styled-components';
import Button from './Button'; 

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

const Table = ({ headers, data, renderRow, currentPage, itemsPerPage, totalItems, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

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
          {currentData.map((item, index) => renderRow(item, index))}
        </tbody>
      </StyledTable>
      {totalPages > 1 && (
        <PaginationContainer>
          <PageButton onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
            Previous
          </PageButton>
          {pageNumbers.map((number) => (
            <PageButton
              key={number}
              onClick={() => onPageChange(number)}
              active={number === currentPage}
            >
              {number}
            </PageButton>
          ))}
          <PageButton onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
            Next
          </PageButton>
        </PaginationContainer>
      )}
    </TableWrapper>
  );
};

export default Table;
