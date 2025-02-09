// components/Bubble.tsx
import { View, Text, ActivityIndicator, Image } from 'react-native'; // Import Image
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { TypingAnimation } from 'react-native-typing-animation';

interface BubbleProps {
  item: { text: string; role: string; imageUrl?: string }; // Add optional imageUrl
  isLoading?: boolean;
}

const Bubble = ({ item, isLoading }: BubbleProps) => {
  return (
    <View
      className={`flex-row mb-4 ${item.role === 'bot' ? 'justify-start' : 'justify-end'} pr-2 items-start`}
    >
      {item.role === 'bot' && (
        <MaterialCommunityIcons
          name="robot"
          size={26}
          color="black"
          className="mr-2 rounded-full p-1 bg-white self-start border border-black"
        />
      )}
      <View
        className={`${
          item.role === 'user'
            ? 'bg-[#636AE8BF] border border-[#b5bac4] border-solid rounded-b-[16px] rounded-tl-[16px]'
            : 'bg-white rounded-e-[16px] rounded-bl-[16px] '
        } pr-6 pl-6 pt-3 pb-3 border border-[#DEE1E6FF] shadow-sm `}
        style={{ maxWidth: '90%', flexShrink: 1 }}
      >
        {item.role === 'bot' && (
          <Text className="text-[#9095A0FF] text-lg">CHATBOT</Text>
        )}

        {/* Display Image OR Text, based on presence of imageUrl */}
        {item.imageUrl ? (
          <Image source={{ uri: item.imageUrl }} style={{ width: 200, height: 150, resizeMode: 'contain', borderRadius: 10 }} />
        ) : isLoading ? ( // Only show TypingAnimation if it's the *current* loading message
          <View className="flex-row items-center">
            <TypingAnimation
              dotColor="#9da3ae"
              dotMargin={5}
              dotAmplitude={2}
              dotSpeed={0.15}
              dotRadius={2.5}
            />
          </View>
        ) : item.text ? (
          <Text className={`${item.role === 'user' ? 'text-white' : 'text-[#323842FF]'} text-lg`}>
            {item.text}
          </Text>
        ) : (  //This part is already handled, but you can keep for extra safety
            <Text className="text-[#323842FF]">
                Error, no se pudo cargar el mensaje
            </Text>
        )}
      </View>
    </View>
  );
};

export default Bubble;