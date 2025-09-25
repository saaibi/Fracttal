import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './componentes/Layout/Layout';
import FormularioLogin from './componentes/Auth/FormularioLogin';
import FormularioRegistro from './componentes/Auth/FormularioRegistro';
import ListaTareas from './componentes/Tarea/ListaTareas';
import ListaCategorias from './componentes/Categoria/ListaCategorias';
import { useAuth } from './hooks/useAuth'; // Changed import path

const PrivateRoute = ({ children }) => {
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<FormularioLogin />} />
        <Route path="/register" element={<FormularioRegistro />} />
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
  );
}

export default App;