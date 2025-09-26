import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './contexto/AuthContext';
import { CategoryProvider } from './contexto/CategoryContext';
import { TaskProvider } from './contexto/TaskContext';
import { TagProvider } from './contexto/TagContext'; 
import GlobalStyles from './GlobalStyles';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './componentes/Comunes/ErrorFallback';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GlobalStyles />
    <ErrorBoundary  FallbackComponent={ErrorFallback}>
      <AuthProvider>
        <CategoryProvider>
          <TaskProvider>
            <TagProvider> 
              <App />
            </TagProvider>
          </TaskProvider>
        </CategoryProvider>
      </AuthProvider>
    </ErrorBoundary>
  </React.StrictMode>
);