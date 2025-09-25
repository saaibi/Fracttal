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
      throw err;
    }
  };

  const updateTask = async (id, taskData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.put(`/tareas/${id}`, taskData);
      setTasks((prev) =>
        prev.map((task) => (task.id === id ? response.data : task))
      );
      setIsLoading(false);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update task');
      setIsLoading(false);
      throw err;
    }
  };

  const deleteTask = async (id) => {
    setIsLoading(true);
    setError(null);
    try {
      await api.delete(`/tareas/${id}`);
      setTasks((prev) => prev.filter((task) => task.id !== id));
      setIsLoading(false);
      return true;
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to delete task');
      setIsLoading(false);
      throw err;
    }
  };

  const completeTask = async (id) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.patch(`/tareas/${id}/completar`, { completada: true });
      setTasks((prev) =>
        prev.map((task) => (task.id === id ? response.data : task))
      );
      setIsLoading(false);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to complete task');
      setIsLoading(false);
      throw err;
    }
  };

  const value = {
    tasks,
    isLoading,
    error,
    fetchTasks,
    addTask,
    updateTask,
    deleteTask,
    completeTask,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

export { TaskContext };
