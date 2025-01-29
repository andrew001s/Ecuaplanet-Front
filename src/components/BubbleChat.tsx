import { FlatList, Text, View } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import React from 'react';

interface BubbleChatProps {
  messages: { text: string; role: string }[];
}

const BubbleChat = ({ messages }: BubbleChatProps) => {
  const generateKey = (message: string) =>
    `${message}-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <FlatList
      className="flex-1 pt-4 pb-4"
      contentContainerStyle={{ paddingBottom: 16 }}
      data={messages}
      keyExtractor={(item) => generateKey(item.text)}
      renderItem={({ item }) => (
        <View className={`flex-row mb-4 justify-end pr-2 items-start`}>
          {item.role === 'bot' && (
            <MaterialCommunityIcons
              name="robot"
              size={26}
              color="white"
              className="mr-2 rounded-full p-1 bg-gray-400 self-start"
            />
          )}
          <View
            className={`${
              item.role === 'user'
                ? 'bg-[#DEE1E6FF] border border-[#b5bac4] border-solid'
                : 'bg-white'
            } pr-6 pl-6 pt-3 pb-3 border border-[#DEE1E6FF] shadow-sm rounded-[16px]`}
            style={{ maxWidth: '90%', flexShrink: 1 }}
          >
            {item.role === 'bot' && (
              <Text className="text-[#9095A0FF] text-lg">CHATBOT</Text>
            )}
            <Text className="text-[#323842FF]">{item.text}</Text>
          </View>
        </View>
      )}
    />
  );
};

export default BubbleChat;
