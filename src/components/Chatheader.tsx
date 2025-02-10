import { View, Text, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';

const Header = () => {
  const handleBack = () => {
    router.push('/HomeTemplate');
  }
  return (
    <View className="pt-4 bg-white">
      <View className="relative flex-row items-center justify-center h-12">
        <TouchableOpacity className="absolute left-4" onPress={handleBack}>
          <Ionicons name="arrow-back" size={24} color="#9095A0FF" />
        </TouchableOpacity>

        <Text className="text-xl font-semibold text-[#323842FF]">Chat</Text>
      </View>
    </View>
  );
};

export default Header;
