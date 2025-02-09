// components/ErrorMessage.tsx
import React from 'react';
import { View, Text } from 'react-native';

interface Props {
  message: string;
}

export const ErrorMessage: React.FC<Props> = ({ message }) => {
  if (!message) {
    return null; // No mostrar nada si no hay mensaje
  }
  return (
    <View
      className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl "
      role="alert"
    >
      <Text className="text-md">{message}</Text>
    </View>
  );
};
