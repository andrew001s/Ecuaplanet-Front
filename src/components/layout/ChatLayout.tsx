import { View, Text } from 'react-native';
import React from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

type ChatLayoutProps = {
  children: React.ReactNode;
};

const ChatLayout = ({ children }: ChatLayoutProps) => {
  return (
    <SafeAreaProvider className="flex-1 bg-white">
      <SafeAreaView className="flex-1 bg-white">{children}</SafeAreaView>
    </SafeAreaProvider>
  );
};

export default ChatLayout;
