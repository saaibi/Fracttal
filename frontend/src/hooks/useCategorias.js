import { useContext } from 'react';
import { CategoryContext } from '../contexto/CategoryContext';

export const useCategorias = () => {
  const context = useContext(CategoryContext);
  if (context === undefined) {
    throw new Error('useCategorias must be used within a CategoryProvider');
  }
  return context;
};
