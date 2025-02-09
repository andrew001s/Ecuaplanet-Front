import { ScrollView, Text, View, TouchableHighlight} from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useRouter } from 'expo-router';

export default function HomeBody() {
  const router=useRouter();
  const handleChatPress = (categoria:string)=>{
      router.push(`/Chat&&${categoria}`)
  };
  return (
    <ScrollView>
      <View className="flex flex-row items-start justify-between pr-5 pl-4">
        <TouchableHighlight
          className="bg-[#7f55e0] py-[85px] px-10 rounded-3xl shadow-lg w-[170px]"
          onPress={() => handleChatPress("cultivo")}/*Aqui se redirrecionaria a la pantalla del chat: /Chat&&cultivo*/
          underlayColor={'#6A4EBD'}
        >
          <View className="justify-center text-center items-center">
            <MaterialCommunityIcons
              name="flower-tulip-outline"
              size={80}
              color={'white'}
            />
            <Text className="text-white font-extrabold text-[20px] leading-[24px]">
              CULTIVO
            </Text>
          </View>
        </TouchableHighlight>
        <View className="flex flex-col items-center ml-2">
          <TouchableHighlight
            className="bg-[#22CCB2] py-8 px-10 rounded-3xl mb-3 w-[150px] shadow-lg"
            onPress={() => handleChatPress("ventas")}/*Aqui se redirrecionaria a la pantalla del chat: /Chat&&ventas*/
            underlayColor="#1A9E87"
          >
            <View className="justify-center text-center items-center">
              <MaterialIcons name="point-of-sale" size={50} color="white" />
              <Text className="text-white font-extrabold text-[20px] leading-[24px]">
                VENTAS
              </Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            className="bg-[#379AE6] py-8 px-8 rounded-3xl mb-2 w-[150px] shadow-lg "
            onPress={() => handleChatPress("produccion")} /*Aqui se redirrecionaria a la pantalla del chat: /Chat&&produccion*/
            underlayColor="#2B7BC1"
          >
            <View className="justify-center text-center items-center">
              <MaterialCommunityIcons
                name="package-variant"
                size={50}
                color="white"
              />
              <Text className="text-white font-extrabold text-[14px] leading-[24px]">
                PRODUCCIÓN
              </Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    </ScrollView>
  );
}
