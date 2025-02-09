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

  const cardColors = {
    cultivo: "#7F55E0",
    produccion: "#379AE6",
    ventas: "#22CCB2",
  };

  const preferencias = user?.preferencias || [0, 0, 0];
  // Crear array con nombre y color
  const categorias = [
    { nombre: "Cultivo", valor: preferencias[0], color: cardColors.cultivo },
    { nombre: "Producción", valor: preferencias[1], color: cardColors.produccion },
    { nombre: "Ventas", valor: preferencias[2], color: cardColors.ventas },
  ];

  // Ordenar por prioridad manteniendo el índice original
  categorias.sort((a, b) => b.valor - a.valor);

  return (
    <View className="flex-1 bg-white p-6">
      <View className="flex-row items-center mb-4">
        <View className="w-1/4 justify-center items-center">
          <FontAwesome5 name="user-circle" size={24} color="black" />
        </View>
        <View className="w-3/4">
          <Text className="text-xl font-bold">Bienvenido de vuelta</Text>
          <Text className="text-2xl font-bold">
            {user?.nombre} {user?.apellido}
          </Text>
        </View>
      </View>

      <Text className="text-lg mb-4">Home</Text>

      {/* Contenedor principal con estructura de 2 columnas */}
      <View className="flex-row h-64 gap-2">
        {/* Espacio grande (columna 1) */}
        <Pressable
          className="flex-1 justify-center items-center rounded-3xl"
          style={{ backgroundColor: categorias[0].color }}
        >
          <Text className="text-white font-bold text-lg">
            {categorias[0].nombre}
          </Text>
        </Pressable>

        {/* Espacio dividido en dos (columna 2) */}
        <View className="w-1/2 justify-between">
          {/* Fila 1 */}
          <Pressable
            className="flex-1 justify-center items-center rounded-3xl mb-2"
            style={{ backgroundColor: categorias[1].color }}
          >
            <Text className="text-white font-bold text-lg">
              {categorias[1].nombre}
            </Text>
          </Pressable>

          {/* Fila 2 */}
          <Pressable
            className="flex-1 justify-center items-center rounded-3xl"
            style={{ backgroundColor: categorias[2].color }}
          >
            <Text className="text-white font-bold text-lg">
              {categorias[2].nombre}
            </Text>
          </Pressable>
        </View>
      </View>

      {/* Botón de logout */}
      <Pressable onPress={handleLogoutPress} className="bg-red-500 p-2 rounded mt-4">
        <Text className="text-white font-bold">Cerrar sesión</Text>
      </Pressable>
    </View>
  );
}

export default HomeTemplate;
