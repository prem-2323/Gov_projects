import React, { createContext, useState, useContext, useEffect } from 'react';
import { Platform, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const AppContext = createContext();

// Update this to your backend URL
const API_URL = 'http://10.74.62.140:5000/api'; // Your computer's local IP

// Configure axios defaults
axios.defaults.timeout = 10000; // 10 second timeout
axios.defaults.headers.common['Content-Type'] = 'application/json';

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reports, setReports] = useState([]);

  useEffect(() => {
    loadUserData();

    // Safety timeout - ensure loading completes within 5 seconds
    const safetyTimeout = setTimeout(() => {
      if (loading) {
        console.warn('Loading took too long, forcing completion');
        setLoading(false);
      }
    }, 5000);

    return () => clearTimeout(safetyTimeout);
  }, []);

  const loadUserData = async () => {
    console.log('AppContext: Starting to load user data');
    try {
      const storedToken = await AsyncStorage.getItem('token');
      const storedUser = await AsyncStorage.getItem('user');

      console.log('AppContext: Loaded from storage', { hasToken: !!storedToken, hasUser: !!storedUser });

      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
        axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
        console.log('AppContext: User restored from storage');
      } else {
        console.log('AppContext: No stored user data');
      }
    } catch (error) {
      console.error('Error loading user data:', error);
      // Clear potentially corrupted data
      try {
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('user');
      } catch (clearError) {
        console.error('Error clearing storage:', clearError);
      }
    } finally {
      console.log('AppContext: Setting loading to false');
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, { email, password });
      const { token: newToken, user: userData } = response.data;

      await AsyncStorage.setItem('token', newToken);
      await AsyncStorage.setItem('user', JSON.stringify(userData));

      setToken(newToken);
      setUser(userData);
      axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;

      return { success: true, user: userData };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Login failed'
      };
    }
  };

  const register = async (userData) => {
    try {
      const response = await axios.post(`${API_URL}/auth/register`, userData);
      const { token: newToken, user: newUser } = response.data;

      await AsyncStorage.setItem('token', newToken);
      await AsyncStorage.setItem('user', JSON.stringify(newUser));

      setToken(newToken);
      setUser(newUser);
      axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;

      return { success: true, user: newUser };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Registration failed'
      };
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('user');
      setToken(null);
      setUser(null);
      delete axios.defaults.headers.common['Authorization'];
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const createReport = async (reportData) => {
    try {
      const formData = new FormData();
      formData.append('description', reportData.description);
      formData.append('location', JSON.stringify(reportData.location));
      formData.append('category', reportData.category);

      if (reportData.image) {
        if (Platform.OS === 'web') {
          // For Web, we need to fetch the blob from the URI
          const response = await fetch(reportData.image);
          const blob = await response.blob();
          formData.append('image', blob, 'waste-report.jpg');
        } else {
          // For Mobile
          formData.append('image', {
            uri: reportData.image,
            type: 'image/jpeg',
            name: 'waste-report.jpg',
          });
        }
      }

      const response = await axios.post(`${API_URL}/reports`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return { success: true, report: response.data };
    } catch (error) {
      console.error('Create report error:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to create report'
      };
    }
  };

  const fetchReports = async () => {
    try {
      const response = await axios.get(`${API_URL}/reports/my-reports`);
      setReports(response.data);
      return { success: true, reports: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to fetch reports'
      };
    }
  };

  const updateReportStatus = async (reportId, status, additionalData = {}) => {
    try {
      const response = await axios.patch(`${API_URL}/reports/${reportId}`, {
        status,
        ...additionalData,
      });
      return { success: true, report: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to update report'
      };
    }
  };

  const value = {
    user,
    token,
    loading,
    reports,
    login,
    register,
    logout,
    createReport,
    fetchReports,
    updateReportStatus,
    API_URL,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};
