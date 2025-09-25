import React, { createContext, useState } from 'react';
import api from '../servicios/api';

const TagContext = createContext(null);

export const TagProvider = ({ children }) => {
  const [tags, setTags] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTags = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.get('/etiquetas');
      setTags(response.data);
      setIsLoading(false);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch tags');
      setIsLoading(false);
    }
  };

  const createTag = async (tagData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.post('/etiquetas', tagData);
      setTags((prev) => [...prev, response.data]);
      setIsLoading(false);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create tag');
      setIsLoading(false);
      throw err; 
    }
  };

  const value = {
    tags,
    isLoading,
    error,
    fetchTags,
    createTag
  };

  return <TagContext.Provider value={value}>{children}</TagContext.Provider>;
};

export { TagContext };
