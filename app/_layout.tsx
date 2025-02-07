import { AuthProvider } from '../src/context/AuthContext';
import React from 'react'
import { Slot } from 'expo-router';
import { StatusBar } from 'react-native';

const _layout = () => {
  return (
    <AuthProvider>
      <StatusBar barStyle='light-content' />
      <Slot />
    </AuthProvider>
  )
}

export default _layout