import { View, Text } from 'react-native'
import React, { useEffect, useContext, useState } from 'react'
import { useRouter } from 'expo-router';
import { AuthContext } from '../src/context/AuthContext';

const index = () => {
    const { isAuthenticated } = useContext(AuthContext);
    const router = useRouter();
    useEffect(() => {
        setTimeout(() => {
          router.replace('/LoginScreen'); // Redirige al login
        }, 1000);
      }, []);   
  return (
    <View>
      <Text>index</Text>
    </View>
  )
}

export default index