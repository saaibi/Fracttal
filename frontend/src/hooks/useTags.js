import { useContext } from 'react';
import { TagContext } from '../contexto/TagContext';

export const useTags = () => {
  const context = useContext(TagContext);
  if (context === undefined) {
    throw new Error('useTags must be used within a TagProvider');
  }
  return context;
};
