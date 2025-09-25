import React, { createContext, useState, useContext } from 'react';
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
      throw err; // Re-throw to allow component to handle
    }
  };

  const updateTag = async (id, tagData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.put(`/etiquetas/${id}`, tagData);
      setTags((prev) =>
        prev.map((tag) => (tag.id === id ? response.data : tag))
      );
      setIsLoading(false);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update tag');
      setIsLoading(false);
      throw err; // Re-throw to allow component to handle
    }
  };

  const deleteTag = async (id) => {
    setIsLoading(true);
    setError(null);
    try {
      await api.delete(`/etiquetas/${id}`);
      setTags((prev) => prev.filter((tag) => tag.id !== id));
      setIsLoading(false);
      return true;
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to delete tag');
      setIsLoading(false);
      throw err; // Re-throw to allow component to handle
    }
  };

  const value = {
    tags,
    isLoading,
    error,
    fetchTags,
    createTag,
    updateTag,
    deleteTag,
  };

  return <TagContext.Provider value={value}>{children}</TagContext.Provider>;
};

export { TagContext };
