import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './componentes/Layout/Layout';
import FormularioLogin from './componentes/Auth/FormularioLogin';
import FormularioRegistro from './componentes/Auth/FormularioRegistro';
import ListaTareas from './componentes/Tarea/ListaTareas';
import ListaCategorias from './componentes/Categoria/ListaCategorias';
import ListaEtiquetas from './componentes/Etiqueta/ListaEtiquetas';
import { useAuth } from './hooks/useAuth';
import styled, { ThemeProvider } from 'styled-components';
import { lightTheme } from './theme';
import { SnackbarProvider } from './contexto/SnackbarContext';

const Container = styled.div`
  max-width: 100%;
  margin: 0 auto;
  font-family: sans-serif;
  background-color: ${({ theme }) => theme.colors.cardBackground};
  color: ${({ theme }) => theme.colors.text};
`;

const CenteredContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

const PrivateRoute = ({ children }) => {
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" />;
};

function App() {
  const [theme, setTheme] = useState(lightTheme);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider>
        <Container>
          <Router>
            <Routes>
              <Route
                path="/login"
                element={
                  <CenteredContent>
                    <FormularioLogin />
                  </CenteredContent>
                }
              />
              <Route
                path="/register"
                element={
                  <CenteredContent>
                    <FormularioRegistro />
                  </CenteredContent>
                }
              />
              <Route
                path="/"
                element={
                  <PrivateRoute>
                    <Layout
                      setTheme={setTheme}
                      isSidebarOpen={isSidebarOpen}
                      closeSidebar={closeSidebar}
                    >
                      <ListaTareas toggleSidebar={toggleSidebar} />
                    </Layout>
                  </PrivateRoute>
                }
              />
              <Route
                path="/categorias"
                element={
                  <PrivateRoute>
                    <Layout setTheme={setTheme}>
                      <ListaCategorias />
                    </Layout>
                  </PrivateRoute>
                }
              />
              <Route
                path="/tags"
                element={
                  <PrivateRoute>
                    <Layout setTheme={setTheme}>
                      <ListaEtiquetas />
                    </Layout>
                  </PrivateRoute>
                }
              />
            </Routes>
          </Router>
        </Container>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;