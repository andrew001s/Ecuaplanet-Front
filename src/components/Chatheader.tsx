import { Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import React from 'react';

const Chatheader = () => {
  return (
    <View className="pt-4 justify-center items-center bg-white">
      <View className="pr-6">
        <View className="flex flex-row align-center">
          <Ionicons
            name="arrow-back"
            className="right-44"
            size={24}
            color="#9095A0FF"
          />
          <Text className="text-xl font-semibold text-[323842FF]">Chat</Text>
        </View>
      </View>
    </View>
  );
};

export default Chatheader;
