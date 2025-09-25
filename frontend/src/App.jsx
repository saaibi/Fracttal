import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './componentes/Layout/Layout';
import FormularioLogin from './componentes/Auth/FormularioLogin';
import FormularioRegistro from './componentes/Auth/FormularioRegistro';
import ListaTareas from './componentes/Tarea/ListaTareas';
import ListaCategorias from './componentes/Categoria/ListaCategorias';
import { useAuth } from './hooks/useAuth';
import styled, { ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from './theme';
import { useState } from 'react';

const Container = styled.div`
  max-width: 100%;
  margin: 0 auto;
  padding: 20px;
  font-family: sans-serif;
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
  const isDarkTheme = theme.id === 'dark';

  return (
    <ThemeProvider theme={theme}>
      <button onClick={() => setTheme(isDarkTheme ? lightTheme : darkTheme)}>  Toggle Theme </button>
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
                  <Layout>
                    <ListaTareas />
                  </Layout>
                </PrivateRoute>
              }
            />
            <Route
              path="/categorias"
              element={
                <PrivateRoute>
                  <Layout>
                    <ListaCategorias />
                  </Layout>
                </PrivateRoute>
              }
            />
          </Routes>
        </Router>
      </Container>
    </ThemeProvider>
  );
}

export default App;