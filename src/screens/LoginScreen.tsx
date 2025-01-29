import React, {useState} from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

export default function LoginScreen() {
  return (
    /* Contenedor General */
    <View className="flex-1 bg-[#636AE8]">
      {/* Contenedor superior */}
      <View className="flex-[0.8] items-center justify-center">
        <Ionicons
          name="rose-outline"
          size={75}
          color="white"
          className="mt-12"
        />
        <Text className="text-white text-3xl my-8 font-bold">ECUAPLANET</Text>
      </View>
      {/* Contenedor inferior */}
      <View className="flex-1 bg-white rounded-t-3xl">
        <View className="px-12 py-8">
          <Text className="text-2xl text-center my-4 font-bold">Ingresar</Text>
          <Text className="text-lg text-start my-3 font-bold">Usuario</Text>
          <TextInput
            className="rounded-xl text-lg border border-gray-300 my-2 px-4"
            placeholder="Usuario"
          />
          <Text className="text-lg text-start py-2 font-bold">Contraseña</Text>
          <TextInput
            className="rounded-xl text-lg border border-gray-300 my-2 px-4"
            placeholder="Contraseña"
            secureTextEntry
          />
          {/* Botón */}
          <TouchableOpacity
            className="bg-[#636AE8] rounded-lg p-3 my-4"
            onPress={() => alert('¡Inicio de sesión exitoso!')}
          >
            <Text className="text-center text-white text-lg font-bold">
              Acceder
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
