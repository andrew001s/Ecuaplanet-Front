import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Image, // Make sure Image is imported
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Chatheader from '../components/Chatheader';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import BubbleChat from '../components/BubbleChat';
import FaqList from '../components/FaqList';
import { getCultivo, extractChartData } from '../services/fetchGemini';
import { getChat, postChat } from '../services/fetchChatHistory';
import * as fetchChatHistory from '../services/fetchChatHistory';

// --- Define Message Type ---
interface Message {
  text: string;
  role: 'user' | 'bot';
  imageUrl?: string; // Optional image URL
}

const initialMessages: Message = {
  text: '¡Qué bueno verte de nuevo! ¿Qué te interesaría conocer el día de hoy? 🥳 💸',
  role: 'bot',
};

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]); // Use the Message type
  const [value, setValue] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showFaq, setShowFaq] = useState<boolean>(true);
  const [imgUrl, setImgUrl] = useState<string>(''); // Image URL state

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const messages: fetchChatHistory.ChatMessage[] = await getChat('andres'); // Assuming getChat returns ChatMessage[]
        if (messages.length === 0) {
          setMessages([initialMessages]);
          setShowFaq(true);
          return;
        } else {
          const formattedMessages: Message[] = messages.map((msg) => ({
            text: msg.message,
            role: msg.sender === "bot" ? "bot" : "user",
            imageUrl: msg.imageUrl,
          }));
          setShowFaq(false);
          setMessages(formattedMessages);
        }
      } catch (error) {
        console.error("Error loading chat history:", error);
        setMessages([{ text: "Error al cargar el historial del chat.", role: "bot" }]);
      } finally {
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
      const geminiResponse: string = await getCultivo(messageText);

      setMessages((prevMessages) => [
        ...prevMessages,
        { text: geminiResponse, role: 'bot' },
      ]);

      postChat({ id: 'andres', message: geminiResponse, sender: 'bot', timestamp: new Date().toISOString() })
      .catch(error => {
        console.error("Error saving bot message to history:", error);
      });


      // --- KEYWORD CHECK AND CONDITIONAL CHART GENERATION ---
      if (messageText.toLowerCase().includes('grafico')) { // Case-insensitive check
        try {
          const chartData = await extractChartData(geminiResponse);
          if (chartData && chartData.imageUrl) {

            setImgUrl(chartData.imageUrl); // Set the image URL

            setMessages((prevMessages) => [
              ...prevMessages,
              { text: "Imagen: ", role: 'bot', imageUrl: chartData.imageUrl }, 
            ]);
            // Save the image to history
            postChat({ id: 'andres', message: "Imagen: ", sender: 'bot', timestamp: new Date().toISOString(), imageUrl: chartData.imageUrl })
            .catch(error => {
              console.error("Error saving image message to history", error)
            });
          }
        } catch (flaskError) {
          console.error("Error al obtener datos de la gráfica (Flask):", flaskError);
          setMessages((prevMessages) => [
            ...prevMessages,
            { text: "Hubo un problema al generar la gráfica.", role: 'bot' },
          ]);
          // Save error to history
          postChat({ id: 'andres', message: "Hubo un problema al generar la gráfica.", sender: 'bot', timestamp: new Date().toISOString() }).catch(error => {
            console.error("Error saving error message to history", error);
            });
        }
      }
      // --- END OF KEYWORD CHECK ---

    } catch (springError) {
      console.error("Error al obtener respuesta de Gemini (Spring Boot):", springError);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: "Lo siento, no pude procesar tu solicitud.", role: 'bot' },
      ]);
      // Save error to history.
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
            {/*  Pass messages and isLoading to BubbleChat */}
            <BubbleChat messages={messages} isLoading={isLoading} imgUrl={imgUrl} />
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