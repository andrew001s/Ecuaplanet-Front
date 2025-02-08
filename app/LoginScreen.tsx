import React, { useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { ErrorMessage } from '../src/components/ErrorMessage';
import { useAuth } from '../src/hooks/useAuth';
import { useRouter } from 'expo-router';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loading, error, handleLogin } = useAuth();
  const router = useRouter();

  const handleLoginPress = async () => {
    const success = await handleLogin(email, password);
    if (success) {
      router.replace('/HomeTemplate');
    }
  };

  return (
    <View className="flex-1 bg-[#636AE8]">
      <View className="flex-[0.8] items-center justify-center">
        <Ionicons
          name="rose-outline"
          size={75}
          color="white"
          className="mt-12"
        />
        <Text className="text-white text-3xl my-8 font-bold">ECUAPLANET</Text>
      </View>
      <View className="flex-1 bg-white rounded-t-3xl">
        <View className="px-12 py-8">
          <Text className="text-2xl text-center my-4 font-bold">Ingresar</Text>
          <Text className="text-lg text-start my-3 font-bold">Email</Text>
          <TextInput
            className="rounded-xl text-lg border border-gray-300 my-2 p-4"
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
          />
          <Text className="text-lg text-start py-2 font-bold">Contraseña</Text>
          <TextInput
            className="rounded-xl text-lg border border-gray-300 my-2 p-4"
            placeholder="Contraseña"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoCapitalize="none"
          />
          <TouchableOpacity
            className="bg-[#636AE8] rounded-lg p-3 my-4"
            onPress={handleLoginPress}
            disabled={loading}
          >
            <Text className="text-center text-white text-lg font-bold">
              {loading ? 'Cargando...' : 'Acceder'}
            </Text>
          </TouchableOpacity>
          <ErrorMessage message={error} />
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;
