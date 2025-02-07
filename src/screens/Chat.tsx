import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, { useEffect } from 'react';
import Chatheader from '../components/Chatheader';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import BubbleChat from '../components/BubbleChat';
import { useState } from 'react';
import { getCultivo } from '../services/fetchGemini';

const initialMessages = {
  text: 'Que bueno verte de nuevo, ¿qué te interesaría conocer el día de hoy? 🥳 💸',
  role: 'bot',
};

const Chat = () => {
  const [messages, setMessages] = useState<{ text: string; role: string }[]>(
    [],
  );
  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setMessages([initialMessages]);
  }, []);

  const sendMessage = async () => {
    if (value === '') {
      return;
    }
    if (isLoading) return;

    setIsLoading(true);
    setValue('');
    setMessages([...messages, { text: value, role: 'user' }]);

    const message = await getCultivo(value);

    setMessages((prevMessages) => [
      ...prevMessages,
      { text: message, role: 'bot' },
    ]);

    setIsLoading(false);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1"
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="flex-1">
          <Chatheader />
          <View className="flex-1 p-4 ">
            <BubbleChat messages={messages} isLoading={isLoading} />
          </View>

          <View className="flex-row items-center justify-between bg-white p-4 pl-6 pr-6">
            <TextInput
              className="flex-1 border border-[#BCC1CAFF] border-solid  outline-none p-2 pr-4 pl-4 rounded-[18px]"
              placeholder="Escribe un mensaje..."
              multiline
              value={value}
              onChangeText={(text) => setValue(text)}
              numberOfLines={4}
              textAlignVertical="top"
            />
            <TouchableOpacity className="ml-2" onPress={() => sendMessage()}>
              <FontAwesome name="send-o" size={24} color="#636AE8FF" />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Chat;
