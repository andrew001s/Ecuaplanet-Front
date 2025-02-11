import { View, Text } from 'react-native';
import React from 'react';
import ChatLayout from '../src/components/layout/ChatLayout';
import Chat from '../src/screens/Chat';

const ChatTemplate = () => {
  return (
    <ChatLayout>
      <Chat />
    </ChatLayout>
  );
};

export default ChatTemplate;
