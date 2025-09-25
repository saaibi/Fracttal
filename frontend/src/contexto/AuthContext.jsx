import React, { createContext, useState, useEffect, useCallback } from 'react';
import api from '../servicios/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
  }, []);

  const getProfile = useCallback(async () => {
    try {
      const response = await api.get('/auth/perfil');
      setUser(response.data);
    } catch (error) {
      console.error('Failed to fetch profile', error);
      logout();
    }
  }, [logout]);

  useEffect(() => {
    if (token) {
      getProfile();
    }
  }, [token, getProfile]);

  const login = async (credentials) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.post('/auth/login', credentials);
      const { token } = response.data;
      localStorage.setItem('token', token);
      setToken(token);
      await getProfile();
      setIsLoading(false);
      return true;
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
      setIsLoading(false);
      return false;
    }
  };

  const register = async (userData) => {
    setIsLoading(true);
    setError(null);
    try {
      await api.post('/auth/registro', userData);
      setIsLoading(false);
      return true;
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
      setIsLoading(false);
      return false;
    }
  };

  const value = {
    user,
    token,
    isLoading,
    error,
    login,
    register,
    logout,
    getProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthContext };
