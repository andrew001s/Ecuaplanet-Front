// index.tsx
import { useEffect, useState, useContext } from 'react';
import { useRouter, useSegments, Redirect } from 'expo-router'; // Importa useSegments
import { AuthContext } from '../src/context/AuthContext';
import { View, ActivityIndicator, Text } from 'react-native';
import LoadingScreen from '../src/components/LoadingScreen';
import ChatLayout from '../src/components/layout/ChatLayout';
import Chat from '../src/screens/Chat';

export default function Index() {
  const router = useRouter();
  const { isAuthenticated } = useContext(AuthContext); // Obtenemos si el usuario está autenticado
  const [loading, setLoading] = useState(true);

  return (
    <ChatLayout>
      <Chat />
    </ChatLayout>
  );
}
