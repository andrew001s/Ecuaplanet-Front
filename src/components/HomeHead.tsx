import React from 'react';
import { View, Text, Image,TouchableHighlight } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useAuth } from '../hooks/useAuth';
import { useRouter } from 'expo-router';

interface HomeHeaderProps{
  nombre: String;
  apellido: String;
}

export default function HomeHeader({nombre,apellido}:HomeHeaderProps) {
  const {handleLogout} = useAuth();
  const router = useRouter();

  const handleLogoutPress = async()=>{
    try{
      await handleLogout();
      router.replace("/LoginScreen")
    }catch(error){
      console.error("Error al cerrar sesión: ",error)
    }
  };

  return (
    <View className="flex-1 justify-start items-center p-3 flex-row">
      <Image
        source={require('../../assets/avatar.png')}
        className="w-20 h-20 rounded-full"
      />
      <Text className="text-black text-2xl font-normal pl-5 flex-shrink">
        Bienvenido de vuelta 👋 {nombre} {apellido}
      </Text>
      <TouchableHighlight onPress={handleLogoutPress} underlayColor="#ff4d4d" className="p-3 rounded-full bg-red-500 ml-2">
        <MaterialIcons name="logout" size={24} color="black"/>
      </TouchableHighlight>
    </View>
  );
}
