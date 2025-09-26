import React, { createContext, useState } from 'react';
import api from '../servicios/api';

const BIContext = createContext();

export const BIProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const executeGetQuery = async (queryName) => {
    try {
      setLoading(true);
      const result = await api.get(`/bi/${queryName}`);
      setData(result.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const executePostQuery = async (query) => {
    try {
      setLoading(true);
      const result = await api.post('/bi/query', query);
      setData(result.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    loading,
    error,
    data,
    executeGetQuery,
    executePostQuery,
  };

  return <BIContext.Provider value={value}>{children}</BIContext.Provider>;
};

export { BIContext }