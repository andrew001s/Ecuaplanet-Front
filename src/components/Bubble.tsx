import { View, Text, ActivityIndicator } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { TypingAnimation } from 'react-native-typing-animation';

interface BubbleProps {
  item: { text: string; role: string };
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
          color="white"
          className="mr-2 rounded-full p-1 bg-gray-400 self-start"
        />
      )}
      <View
        className={`${
          item.role === 'user'
            ? 'bg-[#DEE1E6FF] border border-[#b5bac4] border-solid'
            : 'bg-white'
        } pr-6 pl-6 pt-3 pb-3 border border-[#DEE1E6FF] shadow-sm rounded-[16px]`}
        style={{ maxWidth: '90%', flexShrink: 1 }}
      >
        {item.role === 'bot' && (
          <Text className="text-[#9095A0FF] text-lg">CHATBOT</Text>
        )}
        {isLoading ? (
          <View className="flex-row items-center p-4">
            <TypingAnimation
              dotColor="#9da3ae"
              dotMargin={5}
              dotAmplitude={2}
              dotSpeed={0.15}
              dotRadius={2.5}
            />
          </View>
        ) : item.text ? (
          <Text className="text-[#323842FF]">
            {item.text}
          </Text>
        ) : (
          <Text className="text-[#323842FF]">
            Error, no se pudo cargar el mensaje
        </Text>
        )}
      </View>
    </View>
  );
};

export default Bubble;
