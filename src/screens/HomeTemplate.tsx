import React from 'react'
import { useAuth } from '../hooks/useAuth';
import { View, Text, Button } from 'react-native'
import { useRouter } from 'expo-router';

function HomeTemplate() {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout(); // Llama a la función logout
      router.push('/');
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      // Aquí puedes mostrar un mensaje de error al usuario si lo deseas
    }
  };

  return (
    <View>
      <Text>Home</Text>
      
      {/* Botón para cerrar sesión */}
      <Button
        title="Cerrar sesión"
        onPress={logout} // Llamamos a la función logout
      />
    </View>
  );
}

export default HomeTemplate