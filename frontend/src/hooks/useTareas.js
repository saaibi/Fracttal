import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks } from '../store/slices/tasksSlice';

export const useTareas = (filters) => {
  const dispatch = useDispatch();
  const { tasks, isLoading, error } = useSelector((state) => state.tasks);

  useEffect(() => {
    dispatch(fetchTasks(filters));
  }, [dispatch, filters]);

  return { tasks, isLoading, error };
};
