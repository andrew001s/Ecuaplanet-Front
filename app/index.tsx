// index.tsx
import { useEffect, useState, useContext } from 'react';
import { useRouter, useSegments, Redirect } from 'expo-router'; // Importa useSegments
import { AuthContext } from '../src/context/AuthContext';
import { View, ActivityIndicator, Text } from 'react-native';
import LoadingScreen from '../src/components/LoadingScreen';

export default function Index() {
  const router = useRouter();
  const { isAuthenticated } = useContext(AuthContext); // Obtenemos si el usuario está autenticado
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simular pantalla de carga por 1 segundo
    const timer = setTimeout(() => {
      if (isAuthenticated) {
        router.replace('/HomeTemplate'); // Si está autenticado, va al Home
      } else {
        router.replace('/LoginScreen'); // Si NO está autenticado, va al Login
      }
    }, 1200);

    return () => clearTimeout(timer); // Limpiar el timer al desmontar
  }, [isAuthenticated]);

  if (loading) {
    return <LoadingScreen />;
  }
  return null;
}