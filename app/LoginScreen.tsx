import React, {useState} from 'react';
import { useRouter } from 'expo-router';
import { useAuth } from '../src/hooks/useAuth';
import { View, Text, TextInput, 
        TouchableOpacity, KeyboardAvoidingView, 
        ScrollView, TouchableWithoutFeedback, Keyboard } from 'react-native';

import { ErrorMessage } from '../src/components/ErrorMessage';
import Ionicons from '@expo/vector-icons/Ionicons';

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading, error, handleLogin } = useAuth();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const router = useRouter(); 

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleLoginPress = async () => {
    const success = await handleLogin(email, password); 
    if (success) { 
        router.replace('/HomeTemplate');
    }
  };

  return (
    <KeyboardAvoidingView behavior="height" className="flex-1 bg-[#636AE8]">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ flexGrow: 1 }} className="flex-1">
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
                        className="text-lg border-b border-gray-300 focus:border-b-[#379AE6] my-2 px-4"
                        placeholder="user@example.com"
                        value={email}
                        onChangeText={setEmail}
                        autoCapitalize="none"
                    />
                    <Text className="text-lg text-start py-2 font-bold">Contraseña</Text>
                    <View className="relative"> 
                        <TextInput
                            className="text-lg border-b border-gray-300 focus:border-b-[#379AE6] my-2 px-4 pr-10" 
                            placeholder="Contraseña"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={!isPasswordVisible}
                            autoCapitalize="none"
                        />
                        <TouchableOpacity 
                            onPress={togglePasswordVisibility} 
                            className="absolute right-5 top-6"
                        >
                            <Ionicons name={isPasswordVisible ? "eye-off" : "eye"} size={24} color="gray" />
                        </TouchableOpacity>
                    </View>
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
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
      
  );
};

export default LoginScreen;