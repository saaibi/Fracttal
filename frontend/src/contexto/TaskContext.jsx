import React, { createContext, useState } from 'react';
import api from '../servicios/api';

const TaskContext = createContext(null);

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTasks = async (filters = {}) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.get('/tareas', { params: filters });
      setTasks(response.data);
      setIsLoading(false);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch tasks');
      setIsLoading(false);
    }
  };

  const addTask = async (taskData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.post('/tareas', taskData);
      setTasks((prev) => [...prev, response.data]);
      setIsLoading(false);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to add task');
      setIsLoading(false);
      throw err; // Re-throw to allow component to handle
    }
  };

  // Add other task related functions (update, delete) if needed later

  const value = {
    tasks,
    isLoading,
    error,
    fetchTasks,
    addTask,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

export { TaskContext };
