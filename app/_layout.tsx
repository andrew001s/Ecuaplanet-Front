// _layout.tsx
import { AuthProvider } from '../src/context/AuthContext';
import React, { useState, useEffect } from 'react';
import { Slot } from 'expo-router';
import { StatusBar, View, ActivityIndicator } from 'react-native';
import '../global.css';

const _layout = () => {
  const [isLayoutReady, setIsLayoutReady] = useState(false);

  useEffect(() => {
    setIsLayoutReady(true);
  }, []);

  return (
    <AuthProvider>
      <StatusBar barStyle='light-content' />
      <Slot />
    </AuthProvider>
  );
};

export default _layout;