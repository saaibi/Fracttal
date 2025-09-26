import { useContext } from 'react';
import { SnackbarContext } from '../contexto/SnackbarContext';

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
