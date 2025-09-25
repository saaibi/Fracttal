import React, { createContext, useState } from 'react';
import api from '../servicios/api';

const CategoryContext = createContext(null);

export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCategories = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.get('/categorias');
      setCategories(response.data);
      setIsLoading(false);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch categories');
      setIsLoading(false);
    }
  };

  const createCategory = async (categoryData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.post('/categorias', categoryData);
      setCategories((prev) => [...prev, response.data]);
      setIsLoading(false);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create category');
      setIsLoading(false);
      throw err; 
    }
  };

  const updateCategory = async (id, categoryData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.put(`/categorias/${id}`, categoryData);
      setCategories((prev) =>
        prev.map((cat) => (cat.id === id ? response.data : cat))
      );
      setIsLoading(false);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update category');
      setIsLoading(false);
      throw err; 
    }
  };

  const deleteCategory = async (id) => {
    setIsLoading(true);
    setError(null);
    try {
      await api.delete(`/categorias/${id}`);
      setCategories((prev) => prev.filter((cat) => cat.id !== id));
      setIsLoading(false);
      return true;
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to delete category');
      setIsLoading(false);
      throw err; 
    }
  };

  const value = {
    categories,
    isLoading,
    error,
    fetchCategories,
    createCategory,
    updateCategory,
    deleteCategory,
  };

  return <CategoryContext.Provider value={value}>{children}</CategoryContext.Provider>;
};

export { CategoryContext };
