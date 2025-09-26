import { useContext } from 'react';
import { SnackbarContext } from '../contexto/SnackbarContext';

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (context === undefined) {
    throw new Error('useSnackbar must be used within an SnackbarContext');
  }
  return context;
};
