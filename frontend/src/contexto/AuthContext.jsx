import React, { createContext, useState, useEffect } from 'react';
import api from '../servicios/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (token) {
      // Optionally, validate token or fetch user data here
      // For now, we'll just assume the token is valid if it exists
      // In a real app, you'd decode the token or make an API call to get user info
      // For simplicity, we'll set a dummy user if token exists
      console.log(token)
      setUser({ username: 'Authenticated User' });
    }
  }, [token]);

  const login = async (credentials) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.post('/auth/login', credentials);
      const { token } = response.data;
      localStorage.setItem('token', token);
      setToken(token);
      setUser({ username: 'Authenticated User' }); // Replace with actual user data from response
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
      const response = await api.post('/auth/registro', userData);
      console.log(response)
      // Assuming registration might directly log in the user or just succeed
      setIsLoading(false);
      return true;
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
      setIsLoading(false);
      return false;
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
  };

  const value = {
    user,
    token,
    isLoading,
    error,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthContext };
