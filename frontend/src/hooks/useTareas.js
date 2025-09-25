import { useContext } from 'react';
import { TaskContext } from '../contexto/TaskContext';

export const useTareas = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTareas must be used within a TaskProvider');
  }
  return context;
};
