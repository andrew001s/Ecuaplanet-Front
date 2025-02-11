import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

const LoadingScreen = () => {
  return (
    <View className="flex-1 bg-[#636AE8] justify-center items-center">
      <Ionicons name="rose-outline" size={75} color="white" className="mt-12" />
      <Text className="text-white text-3xl my-8 font-bold">ECUAPLANET</Text>
    </View>
  );
};

export default LoadingScreen;
