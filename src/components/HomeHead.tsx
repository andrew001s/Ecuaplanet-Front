import React from 'react';
import { View, Text, Image } from 'react-native';

interface HomeHeaderProps{
  nombre: String;
  apellido: String;
}

export default function HomeHeader({nombre,apellido}:HomeHeaderProps) {
  return (
    <View className="flex-1 justify-start items-center p-3 flex-row">
      <Image
        source={require('../../assets/avatar.png')}
        className="w-20 h-20 rounded-full"
      />
      <Text className="text-black text-2xl font-normal pl-5 flex-shrink">
        Bienvenido de vuelta 👋 {nombre} {apellido}
      </Text>
    </View>
  );
}
