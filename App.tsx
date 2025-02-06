import React from 'react';
import { StatusBar } from 'react-native';
import { AuthProvider } from './src/context/AuthContext';
import Layout from './src/screens/_layout';
import './global.css';

export default function App() {
  return (
      <AuthProvider>
        <StatusBar barStyle={'light-content'} />
        <Layout />
      </AuthProvider>
  );
}
