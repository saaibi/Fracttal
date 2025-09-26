import React, { createContext, useState } from 'react';
import Snackbar from '../componentes/Comunes/Snackbar';

const SnackbarContext = createContext(null);

export const SnackbarProvider = ({ children }) => {
  const [snackbar, setSnackbar] = useState(null);

  const showSnackbar = (message, type = 'success') => {
    setSnackbar({ message, type });
  };

  const hideSnackbar = () => {
    setSnackbar(null);
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      {snackbar && (
        <Snackbar
          message={snackbar.message}
          type={snackbar.type}
          onClose={hideSnackbar}
        />
      )}
    </SnackbarContext.Provider>
  );
};

export { SnackbarContext };