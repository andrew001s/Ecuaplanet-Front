import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { useRouter } from 'expo-router';

const index = () => {
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