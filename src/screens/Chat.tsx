// Chat.tsx
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Chatheader from '../components/Chatheader';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import BubbleChat from '../components/BubbleChat';
import FaqList from '../components/FaqList';
import { getCultivo, extractChartData } from '../services/fetchGemini'; // Import both functions
import { getChat, postChat } from '../services/fetchChatHistory';
import { ChatMessage } from '../services/fetchChatHistory'; // Assuming you have this type

const initialMessages = {
  text: '¡Qué bueno verte de nuevo! ¿Qué te interesaría conocer el día de hoy? 🥳 💸',
  role: 'bot',
};

const Chat = () => {
  const [messages, setMessages] = useState<{ text: string; role: string; imageUrl?: string }[]>([]); // Include imageUrl
  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showFaq, setShowFaq] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
        setIsLoading(true); // Set loading to true at the start
      try {
        const messages: ChatMessage[] = await getChat('andres');
        if (messages.length === 0) {
          setMessages([initialMessages]);
          setShowFaq(true);
          return;
        } else {
          const formattedMessages = messages.map((msg) => ({
            text: msg.message,
            role: msg.sender === "bot" ? "bot" : "user",
            imageUrl: msg.imageUrl, // Include imageUrl from history
          }));
          setShowFaq(false);
          setMessages(formattedMessages);
        }
      } catch (error) {
        console.error("Error loading chat history:", error);
        // Handle error (e.g., show an error message)
        setMessages([{ text: "Error al cargar el historial del chat.", role: "bot" }]);
      } finally{
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);


  const sendMessage = async (messageText: string) => {
    if (!messageText.trim()) return;
    if (isLoading) return;

    setIsLoading(true);
    const userMessage = { id: 'andres', message: messageText, sender: 'user', timestamp: new Date().toISOString() };

    setMessages((prev) => [...prev, { text: messageText, role: 'user' }]);
    setValue('');
    setShowFaq(false);
      

    try {
      const geminiResponse = await getCultivo(messageText);

      setMessages((prevMessages) => [
        ...prevMessages,
        { text: geminiResponse, role: 'bot' },
      ]);

       // No need to await here.
        postChat({ id: 'andres', message: geminiResponse, sender: 'bot', timestamp: new Date().toISOString() }).catch(error => {
          console.error("Error saving bot message to history:", error);
          // Consider retrying or showing an error.
      });

      try {
        const chartData = await extractChartData(geminiResponse);

        if (chartData && chartData.imageUrl) {
          setMessages((prevMessages) => [
            ...prevMessages,
            { text: "", role: 'bot', imageUrl: chartData.imageUrl }, // Empty text for image
          ]);
            // No need to await
            postChat({ id: 'andres', message: "", sender: 'bot', timestamp: new Date().toISOString(), imageUrl: chartData.imageUrl }).catch(error => {
              console.error("Error saving image message to history", error)
          });
        }
      } catch (flaskError) {
        console.error("Error al obtener datos de la gráfica (Flask):", flaskError);
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: "Hubo un problema al generar la gráfica.", role: 'bot' },
        ]);
          //No need to await
        postChat({ id: 'andres', message: "Hubo un problema al generar la gráfica.", sender: 'bot', timestamp: new Date().toISOString() }).catch(error => {
              console.error("Error saving error message to history", error);
          });
      }
    } catch (springError) {
      console.error("Error al obtener respuesta de Gemini (Spring Boot):", springError);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: "Lo siento, no pude procesar tu solicitud.", role: 'bot' },
      ]);
        // No need to await
        postChat({ id: 'andres', message: "Lo siento, no pude procesar tu solicitud.", sender: 'bot', timestamp: new Date().toISOString() }).catch(error => {
             console.error("Error saving error message to history", error)
        });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1"
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="flex-1 bg-[#F3F4F6FF]">
          <Chatheader />
          <View className="flex-1 p-4">
            <BubbleChat messages={messages} isLoading={isLoading} />
            {showFaq && <FaqList onSelectFaq={(text) => sendMessage(text)} />}
          </View>

          <View className="flex-row items-center justify-between p-4 pl-6 pr-6">
            <TextInput
              className="flex-1 border border-[#BCC1CAFF] border-solid outline-none p-2 pr-4 pl-4 rounded-[18px]"
              placeholder="Escribe un mensaje..."
              multiline
              value={value}
              onChangeText={(text) => setValue(text)}
              numberOfLines={4}
              textAlignVertical="top"
            />
            <TouchableOpacity className="ml-2" onPress={() => sendMessage(value)}>
              <FontAwesome name="send-o" size={24} color="#636AE8FF" />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Chat;