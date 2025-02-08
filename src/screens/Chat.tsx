import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Text,
  ScrollView
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Chatheader from '../components/Chatheader';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import BubbleChat from '../components/BubbleChat';
import { getCultivo, extractChartData } from '../services/fetchGemini';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

// Definición de tipos
interface Message {
  text: string;
  role: 'user' | 'bot';
}

interface ChartData {
  labels: string[];
  values: number[];
}

const initialMessages: Message = {
  text: 'Que bueno verte de nuevo, ¿qué te interesaría conocer el día de hoy? 🥳 💸',
  role: 'bot',
};

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [value, setValue] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [chartData, setChartData] = useState<ChartData | null>(null);

  useEffect(() => {
      setMessages([initialMessages]);
  }, []);

  const sendMessage = async () => {
      if (isLoading) return;

      setIsLoading(true);
      setError(null);
      setChartData(null); // <-- REINICIA chartData a null

      const userMessage = value;
      setValue('');
      setMessages((prevMessages) => [...prevMessages, { text: userMessage, role: 'user' }]);

      try {
          const initialResponse = await getCultivo(userMessage);
          const data = await extractChartData(initialResponse);
          setChartData(data); // Actualiza con los NUEVOS datos
          setMessages((prevMessages) => [
              ...prevMessages,
              { text: initialResponse, role: 'bot' },
          ]);

      } catch (error: any) {
          setError(error.message);
          setMessages((prevMessages) => [
              ...prevMessages,
              { text: "Hubo un error al procesar tu mensaje.", role: 'bot' },
          ]);
      } finally {
          setIsLoading(false);
      }
  };

  const screenWidth = Dimensions.get('window').width;

  return (
      <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className="flex-1"
      >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView>
              <View className="flex-1">
                  <Chatheader />
                  <View className="flex-1 p-4 ">
                      <BubbleChat messages={messages} isLoading={isLoading} />
                      {error && <Text style={{ color: 'red' }}>{error}</Text>}

                      {chartData && chartData.labels.length > 0 && (
                          <LineChart
                              data={{
                                  labels: chartData.labels,
                                  datasets: [{ data: chartData.values }],
                              }}
                              width={screenWidth - 32}
                              height={220}
                              yAxisLabel=""
                              yAxisSuffix=""
                              yAxisInterval={1}
                              chartConfig={{
                                  backgroundColor: '#ffffff',
                                  backgroundGradientFrom: '#ffffff',
                                  backgroundGradientTo: '#ffffff',
                                  decimalPlaces: 2,
                                  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                                  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                                  style: {
                                      borderRadius: 16,
                                  },
                                  propsForDots: {
                                      r: '6',
                                      strokeWidth: '2',
                                      stroke: '#ffa726',
                                  },
                              }}
                              bezier
                              style={{
                                  marginVertical: 8,
                                  borderRadius: 16,
                              }}
                          />
                      )}
                  </View>

                  <View className="flex-row items-center justify-between bg-white p-4 pl-6 pr-6">
                      <TextInput
                          className="flex-1 border border-[#BCC1CAFF] border-solid  outline-none p-2 pr-4 pl-4 rounded-[18px]"
                          placeholder="Escribe un mensaje..."
                          multiline
                          value={value}
                          onChangeText={(text) => setValue(text)}
                          numberOfLines={4}
                          textAlignVertical="top"
                      />
                      <TouchableOpacity className="ml-2" onPress={sendMessage} disabled={isLoading}>
                          <FontAwesome name="send-o" size={24} color="#636AE8FF" />
                      </TouchableOpacity>
                  </View>
              </View>
              </ScrollView>
          </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
  );
};

export default Chat;