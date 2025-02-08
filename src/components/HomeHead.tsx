import React from 'react';
import { View, Text, Image } from 'react-native';

export default function HomeHeader() {
  const usuarioNo = 'Carlos';
  const usuarioAp = 'Oña';
  return (
    <View className="flex-1 justify-start items-center p-3 flex-row">
      <Image
        source={require('../../assets/avatar.png')}
        className="w-20 h-20 rounded-full"
      />
      <Text className="text-black text-2xl font-normal pl-5 flex-shrink">
        Bienvenido de vuelta 👋 {usuarioNo} {usuarioAp}
      </Text>
    </View>
  );
}
