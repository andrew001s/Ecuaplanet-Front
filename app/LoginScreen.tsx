import React, { useEffect } from "react";
import { View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";

export default function LoginScreen() {
  const router = useRouter();

  useEffect(() => {
    console.log("📌 LoginScreen renderizado");
  }, []);

  return (
    <View className="flex-1 bg-white justify-center items-center">
      <Text className="text-2xl font-bold mb-4">Login</Text>
      <Pressable
        className="bg-blue-500 p-3 rounded-lg w-32 items-center"
        onPress={() => {
          console.log("🔵 Navegando a Home");
          router.replace("/HomeTemplate");
        }}
      >
        <Text className="text-white font-bold">Iniciar sesión</Text>
      </Pressable>
    </View>
  );
}