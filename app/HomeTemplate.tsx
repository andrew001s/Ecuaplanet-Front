import React, { useEffect } from "react";
import { View, Text } from "react-native";

export default function HomeScreen() {
  useEffect(() => {
    console.log("📌 HomeScreen renderizado");
  }, []);

  return (
    <View className="flex-1 bg-white justify-center items-center">
      <Text className="text-2xl font-bold">¡Bienvenido a Home!</Text>
    </View>
  );
}