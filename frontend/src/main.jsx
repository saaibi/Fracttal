import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './contexto/AuthContext';
import { CategoryProvider } from './contexto/CategoryContext';
import { TaskProvider } from './contexto/TaskContext';
import GlobalStyles from './GlobalStyles';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GlobalStyles />
      <AuthProvider>
        <CategoryProvider>
          <TaskProvider>
            <App />
          </TaskProvider>
        </CategoryProvider>
      </AuthProvider>
  </React.StrictMode>
);