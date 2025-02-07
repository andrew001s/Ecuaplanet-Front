import React, { useContext, useState, useEffect, useRef } from 'react';
import { useAuth } from '../src/hooks/useAuth';
import { View, Text, Pressable } from 'react-native';
import { AuthContext } from '../src/context/AuthContext';
import { useRouter } from 'expo-router';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

function HomeTemplate() {
  const { user } = useContext(AuthContext);
  const { handleLogout } = useAuth();
  const router = useRouter();

  const handleLogoutPress = async () => {
    try {
      await handleLogout();
      router.replace('/LoginScreen');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <View className="flex-1 bg-white p-6">
      <View className="flex-row items-center mb-4">
        <View className="w-1/4 justify-center items-center">
          <FontAwesome5 name="user-circle" size={24} color="black" />
        </View>
        <View className="w-3/4">
          <Text className="text-xl font-bold">Bienvenido de vuelta </Text>
          <Text className="text-2xl font-bold">
            {user?.nombre} {user?.apellido}
          </Text>
        </View>
      </View>

      <Text className="text-lg mb-4">Home</Text>
      <Pressable onPress={handleLogoutPress} className="bg-red-500 p-2 rounded">
        <Text className="text-white font-bold">Cerrar sesión</Text>
      </Pressable>
    </View>
  );
}

export default HomeTemplate;
