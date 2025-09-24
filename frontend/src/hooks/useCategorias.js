import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../store/slices/categoriesSlice';

export const useCategorias = () => {
  const dispatch = useDispatch();
  const { categories, isLoading, error } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return { categories, isLoading, error };
};
