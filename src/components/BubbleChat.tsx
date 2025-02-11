import { FlatList } from 'react-native';
import React, { useEffect, useRef } from 'react';
import Bubble from './Bubble';

interface BubbleChatProps {
  messages: { text: string; role: string }[];
  isLoading: boolean;
  imgUrl?: string;
}

const BubbleChat = ({ messages, isLoading, imgUrl }: BubbleChatProps) => {
  const generateKey = (message: string) =>
    `${message}-${Math.random().toString(36).substr(2, 9)}`;

  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      flatListRef.current?.scrollToOffset({ offset: 9999, animated: true });
    }, 100);

    return () => clearTimeout(timeout);
  }, [messages]);

  return (
    <FlatList
      ref={flatListRef}
      className="flex-1 pt-4 pb-4"
      contentContainerStyle={{ paddingBottom: 16 }}
      data={messages}
      keyExtractor={(item) => generateKey(item.text)}
      renderItem={({ item }) => Bubble({ item, imgUrl })}
      ListFooterComponent={
        isLoading
          ? Bubble({ item: { text: 'Cargando', role: 'bot' }, isLoading: true })
          : null
      }
    />
  );
};

export default BubbleChat;
