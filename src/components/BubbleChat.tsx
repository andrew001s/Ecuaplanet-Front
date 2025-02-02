import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import Bubble from './Bubble';

interface BubbleChatProps {
  messages: { text: string; role: string }[];
  isLoading: boolean;
}

const BubbleChat = ({ messages, isLoading }: BubbleChatProps) => {
  const generateKey = (message: string) =>
    `${message}-${Math.random().toString(36).substr(2, 9)}`;

  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    if (messages.length > 0) {
      flatListRef.current?.scrollToEnd({ animated: true });
    }
  }, [messages]);

  return (
    <FlatList
      ref={flatListRef}
      className="flex-1 pt-4 pb-4"
      contentContainerStyle={{ paddingBottom: 16 }}
      data={messages}
      keyExtractor={(item) => generateKey(item.text)}
      renderItem={({ item }) => Bubble({ item })}
      ListFooterComponent={
        isLoading
          ? Bubble({ item: { text: 'Cargando', role: 'bot' }, isLoading: true })
          : null
      }
    />
  );
};

export default BubbleChat;
