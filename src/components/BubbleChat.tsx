// components/BubbleChat.tsx
import { FlatList, View, ActivityIndicator } from 'react-native'; // Import ActivityIndicator
import React, { useEffect, useRef } from 'react';
import Bubble from './Bubble';

interface BubbleChatProps {
  messages: { text: string; role: string; imageUrl?: string }[]; // Include imageUrl
  isLoading: boolean;
}

const BubbleChat = ({ messages, isLoading }: BubbleChatProps) => {
  const generateKey = (item: {text: string; role: string; imageUrl?: string}, index: number) =>
        `${item.text}-${item.role}-${index}-${Math.random().toString(36).substr(2, 9)}`; //More robust key


  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true }); // Use scrollToEnd
    }, 100);

    return () => clearTimeout(timeout);
  }, [messages]);


    // Show a loading indicator at the *very beginning*, before any messages have loaded.
    if (isLoading && messages.length === 0) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#636AE8FF" />
            </View>
        );
    }


  return (
    <FlatList
      ref={flatListRef}
      className="flex-1 pt-4 pb-4"
      contentContainerStyle={{ paddingBottom: 16 }}
      data={messages}
      keyExtractor={(item, index) => generateKey(item, index)} // Use index in key
      renderItem={({ item }) => <Bubble item={item} isLoading={isLoading && item.role ==='bot' && item.text === messages[messages.length -1].text} />}
      // No need for ListFooterComponent anymore
    />
  );
};

export default BubbleChat;